package com.saroj.fixora.web;

import com.saroj.fixora.dto.RatingRequest;
import com.saroj.fixora.dto.ServiceRequestDTO;
import com.saroj.fixora.dto.UpdateStatusRequest;
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
        String email = authentication.getName();
        return ResponseEntity.ok(requestService.createRequest(dto, email));
    }

    // Technician sees only requests matching their technicianType
    @GetMapping("/technician")
    public ResponseEntity<ApiResponse<?>> getRequestsForTechnician(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(requestService.getRequestsForTechnician(email));
    }

    // Customer sees their own submitted requests
    @GetMapping("/my-requests")
    public ResponseEntity<ApiResponse<?>> getMyRequests(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(requestService.getMyRequests(email));
    }

    @PatchMapping("/{id}/accept")
    public ResponseEntity<ApiResponse<?>> acceptRequest(
            @PathVariable String id,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(requestService.acceptRequest(id, email));
    }

    // Technician's own accepted/in-progress/completed jobs
    @GetMapping("/my-jobs")
    public ResponseEntity<ApiResponse<?>> getMyJobs(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(requestService.getMyJobs(email));
    }

    // Technician updates status of a job they own
    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<?>> updateStatus(
            @PathVariable String id,
            @RequestBody UpdateStatusRequest dto,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(requestService.updateRequestStatus(id, email, dto));
    }

    // 🔑 NEW — customer rates the technician for a completed job
    @PatchMapping("/{id}/rate")
    public ResponseEntity<ApiResponse<?>> rateTechnician(
            @PathVariable String id,
            @RequestBody RatingRequest dto,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(requestService.rateTechnician(id, email, dto));
    }
}