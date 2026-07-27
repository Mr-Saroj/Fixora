import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser, getCurrentUser, sendForgotPasswordOtp, resetPassword } from '../services/authService';

import { useAppDispatch } from "../../../redux/hooks";
import { loginSuccess, logout } from "../../../redux/slices/authSlice";

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await loginUser(credentials);
      const data = response.data;

      // 🔍 DEBUG — remove after fixing
      console.log("🔍 RAW response.data:", data);
      console.log("🔍 data.data:", data.data);

      if (data.success) {
        const { token, user } = data.data;

        // 🔍 DEBUG — remove after fixing
        console.log("🔍 token:", token);
        console.log("🔍 user:", user);
        console.log("🔍 user.role:", user?.role, "| typeof:", typeof user?.role);

        dispatch(loginSuccess(user));
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        if (user.role === "CUSTOMER") {
          navigate("/customer-dashboard");
        } else if (user.role === "TECHNICIAN") {
          navigate("/technician-dashboard");
        } else {
          alert("Unknown user role!");
        }
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (error) {
      console.log("🔍 login error:", error);
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const response = await registerUser(userData);
      const data = response.data;

      if (data.success) {
        alert(data.message);
        navigate("/login");
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Network error. Is Spring Boot running?";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserFromToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await getCurrentUser();
      const data = response.data;

      if (data.success) {
        dispatch(loginSuccess(data.data));
        localStorage.setItem("user", JSON.stringify(data.data));
      }
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch(logout());
    }
  };
  const forgotPassword = async (email, onSuccess) => {
    setIsLoading(true);
    try {
      const res = await sendForgotPasswordOtp(email);
      if (res.data.success) {
        onSuccess(email);
      } else {
        alert(res.data.message || 'Failed to send OTP.');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'No account found with this email.');
    } finally {
      setIsLoading(false);
    }
  };
 
  const resetUserPassword = async (email, otp, newPassword) => {
    setIsLoading(true);
    try {
      const res = await resetPassword(email, otp, newPassword);
      if (res.data.success) {
        alert('Password reset successfully! Please log in.');
        navigate('/login');
      } else {
        alert(res.data.message || 'Failed to reset password.');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Reset failed. OTP may have expired.');
    } finally {
      setIsLoading(false);
    }
  };

  return { login, register, loadUserFromToken, isLoading, forgotPassword, resetUserPassword };
};