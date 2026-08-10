package com.saroj.fixora.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // prefix for messages FROM server TO client
        registry.enableSimpleBroker("/topic");

        // prefix for messages FROM client TO server
        registry.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // WebSocket connection endpoint
        // frontend connects to this URL
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")  // allow all origins
                .withSockJS();                  // fallback for browsers
    }
}