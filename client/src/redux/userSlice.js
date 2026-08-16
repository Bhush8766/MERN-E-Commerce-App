import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getProfileApi,
  updateProfileApi,
  changePasswordApi,

  // Admin APIs
  getUsersApi,
  getUserByIdApi,
  updateUserApi,
  blockUserApi,
  unblockUserApi,
  updateUserRoleApi,
  deleteUserApi,

  // Address APIs
  getAddressesApi,
  addAddressApi,
  updateAddressApi,
  deleteAddressApi,
  setDefaultAddressApi,
} from "../api/userApi";

// =====================================================
// GET LOGGED-IN USER PROFILE
// =====================================================

export const getProfile = createAsyncThunk(
  "users/getProfile",

  async (_, { rejectWithValue }) => {
    try {
      const response =
        await getProfileApi();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to load profile"
      );
    }
  }
);

// =====================================================
// UPDATE PROFILE
// =====================================================

export const updateProfile =
  createAsyncThunk(
    "users/updateProfile",

    async (
      userData,
      { rejectWithValue }
    ) => {
      try {
        const response =
          await updateProfileApi(
            userData
          );

        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to update profile"
        );
      }
    }
  );

// =====================================================
// CHANGE PASSWORD
// =====================================================

export const changePassword =
  createAsyncThunk(
    "users/changePassword",

    async (
      data,
      { rejectWithValue }
    ) => {
      try {
        const response =
          await changePasswordApi(
            data
          );

        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to change password"
        );
      }
    }
  );

// =====================================================
// ADMIN - GET ALL USERS
// =====================================================

export const getUsers =
  createAsyncThunk(
    "users/getUsers",

    async (
      _,
      { rejectWithValue }
    ) => {
      try {
        return await getUsersApi();
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to load users"
        );
      }
    }
  );

// =====================================================
// ADMIN - GET USER BY ID
// =====================================================

export const getUserById =
  createAsyncThunk(
    "users/getUserById",

    async (
      id,
      { rejectWithValue }
    ) => {
      try {
        return await getUserByIdApi(
          id
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to load user"
        );
      }
    }
  );

// =====================================================
// ADMIN - UPDATE USER
// =====================================================

export const updateUser =
  createAsyncThunk(
    "users/updateUser",

    async (
      { id, userData },
      { rejectWithValue }
    ) => {
      try {
        return await updateUserApi(
          id,
          userData
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to update user"
        );
      }
    }
  );

// =====================================================
// ADMIN - BLOCK USER
// =====================================================

export const blockUser =
  createAsyncThunk(
    "users/blockUser",

    async (
      id,
      { rejectWithValue }
    ) => {
      try {
        return await blockUserApi(
          id
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to block user"
        );
      }
    }
  );

// =====================================================
// ADMIN - UNBLOCK USER
// =====================================================

export const unblockUser =
  createAsyncThunk(
    "users/unblockUser",

    async (
      id,
      { rejectWithValue }
    ) => {
      try {
        return await unblockUserApi(
          id
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to unblock user"
        );
      }
    }
  );

// =====================================================
// ADMIN - UPDATE USER ROLE
// =====================================================

export const updateUserRole =
  createAsyncThunk(
    "users/updateUserRole",

    async (
      { id, role },
      { rejectWithValue }
    ) => {
      try {
        return await updateUserRoleApi(
          id,
          role
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to update role"
        );
      }
    }
  );

// =====================================================
// ADMIN - DELETE USER
// =====================================================

export const deleteUser =
  createAsyncThunk(
    "users/deleteUser",

    async (
      id,
      { rejectWithValue }
    ) => {
      try {
        return await deleteUserApi(
          id
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to delete user"
        );
      }
    }
  );

// =====================================================
// GET SAVED ADDRESSES
// =====================================================

export const getAddresses =
  createAsyncThunk(
    "users/getAddresses",

    async (
      _,
      { rejectWithValue }
    ) => {
      try {
        const response =
          await getAddressesApi();

        return (
          response.data
            ?.addresses || []
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to load addresses"
        );
      }
    }
  );

// =====================================================
// ADD ADDRESS
// =====================================================

export const addAddress =
  createAsyncThunk(
    "users/addAddress",

    async (
      data,
      { rejectWithValue }
    ) => {
      try {
        const response =
          await addAddressApi(data);

        return (
          response.data
            ?.addresses || []
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to add address"
        );
      }
    }
  );

