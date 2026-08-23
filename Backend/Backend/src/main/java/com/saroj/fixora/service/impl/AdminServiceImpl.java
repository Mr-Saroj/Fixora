package com.saroj.fixora.service.impl;

import com.saroj.fixora.dto.TechnicianResponse;
import com.saroj.fixora.dto.UserResponse;
import com.saroj.fixora.exception.ResourceNotFoundException;
import com.saroj.fixora.model.User;
import com.saroj.fixora.model.enums.LoginAccess;
import com.saroj.fixora.model.enums.Role;
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

    // ── helper ────────────────────────────────────────────────────────────────
    private boolean isNotAdmin(String email) {
        return !ADMIN_EMAIL.equals(email);
    }

    // ── GET all technicians ───────────────────────────────────────────────────
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
                .map(TechnicianResponse::new)
                .toList();

        return new ApiResponse<>(true, "Technicians fetched successfully!", result);
    }

    // ── UPDATE technician login access ────────────────────────────────────────
    @Override
    public ApiResponse<?> updateTechnicianAccess(String adminEmail, String technicianId, LoginAccess newAccess) {
        if (isNotAdmin(adminEmail)) {
            return new ApiResponse<>(false, "Access denied.", null);
        }

        User technician = userRepository.findById(technicianId)
                .orElseThrow(() -> new ResourceNotFoundException("Technician not found"));

        technician.setLoginAccess(newAccess);
        userRepository.save(technician);

        return new ApiResponse<>(true, "Technician access updated to " + newAccess, null);
    }

    // ── GET all users (customers + technicians, no admin) ─────────────────────
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
                .filter(u -> u.getRole() != Role.ADMIN)
                .map(UserResponse::new)
                .toList();

        return new ApiResponse<>(true, "Users fetched successfully!", result);
    }
}