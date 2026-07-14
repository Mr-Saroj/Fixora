// src/redux/slices/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,

  user: {
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
    },
  },
});

export const {
  loginSuccess,
  updateUser,
  logout,
} = authSlice.actions;

export default authSlice.reducer;