package com.saroj.fixora.repository;

import com.saroj.fixora.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, String> {

    // get all notifications for a technician (newest first)
    List<Notification> findByTechnicianIdOrderByCreatedAtDesc(String technicianId);

    // get only unread notifications
    List<Notification> findByTechnicianIdAndReadFalse(String technicianId);

    // count unread notifications
    long countByTechnicianIdAndReadFalse(String technicianId);

    // delete all notifications for a technician
    void deleteByTechnicianId(String technicianId);
}