import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getProfileApi,
  updateProfileApi,
  getUsersApi,
  updateUserRoleApi,
  deleteUserApi,
  changePasswordApi,

  // Address APIs
  getAddressesApi,
  addAddressApi,
  updateAddressApi,
  deleteAddressApi,
  setDefaultAddressApi,

} from "../api/userApi";

// ======================================
// GET LOGGED-IN USER PROFILE
// ======================================

export const getProfile = createAsyncThunk(
  "users/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      return await getProfileApi();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load profile"
      );
    }
  }
);

// ======================================
// UPDATE PROFILE
// ======================================

export const updateProfile = createAsyncThunk(
  "users/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      return await updateProfileApi(userData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

// ======================================
// GET ALL USERS (ADMIN)
// ======================================

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

// ======================================
// UPDATE USER ROLE (ADMIN)
// ======================================

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




// ======================================
// CHANGE PASSWORD
// ======================================

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (data, { rejectWithValue }) => {

    try {

      const response = await changePasswordApi(data);

      return response.data;

    } catch(error){

      return rejectWithValue(
        error.response.data
      );

    }

  }
);
// ======================================
// DELETE USER (ADMIN)
// ======================================

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





// ======================================
// GET SAVED ADDRESSES
// ======================================

export const getAddresses = createAsyncThunk(
  "users/getAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAddressesApi();

      return response.data.addresses;

    } catch (error) {

      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to load addresses"
      );

    }
  }
);



// ======================================
// ADD ADDRESS
// ======================================

export const addAddress = createAsyncThunk(
  "users/addAddress",
  async (data, { rejectWithValue }) => {

    try {

      const response = await addAddressApi(data);

      return response.data.addresses;

    } catch (error) {

      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to add address"
      );

    }

  }
);




// ======================================
// UPDATE ADDRESS
// ======================================

export const updateAddress = createAsyncThunk(
  "users/updateAddress",
  async ({ id, data }, { rejectWithValue }) => {

    try {

      const response = await updateAddressApi(id, data);

      return response.data.addresses;

    } catch (error) {

      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to update address"
      );

    }

  }
);




// ======================================
// DELETE ADDRESS
// ======================================

export const deleteAddress = createAsyncThunk(
  "users/deleteAddress",
  async (id, { rejectWithValue }) => {

    try {

      const response = await deleteAddressApi(id);

      return response.data.addresses;

    } catch (error) {

      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to delete address"
      );

    }

  }
);




// ======================================
// SET DEFAULT ADDRESS
// ======================================

export const setDefaultAddress = createAsyncThunk(
  "users/setDefaultAddress",
  async (id, { rejectWithValue }) => {

    try {

      const response = await setDefaultAddressApi(id);

      return response.data.addresses;

    } catch (error) {

      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to set default address"
      );

    }

  }
);







const userSlice = createSlice({
  name: "users",

  initialState: {
  profile: null,

  users: [],

  // Saved Addresses
  addresses: [],

  loading: false,

  success: false,

  error: null,
},

  reducers: {
    clearUserState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder


      // ======================================
      // CHANGE PASSWORD
      // ======================================


      .addCase(changePassword.pending, (state) => {

        state.loading = true;

        state.success = false;

      })


      .addCase(changePassword.fulfilled, (state) => {

        state.loading = false;

        state.success = true;

      })


      .addCase(changePassword.rejected, (state, action) => {

        state.loading = false;

        state.error = action.payload;

      })

      // ======================================
      // GET PROFILE
      // ======================================

      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.user;
      })

      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================================
      // UPDATE PROFILE
      // ======================================

      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.profile = action.payload.user;
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })






      // ======================================
      // GET USERS
      // ======================================

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

      // ======================================
      // UPDATE ROLE
      // ======================================

      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user._id === action.payload.user._id
            ? action.payload.user
            : user
        );
      })



      // ======================================
      // DELETE USER
      // ======================================

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user._id !== action.payload
        );
      })


      // ======================================
// GET SAVED ADDRESSES
// ======================================

.addCase(getAddresses.pending, (state) => {

  state.loading = true;

  state.error = null;

})

.addCase(getAddresses.fulfilled, (state, action) => {

  state.loading = false;

  state.addresses = action.payload;

})

.addCase(getAddresses.rejected, (state, action) => {

  state.loading = false;

  state.error = action.payload;

})



// ======================================
// ADD ADDRESS
// ======================================

.addCase(addAddress.pending, (state) => {

  state.loading = true;

})

.addCase(addAddress.fulfilled, (state, action) => {

  state.loading = false;

  state.success = true;

  state.addresses = action.payload;

})

.addCase(addAddress.rejected, (state, action) => {

  state.loading = false;

  state.error = action.payload;

})



// ======================================
// UPDATE ADDRESS
// ======================================

.addCase(updateAddress.pending, (state) => {

  state.loading = true;

})

.addCase(updateAddress.fulfilled, (state, action) => {

  state.loading = false;

  state.success = true;

  state.addresses = action.payload;

})

.addCase(updateAddress.rejected, (state, action) => {

  state.loading = false;

  state.error = action.payload;

})



// ======================================
// DELETE ADDRESS
// ======================================

.addCase(deleteAddress.pending, (state) => {

  state.loading = true;

})

.addCase(deleteAddress.fulfilled, (state, action) => {

  state.loading = false;

  state.success = true;

  state.addresses = action.payload;

})

.addCase(deleteAddress.rejected, (state, action) => {

  state.loading = false;

  state.error = action.payload;

})



// ======================================
// SET DEFAULT ADDRESS
// ======================================

.addCase(setDefaultAddress.pending, (state) => {

  state.loading = true;

})

.addCase(setDefaultAddress.fulfilled, (state, action) => {

  state.loading = false;

  state.success = true;

  state.addresses = action.payload;

})

.addCase(setDefaultAddress.rejected, (state, action) => {

  state.loading = false;

  state.error = action.payload;

})
}


});

export const { clearUserState } = userSlice.actions;

export default userSlice.reducer;