package com.saroj.fixora.repository;

import com.saroj.fixora.model.Announcement;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AnnouncementRepository extends MongoRepository<Announcement, String> {

    List<Announcement> findAllByOrderByCreatedAtDesc();

    List<Announcement> findByTargetRoleInOrderByCreatedAtDesc(List<String> targetRoles);
    
   

    // Optional: fetch only direct user messages (e.g. for admin audit)
    List<Announcement> findByTargetRoleOrderByCreatedAtDesc(String targetRole);
}