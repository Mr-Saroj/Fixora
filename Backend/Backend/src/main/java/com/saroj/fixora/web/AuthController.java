package com.saroj.fixora.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.saroj.fixora.dto.ForgotPasswordRequest;
import com.saroj.fixora.dto.LoginRequest;
import com.saroj.fixora.dto.RegisterRequest;
import com.saroj.fixora.dto.ResetPasswordRequest;
import com.saroj.fixora.response.ApiResponse;
import com.saroj.fixora.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<?>> register(@RequestBody RegisterRequest request) {
        ApiResponse<?> response = authService.registerUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response); // 201 Created
    }

    // ADD THIS ENTIRE METHOD:
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<?>> login(@RequestBody LoginRequest request) {
        ApiResponse<?> response = authService.loginUser(request);
        return ResponseEntity.ok(response); // 200 OK
    }
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<?>> getCurrentUser(Authentication authentication) {
        String email = authentication.getName(); // set by JwtAuthFilter
        return ResponseEntity.ok(authService.getCurrentUser(email));
    }
    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<?>> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        ApiResponse<?> response = authService.sendForgotPasswordOtp(request);
        return ResponseEntity.ok(response);
    }
     
    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<?>> resetPassword(@RequestBody ResetPasswordRequest request) {
        ApiResponse<?> response = authService.resetPassword(request);
        return ResponseEntity.ok(response);
    }
}