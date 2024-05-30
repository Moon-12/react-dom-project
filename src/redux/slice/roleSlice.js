import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define an async thunk to fetch roles
export const fetchRoles = createAsyncThunk("roles/fetchRoles", async () => {
  const response = await axios.get("http://localhost:8080/role/get-role"); // Update with your API endpoint
  return response.data;
});

// Create a slice for roles
const rolesSlice = createSlice({
  name: "roles",
  initialState: {
    roles: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default rolesSlice.reducer;
