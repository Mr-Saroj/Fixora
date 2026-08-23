package com.saroj.fixora.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.saroj.fixora.model.User;
import com.saroj.fixora.model.enums.Role;
import com.saroj.fixora.model.enums.TechnicianType;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponse {

    private String id;
    private String name;
    private String email;
    private String phone;
    private Role role;

    // Technician specific fields (only shown if not null)
    private TechnicianType technicianType;
    private String state;
    private String district;
    private String city;
    private String pinCode;

    // ── NEW: Cloudinary photo URLs ──
    private String profilePhotoUrl;
    private String govtIdPhotoUrl;

    // ── Constructor 1: real users from MongoDB ──
    public UserResponse(User user) {
        this.id             = user.getId();
        this.name           = user.getName();
        this.email          = user.getEmail();
        this.phone          = user.getPhone();
        this.role           = user.getRole();
        this.technicianType = user.getTechnicianType();
        this.state          = user.getState();
        this.district       = user.getDistrict();
        this.city           = user.getCity();
        this.pinCode        = user.getPinCode();
        // ── NEW ──
        this.profilePhotoUrl = user.getProfilePhotoUrl();
        this.govtIdPhotoUrl  = user.getGovtIdPhotoUrl();
    }

    // ── Constructor 2: hardcoded admin (no DB record) ──
    public UserResponse(String id, String name, String email, Role role) {
        this.id    = id;
        this.name  = name;
        this.email = email;
        this.role  = role;
        // everything else stays null → hidden by @JsonInclude(NON_NULL)
    }

    // ── Getters ──
    public String getId()             { return id; }
    public String getName()           { return name; }
    public String getEmail()          { return email; }
    public String getPhone()          { return phone; }
    public Role getRole()             { return role; }
    public TechnicianType getTechnicianType() { return technicianType; }
    public String getState()          { return state; }
    public String getDistrict()       { return district; }
    public String getCity()           { return city; }
    public String getPinCode()        { return pinCode; }
    // ── NEW getters ──
    public String getProfilePhotoUrl() { return profilePhotoUrl; }
    public String getGovtIdPhotoUrl()  { return govtIdPhotoUrl; }
}