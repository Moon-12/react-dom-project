// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginResponse: "",
    role: "",
    status: "idle",
  },
  reducers: {
    setLogInResponse: (state, action) => {
      const { uid, role } = action.payload || {};
      state.loginResponse = uid;
      state.role = role;
    },
  },
});

export const { setLogInResponse } = authSlice.actions;
export default authSlice.reducer;
