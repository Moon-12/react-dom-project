// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  setSessionToken,
  removeSessionToken,
  getSessionLoginResponse,
} from "../../utils/tokenUtils";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { mockResponse } from "../../components/mockResponses/mockResponse";
import { auth } from "../../firebase/firebaseConfig";

// Thunk for logging in
export const signInGoogleThunk = createAsyncThunk(
  "auth/loginUser",
  async (_, { rejectWithValue }) => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);

      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const accessToken = result.user.accessToken;
      setSessionToken(accessToken);
      return { accessToken };
    } catch (error) {
      const errorMessage = error.message;
      rejectWithValue(errorMessage);
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
      .addCase(signInGoogleThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signInGoogleThunk.fulfilled, (state, action) => {
        const { accessToken } = action.payload;
        state.token = accessToken;
        state.status = "fulfilled";
        state.loginResponse = getSessionLoginResponse();
      })
      .addCase(signInGoogleThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearToken, setToken } = authSlice.actions;
export default authSlice.reducer;
