// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
// Thunk for logging in
export const signInGoogleThunk = createAsyncThunk(
  "auth/loginUser",
  async (_, { rejectWithValue }) => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      const { uid } = result.user;
      return { uid };
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const signOutGoogleThunk = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return "success";
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(signInGoogleThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signInGoogleThunk.fulfilled, (state, action) => {
        const { uid } = action.payload;
        state.status = "fulfilled";
        state.loginResponse = uid;
      })
      .addCase(signInGoogleThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(signOutGoogleThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutGoogleThunk.fulfilled, (state, action) => {
        state.loginResponse = "";
        state.status = "fulfilled";
      })
      .addCase(signOutGoogleThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setLogInResponse } = authSlice.actions;
export default authSlice.reducer;
