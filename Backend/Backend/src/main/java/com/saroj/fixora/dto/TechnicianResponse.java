package com.saroj.fixora.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
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

    public TechnicianResponse(User user) {
        this.id              = user.getId();
        this.name            = user.getName();
        this.email           = user.getEmail();
        this.phone           = user.getPhone();
        this.technicianType  = user.getTechnicianType();
        this.state           = user.getState();
        this.district        = user.getDistrict();
        this.city            = user.getCity();
        this.pinCode         = user.getPinCode();
        this.profilePhotoUrl = user.getProfilePhotoUrl();
        this.govtIdPhotoUrl  = user.getGovtIdPhotoUrl();
        this.loginAccess     = user.getLoginAccess();
    }

    public String getId()                  { return id; }
    public String getName()                { return name; }
    public String getEmail()               { return email; }
    public String getPhone()               { return phone; }
    public TechnicianType getTechnicianType() { return technicianType; }
    public String getState()               { return state; }
    public String getDistrict()            { return district; }
    public String getCity()                { return city; }
    public String getPinCode()             { return pinCode; }
    public String getProfilePhotoUrl()     { return profilePhotoUrl; }
    public String getGovtIdPhotoUrl()      { return govtIdPhotoUrl; }
    public LoginAccess getLoginAccess()    { return loginAccess; }
}