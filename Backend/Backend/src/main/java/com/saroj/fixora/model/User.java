package com.saroj.fixora.model;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

import com.saroj.fixora.model.enums.LoginAccess;
import com.saroj.fixora.model.enums.Role;
import com.saroj.fixora.model.enums.TechnicianType;

import java.time.LocalDate;

@Document(collection = "users")
public class User {

    @Id
    private String id;
    private String name;
    @Indexed(unique = true)
    private String email;
    private String phone;
    private String password;
    private Role role;

    // Technician specific fields
    private TechnicianType technicianType;
    private String state;
    private String district;
    private String city;
    private String pinCode;
    private String profilePhotoUrl;
    private String govtIdPhotoUrl;
    private LoginAccess loginAccess;
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

	private LocalDate subscriptionEndDate; // ✅ NEW FIELD

    // Default Constructor required by MongoDB
    public User() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public TechnicianType getTechnicianType() { return technicianType; }
    public void setTechnicianType(TechnicianType technicianType) { this.technicianType = technicianType; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getPinCode() { return pinCode; }
    public void setPinCode(String pinCode) { this.pinCode = pinCode; }

    // ✅ NEW: Getter and Setter for subscriptionEndDate
    public LocalDate getSubscriptionEndDate() { return subscriptionEndDate; }
    public void setSubscriptionEndDate(LocalDate subscriptionEndDate) { this.subscriptionEndDate = subscriptionEndDate; }

    // ✅ OPTIONAL HELPER: Check if technician subscription is still active
    public boolean isSubscriptionActive() {
        if (subscriptionEndDate == null) return false;
        return !LocalDate.now().isAfter(subscriptionEndDate);
    }
    public LoginAccess getLoginAccess() { return loginAccess; }
    public void setLoginAccess(LoginAccess loginAccess) { this.loginAccess = loginAccess; }

}