package com.saroj.fixora.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtp(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Fixora - Password Reset OTP");
        message.setText(
            "Hello,\n\n" +
            "Your OTP for resetting your Fixora password is:\n\n" +
            "  " + otp + "\n\n" +
            "This OTP is valid for 5 minutes. Do not share it with anyone.\n\n" +
            "If you did not request this, please ignore this email.\n\n" +
            "— The Fixora Team"
        );
        mailSender.send(message);
    }
}