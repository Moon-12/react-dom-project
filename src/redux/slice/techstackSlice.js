// src/features/header/headerSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fireStoreDB } from "../../firebase/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

// Async thunk for fetching the techstacks
export const fetchTechStack = createAsyncThunk(
  "tech/fetchTechstack",
  async (_, { rejectWithValue }) => {
    try {
      const techDocRef = doc(fireStoreDB, "common", "techstack-metadata");
      const docSnap = await getDoc(techDocRef);
      if (docSnap.exists()) return docSnap.data();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const techSlice = createSlice({
  name: "techstack",
  initialState: {
    techStacks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTechStack.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTechStack.fulfilled, (state, action) => {
        const { tech } = action.payload || {};
        state.status = "succeeded";
        state.techStacks = tech;
      })
      .addCase(fetchTechStack.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default techSlice.reducer;
