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
import com.saroj.fixora.service.WebSocketNotificationService;
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
    private UserRepository userRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private WebSocketNotificationService webSocketNotificationService; // ← NEW

    @KafkaListener(topics = "request-events", groupId = "fixora-group")
    public void handleRequestEvent(RequestEvent event) {

        System.out.println("Kafka received event: " + event.getEvent()
                + " category: " + event.getCategory()
                + " location: " + event.getLocation());

        if ("REQUEST_CREATED".equals(event.getEvent())) {
            evictCache(event.getCategory());
            rebuildCache(event.getCategory());
            sendNotificationsToTechnicians(event);
        }

        if ("REQUEST_ACCEPTED".equals(event.getEvent())) {
            evictCache(event.getCategory());
            rebuildCache(event.getCategory());
        }
    }

    private void sendNotificationsToTechnicians(RequestEvent event) {
        try {
            TechnicianType type = TechnicianType.valueOf(event.getCategory());
            String location = event.getLocation() != null
                    ? event.getLocation().toLowerCase() : "";

            System.out.println("Finding technicians for type: " + type);
            System.out.println("Customer location: " + location);

            List<User> allTechnicians = userRepository.findByTechnicianType(type);
            System.out.println("Total technicians found: " + allTechnicians.size());

            for (User technician : allTechnicians) {

                String techCity = technician.getCity() != null
                        ? technician.getCity().toLowerCase() : "";

                boolean cityMatch = !techCity.isEmpty()
                        && location.contains(techCity);

                System.out.println("Checking: " + technician.getEmail()
                        + " city: " + techCity
                        + " match: " + cityMatch);

                if (cityMatch) {
                    // save to MongoDB
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

                    Notification saved = notificationRepository.save(notification);
                    System.out.println("✅ Notification saved for: "
                            + technician.getEmail());

                    // ← NEW: push via WebSocket instantly
                    webSocketNotificationService
                            .pushNotificationToTechnician(
                                    technician.getId(),
                                    saved
                            );
                }
            }

        } catch (Exception e) {
            System.out.println("Notification failed: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private void evictCache(String category) {
        var cache = cacheManager.getCache("requests");
        if (cache != null) {
            cache.evict(category);
            System.out.println("Cache evicted for: " + category);
        }
    }

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
            System.out.println("Cache rebuild failed: " + e.getMessage());
        }
    }
}