package com.saroj.fixora.web;

import com.saroj.fixora.response.ApiResponse;
import com.saroj.fixora.service.TechnicianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/technician")
public class TechnicianController {

    @Autowired
    private TechnicianService technicianService;  // ← injects TechnicianServiceImpl

    @GetMapping("/requests")
    public ResponseEntity<ApiResponse<?>> getMatchingRequests(Authentication authentication) {
        String email = authentication.getName(); // extracted by JwtAuthFilter
        return ResponseEntity.ok(technicianService.getMatchingRequests(email));
    }
}