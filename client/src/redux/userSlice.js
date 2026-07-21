import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getUsersApi,
  updateUserRoleApi,
  deleteUserApi,
} from "../api/userApi";

// ==============================
// GET USERS
// ==============================

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      return await getUsersApi();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load users"
      );
    }
  }
);

// ==============================
// UPDATE USER ROLE
// ==============================

export const updateUserRole = createAsyncThunk(
  "users/updateRole",
  async ({ id, role }, { rejectWithValue }) => {
    try {
      return await updateUserRoleApi(id, role);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update role"
      );
    }
  }
);

// ==============================
// DELETE USER
// ==============================

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteUserApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

const userSlice = createSlice({
  name: "users",

  initialState: {
    users: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ======================
      // GET USERS
      // ======================

      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })

      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users || [];
      })

      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================
      // UPDATE ROLE
      // ======================

      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user._id === action.payload.user._id
            ? action.payload.user
            : user
        );
      })

      // ======================
      // DELETE USER
      // ======================

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user._id !== action.payload
        );
      });
  },
});

export default userSlice.reducer;