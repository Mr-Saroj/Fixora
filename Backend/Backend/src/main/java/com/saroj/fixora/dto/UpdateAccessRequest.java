package com.saroj.fixora.dto;

import com.saroj.fixora.model.enums.LoginAccess;

public class UpdateAccessRequest {
    private LoginAccess loginAccess;

    public LoginAccess getLoginAccess() { return loginAccess; }
    public void setLoginAccess(LoginAccess loginAccess) { this.loginAccess = loginAccess; }
}