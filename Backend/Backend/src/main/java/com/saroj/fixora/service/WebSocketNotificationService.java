package com.saroj.fixora.service;

import com.saroj.fixora.model.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class WebSocketNotificationService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // push notification to specific technician
    // each technician listens to /topic/notifications/{technicianId}
    public void pushNotificationToTechnician(String technicianId,
                                              Notification notification) {
        String destination = "/topic/notifications/" + technicianId;

        messagingTemplate.convertAndSend(destination, notification);

        System.out.println("WebSocket pushed to: " + technicianId
                + " destination: " + destination);
    }
}