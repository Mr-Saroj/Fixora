package com.saroj.fixora.service.impl;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.saroj.fixora.dto.AuthMeResponse;
import com.saroj.fixora.dto.AuthResponse;
import com.saroj.fixora.dto.ForgotPasswordRequest;
import com.saroj.fixora.dto.LoginRequest;
import com.saroj.fixora.dto.LoginResponse;
import com.saroj.fixora.dto.RegisterRequest;
import com.saroj.fixora.dto.ResetPasswordRequest;
import com.saroj.fixora.dto.UserResponse;
import com.saroj.fixora.exception.DuplicateResourceException;
import com.saroj.fixora.exception.ResourceNotFoundException;
import com.saroj.fixora.model.User;
import com.saroj.fixora.model.enums.LoginAccess;
import com.saroj.fixora.model.enums.Role;
import com.saroj.fixora.model.enums.TechnicianType;
import com.saroj.fixora.repository.UserRepository;
import com.saroj.fixora.response.ApiResponse;
import com.saroj.fixora.security.JwtUtil;
import com.saroj.fixora.security.OtpStore;
import com.saroj.fixora.service.AuthService;
import com.saroj.fixora.service.EmailService;

@Service
public class AuthServiceImpl implements AuthService {

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private PasswordEncoder passwordEncoder;

        @Autowired
        private OtpStore otpStore;

        @Autowired
        private EmailService emailService;

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
                        user.setProfilePhotoUrl(request.getProfilePhotoUrl());
                        user.setGovtIdPhotoUrl(request.getGovtIdPhotoUrl());
                        user.setLoginAccess(LoginAccess.PENDING);
                }

                User savedUser = userRepository.save(user);
                return new ApiResponse<>(true, "Registration successful!", savedUser.getId());
        }

        @Override
        public ApiResponse<?> loginUser(LoginRequest request) {

                // ADMIN LOGIN
                if ("admin@gmail.com".equals(request.getEmail()) &&
                                "admin@123".equals(request.getPassword())) {

                        String token = jwtUtil.generateToken(
                                        request.getEmail(),
                                        Role.ADMIN.name());

                        LoginResponse loginResponse = new LoginResponse(
                                        token,
                                        "Admin",
                                        Role.ADMIN.name());

                        return new ApiResponse<>(
                                        true,
                                        "Admin login successful!",
                                        loginResponse);
                }

                // NORMAL USER LOGIN
                User user = userRepository.findByEmail(request.getEmail())
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "User not found with email: " + request.getEmail()));

                // PASSWORD CHECK
                if (!passwordEncoder.matches(
                                request.getPassword(),
                                user.getPassword())) {

                        throw new ResourceNotFoundException("Invalid password!");
                }

                // TECHNICIAN LOGIN ACCESS CHECK
                if (user.getRole() == Role.TECHNICIAN) {

                        LoginAccess access = user.getLoginAccess();

                        if (access == LoginAccess.BLOCK) {
                                return new ApiResponse<>(
                                                false,
                                                "Your account has been blocked by admin. Please contact support.",
                                                null);
                        }

                        if (access == null || access == LoginAccess.PENDING) {
                                return new ApiResponse<>(
                                                false,
                                                "Your account is pending approval. Please wait for admin verification.",
                                                null);
                        }
                }

                // GENERATE JWT
                String token = jwtUtil.generateToken(
                                user.getEmail(),
                                user.getRole().name());

                // RETURN ONLY TOKEN, NAME AND ROLE
                LoginResponse loginResponse = new LoginResponse(
                                token,
                                user.getName(),
                                user.getRole().name());

                return new ApiResponse<>(
                                true,
                                "Login successful!",
                                loginResponse);
        }

        @Override
        public ApiResponse<?> getCurrentUser(String email) {

                // ADMIN CHECK (admin is not stored in MongoDB)
                if ("admin@gmail.com".equals(email)) {

                        AuthMeResponse response = new AuthMeResponse(
                                        "Admin",
                                        Role.ADMIN.name());

                        return new ApiResponse<>(
                                        true,
                                        "User fetched successfully!",
                                        response);
                }

                // CUSTOMER / TECHNICIAN CHECK
                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

                AuthMeResponse response = new AuthMeResponse(
                                user.getName(),
                                user.getRole().name());

                return new ApiResponse<>(
                                true,
                                "User fetched successfully!",
                                response);
        }

        @Override
        public ApiResponse<?> sendForgotPasswordOtp(ForgotPasswordRequest request) {
                // Verify user exists (don't reveal if they don't — security best practice)
                userRepository.findByEmail(request.getEmail())
                                .orElseThrow(() -> new ResourceNotFoundException("No account found with that email."));

                // Generate 6-digit OTP
                String otp = String.format("%06d", new Random().nextInt(999999));

                otpStore.save(request.getEmail(), otp);
                emailService.sendOtp(request.getEmail(), otp);

                return new ApiResponse<>(true, "OTP sent to your registered email.", null);
        }

        @Override
        public ApiResponse<?> resetPassword(ResetPasswordRequest request) {
                if (!otpStore.verify(request.getEmail(), request.getOtp())) {
                        throw new ResourceNotFoundException("Invalid or expired OTP.");
                }

                User user = userRepository.findByEmail(request.getEmail())
                                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

                user.setPassword(passwordEncoder.encode(request.getNewPassword()));
                userRepository.save(user);

                otpStore.remove(request.getEmail()); // Invalidate OTP after use

                return new ApiResponse<>(true, "Password reset successfully! Please log in.", null);
        }
}