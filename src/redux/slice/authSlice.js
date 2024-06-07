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

      // const accessToken = result.user.accessToken;
      // setSessionToken(accessToken);
      // return { accessToken };
      return result;
    } catch (error) {
      const errorMessage = error.message;
      rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginResponse: auth.currentUser,
    status: "idle",
  },
  reducers: {
    signOutGoogle: () => {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
        });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInGoogleThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signInGoogleThunk.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.status = "fulfilled";
        state.loginResponse = user;
      })
      .addCase(signInGoogleThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { signOutGoogle } = authSlice.actions;
export default authSlice.reducer;
