package com.saroj.fixora.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.saroj.fixora.dto.LoginRequest;
import com.saroj.fixora.dto.RegisterRequest;
import com.saroj.fixora.dto.UserResponse;
import com.saroj.fixora.exception.DuplicateResourceException;
import com.saroj.fixora.exception.ResourceNotFoundException;
import com.saroj.fixora.model.User;
import com.saroj.fixora.model.enums.Role;
import com.saroj.fixora.model.enums.TechnicianType;
import com.saroj.fixora.repository.UserRepository;
import com.saroj.fixora.response.ApiResponse;
import com.saroj.fixora.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public ApiResponse<?> registerUser(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new DuplicateResourceException("Email is already registered!");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(request.getPassword()); 
        user.setRole(Role.valueOf(request.getRole().toUpperCase()));

        if (user.getRole() == Role.TECHNICIAN && request.getTechnicianType() != null) {
            user.setTechnicianType(TechnicianType.valueOf(request.getTechnicianType().toUpperCase()));
            user.setState(request.getState());
            user.setDistrict(request.getDistrict());
            user.setCity(request.getCity());
            user.setPinCode(request.getPinCode());
        }

        User savedUser = userRepository.save(user);
        return new ApiResponse<>(true, "Registration successful!", savedUser.getId());
    }

    // ADD THIS ENTIRE METHOD:
    @Override
    public ApiResponse<?> loginUser(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + request.getEmail()));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new ResourceNotFoundException("Invalid password!");
        }

        // ✅ Wrap in UserResponse — excludes password and class
        UserResponse userResponse = new UserResponse(user);
        return new ApiResponse<>(true, "Login successful!", userResponse);
    }
}