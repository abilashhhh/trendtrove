 
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: localStorage.getItem("adminAccessToken") || null,
  isAuthenticated: localStorage.getItem("adminAccessToken") ? true : false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
      state.isAuthenticated = true;
      localStorage.setItem("adminAccessToken", accessToken);
    },
    adminLogout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      localStorage.removeItem("adminAccessToken");
    },
  },
});

export const { setAdminCredentials, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;