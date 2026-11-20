package com.saroj.fixora.web;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.saroj.fixora.dto.TechnicianProfileRequest;
import com.saroj.fixora.response.ApiResponse;
import com.saroj.fixora.service.TechnicianProfileService;

@RestController
@RequestMapping("/api/technician/profile")
public class TechnicianProfileController {

    private final TechnicianProfileService technicianProfileService;

    public TechnicianProfileController(
            TechnicianProfileService technicianProfileService) {
        this.technicianProfileService = technicianProfileService;
    }

    @PutMapping("/complete")
    public ResponseEntity<ApiResponse<?>> completeProfile(
            Authentication authentication,
            @RequestBody TechnicianProfileRequest request) {

        String email = authentication.getName();

        ApiResponse<?> response =
                technicianProfileService.completeProfile(email, request);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<?>> getMyProfile(
            Authentication authentication) {

        String email = authentication.getName();

        ApiResponse<?> response =
                technicianProfileService.getMyProfile(email);

        return ResponseEntity.ok(response);
    }
}