package com.saroj.fixora.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.saroj.fixora.model.Announcement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class AnnouncementEventConsumer {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    @KafkaListener(topics = "announcement-events", groupId = "fixora-announcement-group")
    public void consume(String payload) {
        try {
            Announcement announcement = objectMapper.readValue(payload, Announcement.class);
            // push to any client currently subscribed to /topic/announcements
            messagingTemplate.convertAndSend("/topic/announcements", announcement);
        } catch (Exception e) {
            System.err.println("Failed to process announcement event: " + e.getMessage());
        }
    }
}