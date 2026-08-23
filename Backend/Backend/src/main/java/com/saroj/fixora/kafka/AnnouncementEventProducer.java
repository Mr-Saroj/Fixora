package com.saroj.fixora.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.saroj.fixora.model.Announcement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class AnnouncementEventProducer {

    private static final String TOPIC = "announcement-events";

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private ObjectMapper objectMapper; // Spring Boot auto-configures this bean

    public void publish(Announcement announcement) {
        try {
            String payload = objectMapper.writeValueAsString(announcement);
            kafkaTemplate.send(TOPIC, announcement.getId(), payload);
        } catch (Exception e) {
            // don't let a Kafka failure block the API response —
            // the announcement is already saved in Mongo either way
            System.err.println("Failed to publish announcement event: " + e.getMessage());
        }
    }
}