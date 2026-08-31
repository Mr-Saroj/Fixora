package com.saroj.fixora.service;

import com.saroj.fixora.dto.RatingRequest;
import com.saroj.fixora.dto.ServiceRequestDTO;
import com.saroj.fixora.dto.UpdateStatusRequest;
import com.saroj.fixora.response.ApiResponse;

public interface ServiceRequestService {
    ApiResponse<?> createRequest(ServiceRequestDTO dto, String customerEmail);
    ApiResponse<?> getRequestsForTechnician(String technicianEmail, String cursor, int size);
    ApiResponse<?> getMyRequests(String customerEmail, String cursor, int size);
    ApiResponse<?> acceptRequest(String requestId, String technicianEmail);
    ApiResponse<?> getMyJobs(String technicianEmail, String cursor, int size);
    ApiResponse<?> updateRequestStatus(String requestId, String technicianEmail, UpdateStatusRequest dto);
    ApiResponse<?> rateTechnician(String requestId, String customerEmail, RatingRequest dto);
}