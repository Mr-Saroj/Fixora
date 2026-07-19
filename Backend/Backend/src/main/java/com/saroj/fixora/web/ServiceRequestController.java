package com.saroj.fixora.web;

import com.saroj.fixora.dto.ServiceRequestDTO;
import com.saroj.fixora.response.ApiResponse;
import com.saroj.fixora.service.ServiceRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/requests")
public class ServiceRequestController {

    @Autowired
    private ServiceRequestService requestService;

    // Customer creates a new service request
    @PostMapping
    public ResponseEntity<ApiResponse<?>> createRequest(
            @RequestBody ServiceRequestDTO dto,
            Authentication authentication) {
        String email = authentication.getName();  // comes from JwtAuthFilter
        return ResponseEntity.ok(requestService.createRequest(dto, email));
    }

    // Technician sees only requests matching their technicianType
    @GetMapping("/technician")
    public ResponseEntity<ApiResponse<?>> getRequestsForTechnician(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(requestService.getRequestsForTechnician(email));
    }

    // Customer sees their own submitted requests
    @GetMapping("/my")
    public ResponseEntity<ApiResponse<?>> getMyRequests(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(requestService.getMyRequests(email));
    }
}