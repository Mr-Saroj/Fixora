package com.saroj.fixora.service;

import com.saroj.fixora.dto.ServiceRequestDTO;
import com.saroj.fixora.response.ApiResponse;

public interface ServiceRequestService {
    ApiResponse<?> createRequest(ServiceRequestDTO dto, String customerEmail);
    ApiResponse<?> getRequestsForTechnician(String technicianEmail);
    ApiResponse<?> getMyRequests(String customerEmail);
}