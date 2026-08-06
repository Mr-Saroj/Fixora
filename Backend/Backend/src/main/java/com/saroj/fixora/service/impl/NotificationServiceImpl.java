package com.saroj.fixora.service.impl;

import com.saroj.fixora.exception.ResourceNotFoundException;
import com.saroj.fixora.model.Notification;
import com.saroj.fixora.model.User;
import com.saroj.fixora.repository.NotificationRepository;
import com.saroj.fixora.repository.UserRepository;
import com.saroj.fixora.response.ApiResponse;
import com.saroj.fixora.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ApiResponse<?> getMyNotifications(String technicianEmail) {
        User technician = userRepository.findByEmail(technicianEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Technician not found"));

        List<Notification> notifications = notificationRepository
                .findByTechnicianIdOrderByCreatedAtDesc(technician.getId());

        if (notifications.isEmpty()) {
            return new ApiResponse<>(true, "No notifications", List.of());
        }

        return new ApiResponse<>(true, "Notifications fetched", notifications);
    }

    @Override
    public ApiResponse<?> markAsRead(String notificationId, String technicianEmail) {
        User technician = userRepository.findByEmail(technicianEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Technician not found"));

        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found"));

        // security check — must be their own notification
        if (!notification.getTechnicianId().equals(technician.getId())) {
            return new ApiResponse<>(false, "Not your notification", null);
        }

        notification.setRead(true);
        notificationRepository.save(notification);

        return new ApiResponse<>(true, "Marked as read", null);
    }

    @Override
    public ApiResponse<?> markAllAsRead(String technicianEmail) {
        User technician = userRepository.findByEmail(technicianEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Technician not found"));

        List<Notification> unread = notificationRepository
                .findByTechnicianIdAndReadFalse(technician.getId());

        unread.forEach(n -> n.setRead(true));
        notificationRepository.saveAll(unread);

        return new ApiResponse<>(true, "All marked as read", null);
    }

    @Override
    public ApiResponse<?> deleteNotification(String notificationId, String technicianEmail) {
        User technician = userRepository.findByEmail(technicianEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Technician not found"));

        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found"));

        // security check
        if (!notification.getTechnicianId().equals(technician.getId())) {
            return new ApiResponse<>(false, "Not your notification", null);
        }

        notificationRepository.delete(notification);

        return new ApiResponse<>(true, "Notification deleted", null);
    }

    @Override
    public ApiResponse<?> clearAll(String technicianEmail) {
        User technician = userRepository.findByEmail(technicianEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Technician not found"));

        notificationRepository.deleteByTechnicianId(technician.getId());

        return new ApiResponse<>(true, "All notifications cleared", null);
    }

    @Override
    public ApiResponse<?> getUnreadCount(String technicianEmail) {
        User technician = userRepository.findByEmail(technicianEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Technician not found"));

        long count = notificationRepository
                .countByTechnicianIdAndReadFalse(technician.getId());

        return new ApiResponse<>(true, "Unread count", count);
    }
}