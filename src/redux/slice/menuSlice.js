// src/features/header/headerSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockResponse } from "../../components/mockResponses/mockResponse";

// Async thunk for fetching the header
export const fetchMenu = createAsyncThunk(
  "menu/fetchMenu",
  async ({ headerId }, { rejectWithValue }) => {
    try {
      // const response = await axios.get(
      //   `http://localhost:8080/menu/${headerId}`
      // );
      return mockResponse.menuResponse[headerId];
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const MenuSlice = createSlice({
  name: "menu",
  initialState: {
    menu: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearMenu: (state) => {
      state.menu = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.menu = action.payload.data;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearMenu } = MenuSlice.actions;
export default MenuSlice.reducer;
