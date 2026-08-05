package com.saroj.fixora.dto;

public class RequestEvent {

    private String event;       // "REQUEST_CREATED" or "REQUEST_ACCEPTED"
    private String requestId;
    private String category;    // "ELECTRICIAN", "PLUMBER" etc
    private String acceptedBy;  // technician email, only for ACCEPTED event

    // constructors
    public RequestEvent() {}

    public RequestEvent(String event, String requestId, String category, String acceptedBy) {
        this.event = event;
        this.requestId = requestId;
        this.category = category;
        this.acceptedBy = acceptedBy;
    }

    // getters and setters
    public String getEvent() { return event; }
    public void setEvent(String event) { this.event = event; }

    public String getRequestId() { return requestId; }
    public void setRequestId(String requestId) { this.requestId = requestId; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getAcceptedBy() { return acceptedBy; }
    public void setAcceptedBy(String acceptedBy) { this.acceptedBy = acceptedBy; }
}