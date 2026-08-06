package com.saroj.fixora.kafka;

import com.saroj.fixora.dto.RequestEvent;
import com.saroj.fixora.model.Notification;
import com.saroj.fixora.model.ServiceRequest;
import com.saroj.fixora.model.User;
import com.saroj.fixora.model.enums.RequestStatus;
import com.saroj.fixora.model.enums.TechnicianType;
import com.saroj.fixora.repository.NotificationRepository;
import com.saroj.fixora.repository.ServiceRequestRepository;
import com.saroj.fixora.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class RequestEventConsumer {

    @Autowired
    private CacheManager cacheManager;

    @Autowired
    private ServiceRequestRepository requestRepository;

    @Autowired
    private UserRepository userRepository;                  // ← NEW

    @Autowired
    private NotificationRepository notificationRepository;

    @KafkaListener(topics = "request-events", groupId = "fixora-group")
    public void handleRequestEvent(RequestEvent event) {

        System.out.println("Kafka received event: " + event.getEvent()
                + " for category: " + event.getCategory());

        if ("REQUEST_CREATED".equals(event.getEvent())) {
            // evict + rebuild cache
            evictCache(event.getCategory());
            rebuildCache(event.getCategory());

            // send notifications to matched technicians
            sendNotificationsToTechnicians(event);          // ← only on REQUEST_CREATED
        }

        if ("REQUEST_ACCEPTED".equals(event.getEvent())) {
            // only evict + rebuild cache
            // no notification needed on accept
            evictCache(event.getCategory());
            rebuildCache(event.getCategory());
        }
    }

    // ── send notification to matched technicians ──────────────────────────
    private void sendNotificationsToTechnicians(RequestEvent event) {
        try {
            TechnicianType type = TechnicianType.valueOf(event.getCategory());
            String location = event.getLocation() != null
                    ? event.getLocation().toLowerCase() : "";

            // find ALL technicians of matching category
            List<User> allTechnicians = userRepository.findByTechnicianType(type);

            for (User technician : allTechnicians) {

                // check ONLY city match — no district
                String techCity = technician.getCity() != null
                        ? technician.getCity().toLowerCase() : "";

                boolean cityMatch = !techCity.isEmpty()
                        && location.contains(techCity);     // ← only city check

                if (cityMatch) {
                    Notification notification = new Notification();
                    notification.setTechnicianId(technician.getId());
                    notification.setRequestId(event.getRequestId());
                    notification.setTitle("New Job Available!");
                    notification.setMessage(
                        "A new " + event.getCategory() +
                        " job is available in " + event.getLocation()
                    );
                    notification.setCategory(event.getCategory());
                    notification.setLocation(event.getLocation());
                    notification.setRead(false);
                    notification.setCreatedAt(LocalDateTime.now());

                    notificationRepository.save(notification);
                    System.out.println("Notification sent to: "
                            + technician.getEmail()
                            + " city matched: " + techCity);
                } else {
                    System.out.println("Skipped: " + technician.getEmail()
                            + " city: " + technician.getCity()
                            + " does not match: " + event.getLocation());
                }
            }

        } catch (Exception e) {
            System.out.println("Notification send failed: " + e.getMessage());
        }
    }

    // ── evict stale cache ─────────────────────────────────────────────────
    private void evictCache(String category) {
        var cache = cacheManager.getCache("requests");
        if (cache != null) {
            cache.evict(category);
            System.out.println("Cache evicted for: " + category);
        }
    }

    // ── rebuild fresh cache from MongoDB ──────────────────────────────────
    private void rebuildCache(String category) {
        try {
            TechnicianType type = TechnicianType.valueOf(category);

            List<ServiceRequest> freshList = requestRepository
                    .findByCategoryAndStatus(type, RequestStatus.PENDING);

            var cache = cacheManager.getCache("requests");
            if (cache != null) {
                cache.put(category, freshList);
                System.out.println("Cache rebuilt for: " + category
                        + " with " + freshList.size() + " requests");
            }
        } catch (Exception e) {
            System.out.println("Cache rebuild failed for: " + category
                    + " reason: " + e.getMessage());
        }
    }
}