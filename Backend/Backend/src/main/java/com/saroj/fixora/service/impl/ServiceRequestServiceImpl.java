package com.saroj.fixora.service.impl;

import com.saroj.fixora.dto.ServiceRequestDTO;
import com.saroj.fixora.exception.ResourceNotFoundException;
import com.saroj.fixora.model.ServiceRequest;
import com.saroj.fixora.model.User;
import com.saroj.fixora.model.enums.RequestStatus;
import com.saroj.fixora.model.enums.TechnicianType;
import com.saroj.fixora.repository.ServiceRequestRepository;
import com.saroj.fixora.repository.UserRepository;
import com.saroj.fixora.response.ApiResponse;
import com.saroj.fixora.service.ServiceRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ServiceRequestServiceImpl implements ServiceRequestService {

    @Autowired
    private ServiceRequestRepository requestRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ApiResponse<?> createRequest(ServiceRequestDTO dto, String customerEmail) {
        User customer = userRepository.findByEmail(customerEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        ServiceRequest request = new ServiceRequest();
        request.setCustomerId(customer.getId());
        request.setFullName(dto.getFullName());
        request.setMobileNumber(dto.getMobileNumber());
        request.setLocation(dto.getLocation());
        request.setLatitude(dto.getLatitude());
        request.setLongitude(dto.getLongitude());

        // 🔑 Convert incoming string → TechnicianType enum (this drives the filtering)
        request.setCategory(TechnicianType.valueOf(dto.getCategory().toUpperCase()));

        request.setDescription(dto.getDescription());
        request.setUrgency(dto.getUrgency());
        request.setPhotoUrls(dto.getPhotoUrls());
        request.setStatus(RequestStatus.PENDING);
        request.setCreatedAt(LocalDateTime.now());

        ServiceRequest saved = requestRepository.save(request);
        return new ApiResponse<>(true, "Service request created successfully!", saved.getId());
    }

    @Override
    public ApiResponse<?> getRequestsForTechnician(String technicianEmail) {
        User technician = userRepository.findByEmail(technicianEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Technician not found"));

        if (technician.getTechnicianType() == null) {
            throw new ResourceNotFoundException("This user has no technician type set");
        }

        // 🔑 Only requests matching this technician's type AND still pending
        List<ServiceRequest> requests = requestRepository.findByCategoryAndStatus(
                technician.getTechnicianType(), RequestStatus.PENDING);

        return new ApiResponse<>(true, "Requests fetched successfully!", requests);
    }

    @Override
    public ApiResponse<?> getMyRequests(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<ServiceRequest> requests = requestRepository.findByCustomerId(user.getId());

        if (requests.isEmpty()) {
            return new ApiResponse<>(false, "No service requests found", null);
        }

        return new ApiResponse<>(true, "Requests fetched successfully", requests);
    }
}