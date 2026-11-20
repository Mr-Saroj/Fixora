
package com.saroj.fixora.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.saroj.fixora.model.TechnicianProfile;
import com.saroj.fixora.model.User;
import com.saroj.fixora.model.enums.LoginAccess;
import com.saroj.fixora.model.enums.TechnicianType;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class TechnicianResponse {

    private String id;
    private String name;
    private String email;
    private String phone;

    private TechnicianType technicianType;
    private String state;
    private String district;
    private String city;
    private String pinCode;
    private String profilePhotoUrl;
    private String govtIdPhotoUrl;

    private LoginAccess loginAccess;

    public TechnicianResponse(User user, TechnicianProfile profile) {

        // Common fields from User
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.loginAccess = user.getLoginAccess();

        // Technician-specific fields from TechnicianProfile
        if (profile != null) {
            this.technicianType = profile.getTechnicianType();
            this.state = profile.getState();
            this.district = profile.getDistrict();
            this.city = profile.getCity();
            this.pinCode = profile.getPinCode();
            this.profilePhotoUrl = profile.getProfilePhotoUrl();
            this.govtIdPhotoUrl = profile.getGovtIdPhotoUrl();
        }
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public TechnicianType getTechnicianType() {
        return technicianType;
    }

    public String getState() {
        return state;
    }

    public String getDistrict() {
        return district;
    }

    public String getCity() {
        return city;
    }

    public String getPinCode() {
        return pinCode;
    }

    public String getProfilePhotoUrl() {
        return profilePhotoUrl;
    }

    public String getGovtIdPhotoUrl() {
        return govtIdPhotoUrl;
    }

    public LoginAccess getLoginAccess() {
        return loginAccess;
    }
}