// =====================================================
// UPDATE ADDRESS
// =====================================================

export const updateAddress =
  createAsyncThunk(
    "users/updateAddress",

    async (
      { id, data },
      { rejectWithValue }
    ) => {
      try {
        const response =
          await updateAddressApi(
            id,
            data
          );

        return (
          response.data
            ?.addresses || []
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to update address"
        );
      }
    }
  );

// =====================================================
// DELETE ADDRESS
// =====================================================

export const deleteAddress =
  createAsyncThunk(
    "users/deleteAddress",

    async (
      id,
      { rejectWithValue }
    ) => {
      try {
        const response =
          await deleteAddressApi(
            id
          );

        return (
          response.data
            ?.addresses || []
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to delete address"
        );
      }
    }
  );

// =====================================================
// SET DEFAULT ADDRESS
// =====================================================

export const setDefaultAddress =
  createAsyncThunk(
    "users/setDefaultAddress",

    async (
      id,
      { rejectWithValue }
    ) => {
      try {
        const response =
          await setDefaultAddressApi(
            id
          );

        return (
          response.data
            ?.addresses || []
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to set default address"
        );
      }
    }
  );

// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
  profile: null,

  users: [],

  selectedUser: null,

  addresses: [],

  loading: false,

  userLoading: false,

  actionLoading: false,

  success: false,

  error: null,

  actionError: null,
};

// =====================================================
// SLICE
// =====================================================

