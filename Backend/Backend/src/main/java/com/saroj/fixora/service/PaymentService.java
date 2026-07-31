package com.saroj.fixora.service;

import com.saroj.fixora.dto.CreateOrderRequest;
import com.saroj.fixora.dto.PaymentVerifyRequest;
import com.saroj.fixora.response.ApiResponse;

public interface PaymentService {
    ApiResponse<?> createOrder(String email, CreateOrderRequest request);
    ApiResponse<?> verifyPayment(String email, PaymentVerifyRequest request);
}