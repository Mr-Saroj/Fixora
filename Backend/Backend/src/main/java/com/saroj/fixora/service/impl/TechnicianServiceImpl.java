package com.saroj.fixora.service.impl;

import com.saroj.fixora.exception.ResourceNotFoundException;
import com.saroj.fixora.model.User;
import com.saroj.fixora.model.ServiceRequest;
import com.saroj.fixora.model.enums.RequestStatus;
import com.saroj.fixora.model.enums.TechnicianType;
import com.saroj.fixora.repository.TechnicianRequestRepository;
import com.saroj.fixora.repository.UserRepository;
import com.saroj.fixora.response.ApiResponse;
import com.saroj.fixora.service.TechnicianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TechnicianServiceImpl implements TechnicianService {

    @Autowired
    private TechnicianRequestRepository technicianRequestRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ApiResponse<?> getMatchingRequests(String email) {
        // 1. find logged-in technician by email
        User technician = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Technician not found with email: " + email));

        // 2. get their category e.g. CARPENTER
        TechnicianType techType = technician.getTechnicianType();

        if (techType == null) {
            return new ApiResponse<>(false, "No technician type assigned to this account", null);
        }

        // 3. fetch only PENDING requests matching their category
        List<ServiceRequest> requests = technicianRequestRepository
                .findByCategoryAndStatus(techType, RequestStatus.PENDING);

        if (requests.isEmpty()) {
            return new ApiResponse<>(true, "No pending requests in your category", List.of());
        }

        return new ApiResponse<>(true, "Requests fetched successfully", requests);
    }
}