package com.saroj.fixora.service;

import com.saroj.fixora.dto.ForgotPasswordRequest;
import com.saroj.fixora.dto.LoginRequest;
import com.saroj.fixora.dto.RegisterRequest;
import com.saroj.fixora.dto.ResetPasswordRequest;
import com.saroj.fixora.response.ApiResponse;

public interface AuthService {
    ApiResponse<?> registerUser(RegisterRequest request);
    ApiResponse<?> loginUser(LoginRequest request); 
    ApiResponse<?> getCurrentUser(String email);
    
    ApiResponse<?> sendForgotPasswordOtp(ForgotPasswordRequest request);
    ApiResponse<?> resetPassword(ResetPasswordRequest request);
}
