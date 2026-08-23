package com.saroj.fixora.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KafkaConfig {

    // Kafka topic name — all request events go here
    @Bean
    public NewTopic requestEventsTopic() {
        return new NewTopic("request-events", 1, (short) 1);
    }
    @Bean
    public NewTopic announcementEventsTopic() {
        return new NewTopic("announcement-events", 1, (short) 1);
    }
}