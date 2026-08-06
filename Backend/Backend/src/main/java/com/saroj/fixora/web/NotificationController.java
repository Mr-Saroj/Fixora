package com.saroj.fixora.web;

import com.saroj.fixora.response.ApiResponse;
import com.saroj.fixora.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    // GET all notifications
    @GetMapping
    public ResponseEntity<ApiResponse<?>> getMyNotifications(
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(
            notificationService.getMyNotifications(email)
        );
    }

    // GET unread count (for notification bell badge)
    @GetMapping("/unread-count")
    public ResponseEntity<ApiResponse<?>> getUnreadCount(
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(
            notificationService.getUnreadCount(email)
        );
    }

    // PATCH mark one as read
    @PatchMapping("/{id}/read")
    public ResponseEntity<ApiResponse<?>> markAsRead(
            @PathVariable String id,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(
            notificationService.markAsRead(id, email)
        );
    }

    // PATCH mark all as read
    @PatchMapping("/read-all")
    public ResponseEntity<ApiResponse<?>> markAllAsRead(
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(
            notificationService.markAllAsRead(email)
        );
    }

    // DELETE one notification
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> deleteNotification(
            @PathVariable String id,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(
            notificationService.deleteNotification(id, email)
        );
    }

    // DELETE all notifications
    @DeleteMapping("/clear-all")
    public ResponseEntity<ApiResponse<?>> clearAll(
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(
            notificationService.clearAll(email)
        );
    }
}