package com.saroj.fixora.service;

import com.saroj.fixora.model.enums.LoginAccess;
import com.saroj.fixora.response.ApiResponse;

public interface AdminService {

    ApiResponse<?> getAllTechnicians(String adminEmail);

    ApiResponse<?> updateTechnicianAccess(String adminEmail, String technicianId, LoginAccess newAccess);

    ApiResponse<?> getAllUsers(String adminEmail);
}