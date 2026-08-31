package com.saroj.fixora.kafka;

import com.saroj.fixora.dto.RequestEvent;
import com.saroj.fixora.model.Notification;
import com.saroj.fixora.model.User;
import com.saroj.fixora.model.enums.TechnicianType;
import com.saroj.fixora.repository.NotificationRepository;
import com.saroj.fixora.repository.UserRepository;
import com.saroj.fixora.service.WebSocketNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class RequestEventConsumer {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private WebSocketNotificationService webSocketNotificationService;

    @KafkaListener(topics = "request-events", groupId = "fixora-group")
    public void handleRequestEvent(RequestEvent event) {
        System.out.println("Kafka received event: " + event.getEvent()
                + " category: " + event.getCategory()
                + " location: " + event.getLocation());

        // only notify on new request — no cache logic needed anymore
        if ("REQUEST_CREATED".equals(event.getEvent())) {
            sendNotificationsToTechnicians(event);
        }

        // REQUEST_ACCEPTED — nothing to do
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
                    System.out.println("✅ Notification saved for: " + technician.getEmail());

                    webSocketNotificationService.pushNotificationToTechnician(
                            technician.getId(), saved);
                }
            }

        } catch (Exception e) {
            System.out.println("Notification failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}