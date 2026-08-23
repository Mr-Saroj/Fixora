package com.saroj.fixora.dto;

public class RegisterRequest {
    private String name;
    private String email;
    private String phone;
    private String password;
    private String role; // React sends "customer" or "technician"
    private String technicianType; // React sends "electrician", etc.
    private String state;
    private String district;
    private String city;
    private String pinCode;
    private String profilePhotoUrl;
    private String govtIdPhotoUrl;

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
	// Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getTechnicianType() { return technicianType; }
    public void setTechnicianType(String technicianType) { this.technicianType = technicianType; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getPinCode() { return pinCode; }
    public void setPinCode(String pinCode) { this.pinCode = pinCode; }
}
