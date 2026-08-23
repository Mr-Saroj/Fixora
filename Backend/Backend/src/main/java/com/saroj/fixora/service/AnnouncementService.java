package com.saroj.fixora.service;

import com.saroj.fixora.response.ApiResponse;

public interface AnnouncementService {

    // admin sends a broadcast message
    ApiResponse<?> broadcastMessage(String adminEmail, String title, String message, String targetRole);

    // logged-in user (technician/customer) fetches announcements meant for them
    ApiResponse<?> getMyAnnouncements(String userEmail);
    
    ApiResponse<?> sendMessageToUser(String adminEmail, String userId, String title, String message);
    
    
}