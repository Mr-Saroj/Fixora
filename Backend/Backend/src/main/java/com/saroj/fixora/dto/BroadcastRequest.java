package com.saroj.fixora.dto;

public class BroadcastRequest {

    private String title;
    private String message;
    private String targetRole; // "ALL", "TECHNICIAN", "CUSTOMER"

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getTargetRole() { return targetRole; }
    public void setTargetRole(String targetRole) { this.targetRole = targetRole; }
}