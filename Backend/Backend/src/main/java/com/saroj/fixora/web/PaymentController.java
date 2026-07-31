package com.saroj.fixora.web;

import com.saroj.fixora.dto.CreateOrderRequest;
import com.saroj.fixora.dto.PaymentVerifyRequest;
import com.saroj.fixora.exception.ResourceNotFoundException;
import com.saroj.fixora.model.User;
import com.saroj.fixora.repository.UserRepository;
import com.saroj.fixora.response.ApiResponse;
import com.saroj.fixora.service.PaymentService;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;
    
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create-order")
    public ResponseEntity<ApiResponse<?>> createOrder(
            Authentication authentication,
            @RequestBody CreateOrderRequest request) {
        return ResponseEntity.ok(
                paymentService.createOrder(authentication.getName(), request));
    }

    @PostMapping("/verify")
    public ResponseEntity<ApiResponse<?>> verifyPayment(
            Authentication authentication,
            @RequestBody PaymentVerifyRequest request) {
        return ResponseEntity.ok(
                paymentService.verifyPayment(authentication.getName(), request));
    }
    @GetMapping("/subscription-status")
    public ResponseEntity<ApiResponse<?>> getSubscriptionStatus(
            Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Map<String, Object> data = new HashMap<>();
        LocalDate endDate = user.getSubscriptionEndDate();

        if (endDate == null) {
            // Never subscribed
            data.put("status", "NOT_SUBSCRIBED");
            data.put("subscriptionEndDate", null);
            data.put("daysRemaining", 0);
        } else if (LocalDate.now().isAfter(endDate)) {
            // Subscribed before but expired
            data.put("status", "EXPIRED");
            data.put("subscriptionEndDate", endDate.toString());
            data.put("daysRemaining", 0);
        } else {
            // Active
            long days = ChronoUnit.DAYS.between(LocalDate.now(), endDate);
            data.put("status", "ACTIVE");
            data.put("subscriptionEndDate", endDate.toString());
            data.put("daysRemaining", days);
        }

        return ResponseEntity.ok(new ApiResponse<>(true, "Subscription status fetched", data));
    }
}