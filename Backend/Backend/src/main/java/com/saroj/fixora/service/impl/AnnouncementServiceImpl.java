package com.saroj.fixora.service.impl;

import com.saroj.fixora.exception.ResourceNotFoundException;
import com.saroj.fixora.kafka.AnnouncementEventProducer;
import com.saroj.fixora.model.Announcement;
import com.saroj.fixora.model.User;
import com.saroj.fixora.model.enums.Role;
import com.saroj.fixora.repository.AnnouncementRepository;
import com.saroj.fixora.repository.UserRepository;
import com.saroj.fixora.response.ApiResponse;
import com.saroj.fixora.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AnnouncementServiceImpl implements AnnouncementService {

    @Autowired
    private AnnouncementRepository announcementRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AnnouncementEventProducer announcementEventProducer;

    private static final String ADMIN_EMAIL = "admin@gmail.com";

    @Override
    public ApiResponse<?> broadcastMessage(String adminEmail, String title, String message, String targetRole) {

        // security check — hardcoded admin, not stored in DB
        if (!ADMIN_EMAIL.equalsIgnoreCase(adminEmail)) {
            return new ApiResponse<>(false, "Not authorized", null);
        }

        String resolvedRole = (targetRole == null || targetRole.isBlank())
                ? "ALL"
                : targetRole.trim().toUpperCase();

        if (!resolvedRole.equals("ALL")) {
            try {
                Role.valueOf(resolvedRole);
            } catch (IllegalArgumentException ex) {
                return new ApiResponse<>(false, "Invalid targetRole: " + targetRole, null);
            }
        }

        Announcement announcement = new Announcement();
        announcement.setTitle(title);
        announcement.setMessage(message);
        announcement.setTargetRole(resolvedRole);
        announcement.setCreatedByEmail(adminEmail);
        announcement.setCreatedAt(LocalDateTime.now());

        // 1. persist to MongoDB — this is what offline users see later via GET /api/announcements
        Announcement saved = announcementRepository.save(announcement);

        // 2. publish to Kafka — a consumer picks this up and pushes it live over WebSocket
        announcementEventProducer.publish(saved);

        return new ApiResponse<>(true, "Broadcast sent", saved);
    }

    @Override
    public ApiResponse<?> getMyAnnouncements(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Announcement> announcements = announcementRepository
                .findByTargetRoleInOrderByCreatedAtDesc(
                    List.of("ALL", user.getRole().name(), "USER:" + user.getId())
                );

        return new ApiResponse<>(true, "Announcements fetched", announcements);
    }
    
    @Override
    public ApiResponse<?> sendMessageToUser(String adminEmail, String userId, String title, String message) {
        if (!ADMIN_EMAIL.equalsIgnoreCase(adminEmail)) {
            return new ApiResponse<>(false, "Not authorized", null);
        }

        User targetUser = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Announcement announcement = new Announcement();
        announcement.setTitle(title);
        announcement.setMessage(message);
        announcement.setTargetRole("USER:" + targetUser.getId()); // scoped to one user
        announcement.setCreatedByEmail(adminEmail);
        announcement.setCreatedAt(LocalDateTime.now());

        Announcement saved = announcementRepository.save(announcement);
        announcementEventProducer.publish(saved);

        return new ApiResponse<>(true, "Message sent to " + targetUser.getName(), saved);
    }
}