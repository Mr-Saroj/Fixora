import axios from "axios";
import { getToken, removeToken } from "../utils/authCookie";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_TARGET + "/api",
});

// ================= REQUEST INTERCEPTOR =================

API.interceptors.request.use(
  (config) => {

    // Read JWT from cookies
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);


// ================= RESPONSE INTERCEPTOR =================

API.interceptors.response.use(
  (response) => response,

  (error) => {

    if (
      error.response?.status === 401 &&
      !error.config?.url?.includes("/auth/login")
    ) {

      // Remove JWT
      removeToken();

      // Remove user information
      localStorage.removeItem("name");
      localStorage.removeItem("role");

      // Redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;