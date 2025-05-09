// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userName: "",
    loginResponse: "",
    role: "",
    status: "idle",
  },
  reducers: {
    setLogInResponse: (state, action) => {
      const { uid, role, userName } = action.payload || {};
      state.loginResponse = uid;
      state.role = role;
      state.userName = userName;
    },
  },
});

export const { setLogInResponse } = authSlice.actions;
export default authSlice.reducer;
