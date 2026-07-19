package com.saroj.fixora.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.saroj.fixora.dto.AuthResponse;
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
import com.saroj.fixora.security.JwtUtil;
import com.saroj.fixora.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public ApiResponse<?> registerUser(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new DuplicateResourceException("Email is already registered!");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
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

    @Override
    public ApiResponse<?> loginUser(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + request.getEmail()));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ResourceNotFoundException("Invalid password!");
        }

        // 🔑 Generate JWT
        String token = jwtUtil.generateToken(user.getEmail());
        UserResponse userResponse = new UserResponse(user);
        AuthResponse authResponse = new AuthResponse(token, userResponse);

        return new ApiResponse<>(true, "Login successful!", authResponse);
    }

    @Override
    public ApiResponse<?> getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return new ApiResponse<>(true, "User fetched successfully!", new UserResponse(user));
    }
}