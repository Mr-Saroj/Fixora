// 1. ADD THIS LINE: It must match your folder structure
package com.saroj.fixora.model; 

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id; // 2. CHANGED: Use Spring Data's @Id, NOT jakarta.persistence.Id

import com.saroj.fixora.model.enums.Role;
import com.saroj.fixora.model.enums.TechnicianType;

@Document(collection = "users")
public class User {
    
    @Id
    private String id;
    private String name;
    @Indexed(unique = true)
    private String email;
    private String phone;
    private String password; // Plain text as requested
    private Role role;
    
    // Technician specific fields
    private TechnicianType technicianType;
    private String state;
    private String district;
    private String city;
    private String pinCode;

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
}