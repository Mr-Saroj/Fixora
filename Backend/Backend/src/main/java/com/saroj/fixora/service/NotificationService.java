package com.saroj.fixora.service;

import com.saroj.fixora.model.Notification;
import com.saroj.fixora.response.ApiResponse;

import java.util.List;

public interface NotificationService {

    // get all notifications for logged-in technician
    ApiResponse<?> getMyNotifications(String technicianEmail);

    // mark one notification as read
    ApiResponse<?> markAsRead(String notificationId, String technicianEmail);

    // mark ALL notifications as read
    ApiResponse<?> markAllAsRead(String technicianEmail);

    // delete one notification
    ApiResponse<?> deleteNotification(String notificationId, String technicianEmail);

    // clear ALL notifications for technician
    ApiResponse<?> clearAll(String technicianEmail);

    // get unread count
    ApiResponse<?> getUnreadCount(String technicianEmail);
}