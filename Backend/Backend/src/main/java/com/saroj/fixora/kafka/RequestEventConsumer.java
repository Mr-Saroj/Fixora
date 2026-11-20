
package com.saroj.fixora.kafka;

import com.saroj.fixora.dto.RequestEvent;
import com.saroj.fixora.model.Notification;
import com.saroj.fixora.model.TechnicianProfile;
import com.saroj.fixora.model.User;
import com.saroj.fixora.model.enums.LoginAccess;
import com.saroj.fixora.model.enums.Role;
import com.saroj.fixora.model.enums.TechnicianType;
import com.saroj.fixora.repository.NotificationRepository;
import com.saroj.fixora.repository.TechnicianProfileRepository;
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
    private TechnicianProfileRepository technicianProfileRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private WebSocketNotificationService webSocketNotificationService;

    @KafkaListener(topics = "request-events", groupId = "fixora-group")
    public void handleRequestEvent(RequestEvent event) {

        System.out.println("Kafka received event: " + event.getEvent()
                + " category: " + event.getCategory()
                + " location: " + event.getLocation());

        if ("REQUEST_CREATED".equals(event.getEvent())) {
            sendNotificationsToTechnicians(event);
        }

        // REQUEST_ACCEPTED - nothing to do
    }

    private void sendNotificationsToTechnicians(RequestEvent event) {

        try {
            TechnicianType type = TechnicianType.valueOf(
                    event.getCategory().toUpperCase()
            );

            String location = event.getLocation() != null
                    ? event.getLocation().toLowerCase()
                    : "";

            System.out.println("Finding technicians for type: " + type);
            System.out.println("Customer location: " + location);

            // Find technician profiles by technician type
            List<TechnicianProfile> profiles =
                    technicianProfileRepository.findByTechnicianType(type);

            System.out.println("Total technician profiles found: "
                    + profiles.size());

            for (TechnicianProfile profile : profiles) {

                // Find associated user using User ID
                User technician = userRepository.findById(profile.getUserId())
                        .orElse(null);

                if (technician == null) {
                    continue;
                }

                // Only notify approved technicians with completed profiles
                if (technician.getRole() != Role.TECHNICIAN
                        || technician.getLoginAccess() != LoginAccess.APPROVED
                        || !technician.isProfileIsComplete()) {
                    continue;
                }

                String techCity = profile.getCity() != null
                        ? profile.getCity().toLowerCase()
                        : "";

                boolean cityMatch = !techCity.isEmpty()
                        && location.contains(techCity);

                System.out.println("Checking: " + technician.getEmail()
                        + " city: " + techCity
                        + " match: " + cityMatch);

                if (!cityMatch) {
                    continue;
                }

                Notification notification = new Notification();

                // Store User ID, not TechnicianProfile ID
                notification.setTechnicianId(technician.getId());

                notification.setRequestId(event.getRequestId());
                notification.setTitle("New Job Available!");

                notification.setMessage(
                        "A new " + event.getCategory()
                                + " job is available in " + event.getLocation()
                );

                notification.setCategory(event.getCategory());
                notification.setLocation(event.getLocation());
                notification.setRead(false);
                notification.setCreatedAt(LocalDateTime.now());

                Notification saved =
                        notificationRepository.save(notification);

                System.out.println("Notification saved for: "
                        + technician.getEmail());

                webSocketNotificationService.pushNotificationToTechnician(
                        technician.getId(),
                        saved
                );
            }

        } catch (Exception e) {
            System.out.println("Notification failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
