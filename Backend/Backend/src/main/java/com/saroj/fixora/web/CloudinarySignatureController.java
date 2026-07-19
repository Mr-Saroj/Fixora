package com.saroj.fixora.web;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.MessageDigest;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

@RestController
@RequestMapping("/api/cloudinary")
public class CloudinarySignatureController {

    @Value("${cloudinary.cloud-name}")
    private String cloudName;

    @Value("${cloudinary.api-key}")
    private String apiKey;

    @Value("${cloudinary.api-secret}")
    private String apiSecret;

    @GetMapping("/signature")
    public ResponseEntity<Map<String, Object>> getSignature() {
        long timestamp = System.currentTimeMillis() / 1000L;

        TreeMap<String, String> params = new TreeMap<>();
        params.put("timestamp", String.valueOf(timestamp));

        String toSign = buildStringToSign(params) + apiSecret;
        String signature = sha1Hex(toSign);

        Map<String, Object> data = new HashMap<>();
        data.put("signature", signature);
        data.put("timestamp", timestamp);
        data.put("apiKey", apiKey);
        data.put("cloudName", cloudName);

        Map<String, Object> body = new HashMap<>();
        body.put("success", true);
        body.put("message", "Signature generated");
        body.put("data", data);

        return ResponseEntity.ok(body);
    }

    private String buildStringToSign(TreeMap<String, String> params) {
        StringBuilder sb = new StringBuilder();
        for (Map.Entry<String, String> entry : params.entrySet()) {
            if (sb.length() > 0) sb.append("&");
            sb.append(entry.getKey()).append("=").append(entry.getValue());
        }
        return sb.toString();
    }

    private String sha1Hex(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-1");
            byte[] digest = md.digest(input.getBytes("UTF-8"));
            StringBuilder hex = new StringBuilder();
            for (byte b : digest) {
                hex.append(String.format("%02x", b));
            }
            return hex.toString();
        } catch (Exception e) {
            throw new RuntimeException("Error generating Cloudinary signature", e);
        }
    }
}