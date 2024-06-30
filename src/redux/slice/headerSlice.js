// src/features/header/headerSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fireStoreDB } from "../../firebase/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { act } from "react";

// Async thunk for fetching the header
export const fetchHeader = createAsyncThunk(
  "header/fetchHeader",
  async ({ role }, { rejectWithValue }) => {
    try {
      const metaDataDocRef = doc(fireStoreDB, "common", "meta-data");
      const docSnap = await getDoc(metaDataDocRef);
      if (docSnap.exists()) return docSnap.data();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const headerSlice = createSlice({
  name: "header",
  initialState: {
    headers: [],
    currentHeaderRoute: "",
    status: "idle",
    error: null,
    currentHeader: "",
  },
  reducers: {
    setcurrentHeaderRoute: (state, action) => {
      const { currentHeaderRoute } = action.payload;
      state.currentHeaderRoute = currentHeaderRoute;
    },
    clearHeaders: (state) => {
      state.headers = [];
      state.currentHeaderRoute = "";
    },
    clearCurrentHeader: (state) => {
      state.currentHeader = "";
    },
    setcurrentHeader: (state, action) => {
      const { currentHeader } = action.payload;
      state.currentHeader = currentHeader;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeader.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHeader.fulfilled, (state, action) => {
        const { header } = action.payload || {};
        state.status = "succeeded";
        state.headers = header;
      })
      .addCase(fetchHeader.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  clearHeaders,
  setcurrentHeaderRoute,
  setcurrentHeader,
  clearCurrentHeader,
} = headerSlice.actions;
export default headerSlice.reducer;
