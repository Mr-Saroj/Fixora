package com.saroj.fixora.web;

import com.saroj.fixora.dto.BroadcastRequest;
import com.saroj.fixora.dto.UpdateAccessRequest;
import com.saroj.fixora.response.ApiResponse;
import com.saroj.fixora.service.AdminService;
import com.saroj.fixora.service.AnnouncementService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private AnnouncementService announcementService;

    // GET /api/admin/technicians
    @GetMapping("/technicians")
    public ResponseEntity<ApiResponse<?>> getAllTechnicians(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(adminService.getAllTechnicians(email));
    }

    // PATCH /api/admin/technicians/{id}/access
    @PatchMapping("/technicians/{id}/access")
    public ResponseEntity<ApiResponse<?>> updateAccess(
            @PathVariable String id,
            @RequestBody UpdateAccessRequest request,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(adminService.updateTechnicianAccess(email, id, request.getLoginAccess()));
    }

    // POST /api/admin/broadcast
    @PostMapping("/broadcast")
    public ResponseEntity<ApiResponse<?>> broadcastMessage(
            @RequestBody BroadcastRequest request,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(
            announcementService.broadcastMessage(
                email, request.getTitle(), request.getMessage(), request.getTargetRole()
            )
        );
    }

    // POST /api/admin/announcements/user/{userId}
    @PostMapping("/announcements/user/{userId}")
    public ResponseEntity<ApiResponse<?>> sendToUser(
            @PathVariable String userId,
            @RequestBody BroadcastRequest request,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(
            announcementService.sendMessageToUser(
                email, userId, request.getTitle(), request.getMessage()
            )
        );
    }

    // ✅ GET /api/admin/users
    @GetMapping("/users")
    public ResponseEntity<ApiResponse<?>> getAllUsers(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(adminService.getAllUsers(email));
    }
}