import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  registerUser,
  loginUser,
  sendForgotPasswordOtp,
  resetPassword
} from '../services/authService';

import {
  setToken,
  getToken,
  removeToken
} from '../../../utils/authCookie';

import { uploadPhotoToCloudinary } from '../../customer/services/cloudinaryService';

export const useAuth = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // ================= LOGIN =================

  const login = async (credentials) => {

    setIsLoading(true);

    try {

      const response = await loginUser(credentials);
      const data = response.data;

      if (data.success) {

        // Backend returns token, name and role
        const { token, name, role } = data.data;

        // 1. Store JWT in cookies
        setToken(token);

        // 2. Store name and role in localStorage
        localStorage.setItem("name", name);
        localStorage.setItem("role", role);

        // 3. Navigate according to role
        if (role === "CUSTOMER") {
          navigate("/customer-dashboard");
        }
        else if (role === "TECHNICIAN") {
          navigate("/technician-dashboard");
        }
        else if (role === "ADMIN") {
          navigate("/admin-dashboard");
        }
        else {
          alert("Unknown user role!");
        }

      } else {
        alert(data.message || "Login failed.");
      }

    } catch (error) {

      console.log("Login error:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Login failed. Please try again.";

      alert(errorMessage);

    } finally {
      setIsLoading(false);
    }
  };


  // ================= REGISTER =================

  const register = async (userData) => {

    setIsLoading(true);

    try {

      let profilePhotoUrl = null;
      let govtIdPhotoUrl = null;

      if (userData.profilePhotoFile) {
        profilePhotoUrl = await uploadPhotoToCloudinary(
          userData.profilePhotoFile
        );
      }

      if (userData.govtIdPhotoFile) {
        govtIdPhotoUrl = await uploadPhotoToCloudinary(
          userData.govtIdPhotoFile
        );
      }

      const {
        profilePhotoFile,
        govtIdPhotoFile,
        ...rest
      } = userData;

      const payload = {
        ...rest,
        profilePhotoUrl,
        govtIdPhotoUrl
      };

      const response = await registerUser(payload);
      const data = response.data;

      if (data.success) {
        alert(data.message);
        navigate("/login");
      } else {
        alert(data.message || "Registration failed.");
      }

    } catch (error) {

      const errorMessage =
        error.response?.data?.message ||
        "Network error. Is Spring Boot running?";

      alert(errorMessage);

    } finally {
      setIsLoading(false);
    }
  };


  // ================= RESTORE LOGIN =================

  const loadUserFromToken = () => {

    const token = getToken();
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");

    if (token && name && role) {
      return true;
    }

    return false;
  };


  // ================= LOGOUT =================

  const logout = () => {

    removeToken();

    localStorage.removeItem("name");
    localStorage.removeItem("role");

    navigate("/login");
  };


  // ================= FORGOT PASSWORD =================

  const forgotPassword = async (email, onSuccess) => {

    setIsLoading(true);

    try {

      const res = await sendForgotPasswordOtp(email);

      if (res.data.success) {
        onSuccess(email);
      } else {
        alert(res.data.message || "Failed to send OTP.");
      }

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "No account found with this email."
      );

    } finally {
      setIsLoading(false);
    }
  };


  // ================= RESET PASSWORD =================

  const resetUserPassword = async (email, otp, newPassword) => {

    setIsLoading(true);

    try {

      const res = await resetPassword(
        email,
        otp,
        newPassword
      );

      if (res.data.success) {
        alert("Password reset successfully! Please log in.");
        navigate("/login");
      } else {
        alert(res.data.message || "Failed to reset password.");
      }

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Reset failed. OTP may have expired."
      );

    } finally {
      setIsLoading(false);
    }
  };


  return {
    login,
    register,
    loadUserFromToken,
    logout,
    isLoading,
    forgotPassword,
    resetUserPassword
  };
};