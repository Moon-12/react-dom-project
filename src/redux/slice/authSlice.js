// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  setSessionToken,
  removeSessionToken,
  getSessionLoginResponse,
} from "../../utils/tokenUtils";
import { mockResponse } from "../../components/mockResponses/mockResponse";

// Thunk for logging in
export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      //TODO if unexpired token don't call api
      // const response = await axios.post(
      //   "http://localhost:8080/api/auth/login",
      //   userCredentials
      // );
      setSessionToken(mockResponse.authResponse.accessToken);
      return mockResponse.authResponse;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginResponse: getSessionLoginResponse(),
    status: "idle",
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      setSessionToken(action.payload);
    },
    clearToken: (state) => {
      removeSessionToken();
      state.loginResponse = getSessionLoginResponse();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        const { accessToken } = action.payload;
        state.token = accessToken;
        state.status = "fulfilled";
        state.loginResponse = getSessionLoginResponse();
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearToken, setToken } = authSlice.actions;
export default authSlice.reducer;