const userSlice = createSlice({
  name: "users",

  initialState,

  reducers: {
    clearUserState: (state) => {
      state.loading = false;
      state.userLoading = false;
      state.actionLoading = false;
      state.success = false;
      state.error = null;
      state.actionError = null;
    },

    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },

    clearUserError: (state) => {
      state.error = null;
      state.actionError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =================================================
      // GET PROFILE
      // =================================================

      .addCase(
        getProfile.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getProfile.fulfilled,
        (state, action) => {
          state.loading = false;
          state.profile =
            action.payload.user;
        }
      )

      .addCase(
        getProfile.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload;
        }
      )

      // =================================================
      // UPDATE PROFILE
      // =================================================

      .addCase(
        updateProfile.pending,
        (state) => {
          state.loading = true;
          state.success = false;
          state.error = null;
        }
      )

      .addCase(
        updateProfile.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.profile =
            action.payload.user;
        }
      )

      .addCase(
        updateProfile.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error =
            action.payload;
        }
      )

      // =================================================
      // CHANGE PASSWORD
      // =================================================

      .addCase(
        changePassword.pending,
        (state) => {
          state.loading = true;
          state.success = false;
          state.error = null;
        }
      )

      .addCase(
        changePassword.fulfilled,
        (state) => {
          state.loading = false;
          state.success = true;
        }
      )

      .addCase(
        changePassword.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error =
            action.payload;
        }
      )

      // =================================================
      // ADMIN - GET USERS
      // =================================================

      .addCase(
        getUsers.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getUsers.fulfilled,
        (state, action) => {
          state.loading = false;

          state.users =
            action.payload
              ?.users || [];
        }
      )

      .addCase(
        getUsers.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload;
        }
      )

      // =================================================
      // ADMIN - GET USER BY ID
      // =================================================

      .addCase(
        getUserById.pending,
        (state) => {
          state.userLoading = true;
          state.error = null;
        }
      )

      .addCase(
        getUserById.fulfilled,
        (state, action) => {
          state.userLoading = false;

          state.selectedUser =
            action.payload.user;
        }
      )

      .addCase(
        getUserById.rejected,
        (state, action) => {
          state.userLoading = false;
          state.error =
            action.payload;
        }
      )

      // =================================================
      // ADMIN - UPDATE USER
      // =================================================

      .addCase(
        updateUser.pending,
        (state) => {
          state.actionLoading = true;
          state.actionError = null;
        }
      )

      .addCase(
        updateUser.fulfilled,
        (state, action) => {
          state.actionLoading = false;
          state.success = true;

          const updatedUser =
            action.payload.user;

          state.users =
            state.users.map(
              (user) =>
                user._id ===
                updatedUser._id
                  ? updatedUser
                  : user
            );

          if (
            state.selectedUser?._id ===
            updatedUser._id
          ) {
            state.selectedUser =
              updatedUser;
          }
        }
      )

      .addCase(
        updateUser.rejected,
        (state, action) => {
          state.actionLoading = false;
          state.actionError =
            action.payload;
        }
      )

      // =================================================
      // ADMIN - BLOCK USER
      // =================================================

      .addCase(
        blockUser.pending,
        (state) => {
          state.actionLoading = true;
          state.actionError = null;
        }
      )

      .addCase(
        blockUser.fulfilled,
        (state, action) => {
          state.actionLoading = false;

          const updatedUser =
            action.payload.user;

          state.users =
            state.users.map(
              (user) =>
                user._id ===
                updatedUser._id
                  ? updatedUser
                  : user
            );
        }
      )

      .addCase(
        blockUser.rejected,
        (state, action) => {
          state.actionLoading = false;
          state.actionError =
            action.payload;
        }
      )

      // =================================================
      // ADMIN - UNBLOCK USER
      // =================================================

      .addCase(
        unblockUser.pending,
        (state) => {
          state.actionLoading = true;
          state.actionError = null;
        }
      )

      .addCase(
        unblockUser.fulfilled,
        (state, action) => {
          state.actionLoading = false;

          const updatedUser =
            action.payload.user;

          state.users =
            state.users.map(
              (user) =>
                user._id ===
                updatedUser._id
                  ? updatedUser
                  : user
            );
        }
      )

      .addCase(
        unblockUser.rejected,
        (state, action) => {
          state.actionLoading = false;
          state.actionError =
            action.payload;
        }
      )

      // =================================================
      // ADMIN - UPDATE ROLE
      // =================================================

      .addCase(
        updateUserRole.pending,
        (state) => {
          state.actionLoading = true;
          state.actionError = null;
        }
      )

      .addCase(
        updateUserRole.fulfilled,
        (state, action) => {
          state.actionLoading = false;

          const updatedUser =
            action.payload.user;

          state.users =
            state.users.map(
              (user) =>
                user._id ===
                updatedUser._id
                  ? updatedUser
                  : user
            );
        }
      )

      .addCase(
        updateUserRole.rejected,
        (state, action) => {
          state.actionLoading = false;
          state.actionError =
            action.payload;
        }
      )

      // =================================================
      // ADMIN - DELETE USER
      // =================================================

      .addCase(
        deleteUser.pending,
        (state) => {
          state.actionLoading = true;
          state.actionError = null;
        }
      )

      .addCase(
        deleteUser.fulfilled,
        (state, action) => {
          state.actionLoading = false;

          const deletedId =
            action.payload.userId;

          state.users =
            state.users.filter(
              (user) =>
                user._id !==
                deletedId
            );
        }
      )

      .addCase(
        deleteUser.rejected,
        (state, action) => {
          state.actionLoading = false;
          state.actionError =
            action.payload;
        }
      )

      // =================================================
      // GET ADDRESSES
      // =================================================

      .addCase(
        getAddresses.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getAddresses.fulfilled,
        (state, action) => {
          state.loading = false;

          state.addresses =
            action.payload;
        }
      )

      .addCase(
        getAddresses.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload;
        }
      )

      // =================================================
      // ADD ADDRESS
      // =================================================

      .addCase(
        addAddress.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        addAddress.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.addresses =
            action.payload;
        }
      )

      .addCase(
        addAddress.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload;
        }
      )

      // =================================================
      // UPDATE ADDRESS
      // =================================================

      .addCase(
        updateAddress.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        updateAddress.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.addresses =
            action.payload;
        }
      )

      .addCase(
        updateAddress.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload;
        }
      )

      // =================================================
      // DELETE ADDRESS
      // =================================================

      .addCase(
        deleteAddress.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        deleteAddress.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.addresses =
            action.payload;
        }
      )

      .addCase(
        deleteAddress.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload;
        }
      )

      // =================================================
      // SET DEFAULT ADDRESS
      // =================================================

      .addCase(
        setDefaultAddress.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        setDefaultAddress.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.addresses =
            action.payload;
        }
      )

      .addCase(
        setDefaultAddress.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload;
        }
      );
  },
});

// =====================================================
// ACTIONS
// =====================================================

export const {
  clearUserState,
  clearSelectedUser,
  clearUserError,
} = userSlice.actions;

// =====================================================
// REDUCER
// =====================================================

export default userSlice.reducer;