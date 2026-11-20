
package com.saroj.fixora.service.impl;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import com.saroj.fixora.dto.CreateOrderRequest;
import com.saroj.fixora.dto.PaymentVerifyRequest;
import com.saroj.fixora.exception.ResourceNotFoundException;
import com.saroj.fixora.model.TechnicianProfile;
import com.saroj.fixora.model.User;
import com.saroj.fixora.repository.TechnicianProfileRepository;
import com.saroj.fixora.repository.UserRepository;
import com.saroj.fixora.response.ApiResponse;
import com.saroj.fixora.service.PaymentService;
import com.saroj.fixora.model.enums.Role;

import org.json.JSONObject;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.HexFormat;
import java.util.Map;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    private final UserRepository userRepository;
    private final TechnicianProfileRepository technicianProfileRepository;

    public PaymentServiceImpl(
            UserRepository userRepository,
            TechnicianProfileRepository technicianProfileRepository) {

        this.userRepository = userRepository;
        this.technicianProfileRepository = technicianProfileRepository;
    }

    // Step 1: Create Razorpay order
    @Override
    public ApiResponse<?> createOrder(String email, CreateOrderRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Only technicians can purchase subscriptions
        if (user.getRole() != Role.TECHNICIAN) {
            throw new RuntimeException("Only technicians can purchase subscriptions");
        }

        // Ensure technician has completed their profile
        technicianProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Please complete your technician profile before purchasing a subscription"));

        try {
            RazorpayClient client = new RazorpayClient(keyId, keySecret);

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", request.getAmount() * 100);
            orderRequest.put("currency", "INR");

            orderRequest.put(
                    "receipt",
                    "rcpt_" + user.getId().substring(0, 8)
                            + "_" + (System.currentTimeMillis() % 100000));

            orderRequest.put("payment_capture", 1);

            Order razorpayOrder = client.orders.create(orderRequest);

            Map<String, Object> data = new HashMap<>();
            data.put("orderId", razorpayOrder.get("id"));
            data.put("amount", request.getAmount() * 100);
            data.put("currency", "INR");
            data.put("keyId", keyId);

            return new ApiResponse<>(true, "Order created!", data);

        } catch (RazorpayException e) {
            throw new RuntimeException(
                    "Razorpay order creation failed: " + e.getMessage());
        }
    }

    // Step 2: Verify payment and update technician subscription
    @Override
    public ApiResponse<?> verifyPayment(
            String email,
            PaymentVerifyRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.getRole() != Role.TECHNICIAN) {
            throw new RuntimeException("Only technicians can verify subscription payments");
        }

        TechnicianProfile technicianProfile = technicianProfileRepository
                .findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Technician profile not found. Please complete your profile first."));

        // Verify Razorpay signature
        boolean isValid = verifySignature(
                request.getRazorpayOrderId(),
                request.getRazorpayPaymentId(),
                request.getRazorpaySignature());

        if (!isValid) {
            return new ApiResponse<>(
                    false,
                    "Payment verification failed!",
                    null);
        }

        // Subscription valid for 30 days
        LocalDate subscriptionEndDate = LocalDate.now().plusDays(30);

        technicianProfile.setSubscriptionEndDate(subscriptionEndDate);

        technicianProfileRepository.save(technicianProfile);

        Map<String, Object> data = new HashMap<>();
        data.put("subscriptionEndDate", subscriptionEndDate.toString());

        return new ApiResponse<>(
                true,
                "Payment successful! Subscription valid until " + subscriptionEndDate,
                data);
    }

    // Step 3: HMAC-SHA256 signature verification
    private boolean verifySignature(
            String orderId,
            String paymentId,
            String signature) {

        try {
            String payload = orderId + "|" + paymentId;

            Mac mac = Mac.getInstance("HmacSHA256");

            SecretKeySpec secretKey = new SecretKeySpec(
                    keySecret.getBytes(StandardCharsets.UTF_8),
                    "HmacSHA256");

            mac.init(secretKey);

            byte[] hash = mac.doFinal(
                    payload.getBytes(StandardCharsets.UTF_8));

            String generated = HexFormat.of().formatHex(hash);

            return generated.equals(signature);

        } catch (Exception e) {
            return false;
        }
    }
}
