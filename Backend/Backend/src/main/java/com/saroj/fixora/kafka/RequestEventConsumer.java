package com.saroj.fixora.kafka;

import com.saroj.fixora.dto.RequestEvent;
import com.saroj.fixora.model.ServiceRequest;
import com.saroj.fixora.model.enums.RequestStatus;
import com.saroj.fixora.model.enums.TechnicianType;
import com.saroj.fixora.repository.ServiceRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RequestEventConsumer {

    @Autowired
    private CacheManager cacheManager;

    @Autowired
    private ServiceRequestRepository requestRepository;

    @KafkaListener(topics = "request-events", groupId = "fixora-group")
    public void handleRequestEvent(RequestEvent event) {

        System.out.println("Kafka received event: " + event.getEvent()
                + " for category: " + event.getCategory());

        if ("REQUEST_CREATED".equals(event.getEvent())
                || "REQUEST_ACCEPTED".equals(event.getEvent())) {

            // Step 1: evict stale cache for this technician type
            evictCache(event.getCategory());

            // Step 2: rebuild fresh cache from MongoDB immediately
            // so next technician gets fresh data without hitting MongoDB
            rebuildCache(event.getCategory());
        }
    }

    private void evictCache(String category) {
        var cache = cacheManager.getCache("requests");
        if (cache != null) {
            cache.evict(category);  // evict "ELECTRICIAN" or "PLUMBER" etc
            System.out.println("Cache evicted for: " + category);
        }
    }

    private void rebuildCache(String category) {
        try {
            TechnicianType type = TechnicianType.valueOf(category);

            // fresh query from MongoDB — only PENDING requests
            List<ServiceRequest> freshList = requestRepository
                    .findByCategoryAndStatus(type, RequestStatus.PENDING);

            // store fresh list back in Redis cache
            var cache = cacheManager.getCache("requests");
            if (cache != null) {
                cache.put(category, freshList);
                System.out.println("Cache rebuilt for: " + category
                        + " with " + freshList.size() + " requests");
            }
        } catch (Exception e) {
            System.out.println("Cache rebuild failed for: " + category
                    + " reason: " + e.getMessage());
            // not critical — next technician will rebuild it via cache miss
        }
    }
}