// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginResponse: "",
    status: "idle",
  },
  reducers: {
    setLogInResponse: (state, action) => {
      state.loginResponse = action.payload;
    },
  },
});

export const { setLogInResponse } = authSlice.actions;
export default authSlice.reducer;
