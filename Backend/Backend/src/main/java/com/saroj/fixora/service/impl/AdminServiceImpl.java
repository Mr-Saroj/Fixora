
package com.saroj.fixora.service.impl;

import com.saroj.fixora.dto.TechnicianResponse;
import com.saroj.fixora.dto.UserResponse;
import com.saroj.fixora.exception.ResourceNotFoundException;
import com.saroj.fixora.model.TechnicianProfile;
import com.saroj.fixora.model.User;
import com.saroj.fixora.model.enums.LoginAccess;
import com.saroj.fixora.model.enums.Role;
import com.saroj.fixora.repository.TechnicianProfileRepository;
import com.saroj.fixora.repository.UserRepository;
import com.saroj.fixora.response.ApiResponse;
import com.saroj.fixora.service.AdminService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {

    private static final String ADMIN_EMAIL = "admin@gmail.com";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TechnicianProfileRepository technicianProfileRepository;

    private boolean isNotAdmin(String email) {
        return !ADMIN_EMAIL.equals(email);
    }

    // GET all technicians
    @Override
    public ApiResponse<?> getAllTechnicians(String adminEmail) {

        if (isNotAdmin(adminEmail)) {
            return new ApiResponse<>(false, "Access denied.", null);
        }

        List<User> technicians = userRepository.findByRole(Role.TECHNICIAN);

        if (technicians.isEmpty()) {
            return new ApiResponse<>(true, "No technicians found.", List.of());
        }

        List<TechnicianResponse> result = technicians.stream()
                .map(technician -> {

                    TechnicianProfile profile = technicianProfileRepository
                            .findByUserId(technician.getId())
                            .orElse(null);

                    return new TechnicianResponse(technician, profile);
                })
                .toList();

        return new ApiResponse<>(
                true,
                "Technicians fetched successfully!",
                result
        );
    }

    // UPDATE technician login access
    @Override
    public ApiResponse<?> updateTechnicianAccess(
            String adminEmail,
            String technicianId,
            LoginAccess newAccess) {

        if (isNotAdmin(adminEmail)) {
            return new ApiResponse<>(false, "Access denied.", null);
        }

        User technician = userRepository.findById(technicianId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Technician not found"));

        if (technician.getRole() != Role.TECHNICIAN) {
            return new ApiResponse<>(
                    false,
                    "User is not a technician.",
                    null
            );
        }

        technician.setLoginAccess(newAccess);
        userRepository.save(technician);

        return new ApiResponse<>(
                true,
                "Technician access updated to " + newAccess,
                null
        );
    }

    // GET all users (customers + technicians, no admin)
    @Override
    public ApiResponse<?> getAllUsers(String adminEmail) {

        if (isNotAdmin(adminEmail)) {
            return new ApiResponse<>(false, "Access denied.", null);
        }

        List<User> users = userRepository.findAll();

        if (users.isEmpty()) {
            return new ApiResponse<>(true, "No users found.", List.of());
        }

        List<UserResponse> result = users.stream()
                .filter(user -> user.getRole() != Role.ADMIN)
                .map(user -> {

                    TechnicianProfile profile = null;

                    if (user.getRole() == Role.TECHNICIAN) {
                        profile = technicianProfileRepository
                                .findByUserId(user.getId())
                                .orElse(null);
                    }

                    return new UserResponse(user, profile);
                })
                .toList();

        return new ApiResponse<>(
                true,
                "Users fetched successfully!",
                result
        );
    }
}
