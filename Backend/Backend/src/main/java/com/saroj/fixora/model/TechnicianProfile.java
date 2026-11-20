package com.saroj.fixora.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.saroj.fixora.model.enums.TechnicianType;

import java.time.LocalDate;

@Document(collection = "technician_profiles")
public class TechnicianProfile {

    @Id
    private String id;

    @Indexed(unique = true)
    private String userId;

    private TechnicianType technicianType;

    private String state;

    private String district;

    private String city;

    private String pinCode;

    private String profilePhotoUrl;

    private String govtIdPhotoUrl;

    private LocalDate subscriptionEndDate;

    private boolean busy = false;

    public TechnicianProfile() {
    }

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public TechnicianType getTechnicianType() {
        return technicianType;
    }

    public void setTechnicianType(TechnicianType technicianType) {
        this.technicianType = technicianType;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPinCode() {
        return pinCode;
    }

    public void setPinCode(String pinCode) {
        this.pinCode = pinCode;
    }

    public String getProfilePhotoUrl() {
        return profilePhotoUrl;
    }

    public void setProfilePhotoUrl(String profilePhotoUrl) {
        this.profilePhotoUrl = profilePhotoUrl;
    }

    public String getGovtIdPhotoUrl() {
        return govtIdPhotoUrl;
    }

    public void setGovtIdPhotoUrl(String govtIdPhotoUrl) {
        this.govtIdPhotoUrl = govtIdPhotoUrl;
    }

    public LocalDate getSubscriptionEndDate() {
        return subscriptionEndDate;
    }

    public void setSubscriptionEndDate(LocalDate subscriptionEndDate) {
        this.subscriptionEndDate = subscriptionEndDate;
    }

    public boolean isSubscriptionActive() {
        return subscriptionEndDate != null
                && !LocalDate.now().isAfter(subscriptionEndDate);
    }

    public boolean isBusy() {
        return busy;
    }

    public void setBusy(boolean busy) {
        this.busy = busy;
    }
}