import API from "../../../services/api";

export const registerUser = (userData) => {
  return API.post("/auth/register", userData);
};

export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

export const getCurrentUser = () => API.get("/auth/me");

export const sendForgotPasswordOtp = (email) => {
  return API.post("/auth/forgot-password", { email });
};

export const resetPassword = (email, otp, newPassword) => {
  return API.post("/auth/reset-password", {
    email,
    otp,
    newPassword
  });
};