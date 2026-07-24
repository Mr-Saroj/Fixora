package com.saroj.fixora.dto;

import com.saroj.fixora.model.enums.RequestStatus;
import com.saroj.fixora.model.enums.TechnicianType;

import java.time.LocalDateTime;
import java.util.List;

public class ServiceRequestResponseDTO {

    private String id;
    private String fullName;
    private String mobileNumber;
    private String location;
    private TechnicianType category;
    private String description;
    private String urgency;
    private List<String> photoUrls;
    private RequestStatus status;
    private LocalDateTime createdAt;

    // 🔑 NEW — rating the customer gave this job's technician (null until rated)
    private Integer rating;
    private String review;

    // Technician details (null if not yet assigned)
    private TechnicianInfo technician;

    public static class TechnicianInfo {
        private String name;
        private String phone;
        private String city;
        private String district;
        private String technicianType;

        public TechnicianInfo(String name, String phone, String city, String district, String technicianType) {
            this.name = name;
            this.phone = phone;
            this.city = city;
            this.district = district;
            this.technicianType = technicianType;
        }

        public String getName() { return name; }
        public String getPhone() { return phone; }
        public String getCity() { return city; }
        public String getDistrict() { return district; }
        public String getTechnicianType() { return technicianType; }
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getMobileNumber() { return mobileNumber; }
    public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public TechnicianType getCategory() { return category; }
    public void setCategory(TechnicianType category) { this.category = category; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getUrgency() { return urgency; }
    public void setUrgency(String urgency) { this.urgency = urgency; }
    public List<String> getPhotoUrls() { return photoUrls; }
    public void setPhotoUrls(List<String> photoUrls) { this.photoUrls = photoUrls; }
    public RequestStatus getStatus() { return status; }
    public void setStatus(RequestStatus status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public String getReview() { return review; }
    public void setReview(String review) { this.review = review; }
    public TechnicianInfo getTechnician() { return technician; }
    public void setTechnician(TechnicianInfo technician) { this.technician = technician; }
}