package com.saroj.fixora.dto;

public class UpdateStatusRequest {

    private String status; // "IN_PROGRESS" or "COMPLETED"

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}