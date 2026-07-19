import axios from "axios";

const API = axios.create({
  baseURL: "/api", // Vite proxy will forward this to http://localhost:8080/api
});

// 🔑 Attach JWT token to every outgoing request (if present)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🔁 Optional: auto-logout if token expires/invalid (401 response)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Redirect to login if token is invalid/expired
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;