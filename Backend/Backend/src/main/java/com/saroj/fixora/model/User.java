package com.saroj.fixora.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.saroj.fixora.model.enums.LoginAccess;
import com.saroj.fixora.model.enums.Role;

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

    private LoginAccess loginAccess;

    private boolean profileIsComplete;

    public User() {
    }

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public LoginAccess getLoginAccess() {
        return loginAccess;
    }

    public void setLoginAccess(LoginAccess loginAccess) {
        this.loginAccess = loginAccess;
    }

    public boolean isProfileIsComplete() {
        return profileIsComplete;
    }

    public void setProfileIsComplete(boolean profileIsComplete) {
        this.profileIsComplete = profileIsComplete;
    }
}