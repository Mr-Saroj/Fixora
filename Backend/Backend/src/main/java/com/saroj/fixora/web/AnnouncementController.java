package com.saroj.fixora.web;

import com.saroj.fixora.response.ApiResponse;
import com.saroj.fixora.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/announcements")
public class AnnouncementController {

    @Autowired
    private AnnouncementService announcementService;

    // GET all announcements relevant to the logged-in user
    @GetMapping
    public ResponseEntity<ApiResponse<?>> getMyAnnouncements(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(announcementService.getMyAnnouncements(email));
    }
}