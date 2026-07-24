package com.saroj.fixora.service;

import com.saroj.fixora.dto.RatingRequest;
import com.saroj.fixora.dto.ServiceRequestDTO;
import com.saroj.fixora.dto.UpdateStatusRequest;
import com.saroj.fixora.response.ApiResponse;

public interface ServiceRequestService {
    ApiResponse<?> createRequest(ServiceRequestDTO dto, String customerEmail);
    ApiResponse<?> getRequestsForTechnician(String technicianEmail);
    ApiResponse<?> getMyRequests(String customerEmail);
    ApiResponse<?> acceptRequest(String requestId, String technicianEmail);

    ApiResponse<?> getMyJobs(String technicianEmail);
    ApiResponse<?> updateRequestStatus(String requestId, String technicianEmail, UpdateStatusRequest dto);

    // NEW — customer rates the technician for a completed job
    ApiResponse<?> rateTechnician(String requestId, String customerEmail, RatingRequest dto);
}