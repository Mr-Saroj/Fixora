import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("user") || "null");
const savedToken = localStorage.getItem("token");

const initialState = {
  isLoggedIn: !!(savedToken && savedUser),
  user: savedUser || {
    id: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    technicianType: null,
    state: null,
    district: null,
    city: null,
    pinCode: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },

    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.user = {
        id: "",
        name: "",
        email: "",
        phone: "",
        role: "",
        technicianType: null,
        state: null,
        district: null,
        city: null,
        pinCode: null,
      };
      // ✅ Clean up localStorage on logout
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;