// src/features/header/headerSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fireStoreDB } from "../../firebase/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

// Async thunk for fetching the techstacks
export const fetchCertificate = createAsyncThunk(
  "certificate/fetchCertificates",
  async (_, { rejectWithValue }) => {
    try {
      const techDocRef = doc(fireStoreDB, "common", "certificate-metadata");
      const docSnap = await getDoc(techDocRef);
      if (docSnap.exists()) return docSnap.data();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const certificateSlice = createSlice({
  name: "certificate",
  initialState: {
    certificates: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCertificate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCertificate.fulfilled, (state, action) => {
        const { certificates } = action.payload || {};
        state.status = "succeeded";
        state.certificates = certificates;
      })
      .addCase(fetchCertificate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default certificateSlice.reducer;
