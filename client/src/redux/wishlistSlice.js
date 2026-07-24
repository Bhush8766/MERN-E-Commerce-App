import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getWishlistApi,
  addWishlistApi,
  removeWishlistApi,
  clearWishlistApi,
  getWishlistCountApi,
} from "../api/wishlistApi";

// ========================================
// Get Wishlist
// ========================================
export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getWishlistApi();
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load wishlist"
      );
    }
  }
);

// ========================================
// Add Wishlist
// ========================================
export const addWishlist = createAsyncThunk(
  "wishlist/addWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const data = await addWishlistApi(productId);
      return data;
    } catch (err) {
      console.log(err.response.data);   // <-- add this
      return rejectWithValue(
        err.response?.data?.message || "Failed to add wishlist"
      );
    }
  }
);

// ========================================
// Remove Wishlist
// ========================================
export const removeWishlist = createAsyncThunk(
  "wishlist/removeWishlist",
  async (wishlistItemId, { rejectWithValue }) => {
    try {
      await removeWishlistApi(wishlistItemId);
      return wishlistItemId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to remove wishlist"
      );
    }
  }
);

// ========================================
// Clear Wishlist
// ========================================
export const clearWishlist = createAsyncThunk(
  "wishlist/clearWishlist",
  async (_, { rejectWithValue }) => {
    try {
      await clearWishlistApi();
      return true;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to clear wishlist"
      );
    }
  }
);

// ========================================
// Wishlist Count
// ========================================
export const getWishlistCount = createAsyncThunk(
  "wishlist/getWishlistCount",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getWishlistCountApi();
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Failed to get wishlist count"
      );
    }
  }
);

// ========================================
// Initial State
// ========================================
const initialState = {
  items: [],
  count: 0,
  loading: false,
  error: null,
};

// ========================================
// Slice
// ========================================
const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ========================================
      // Get Wishlist
      // ========================================

      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getWishlist.fulfilled, (state, action) => {
        state.loading = false;

        const wishlist = action.payload?.wishlist;

        if (wishlist?.products) {
          state.items = wishlist.products;
        } else if (Array.isArray(action.payload?.wishlist)) {
          state.items = action.payload.wishlist;
        } else {
          state.items = [];
        }

        state.count = state.items.length;
      })

      .addCase(getWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========================================
      // Add Wishlist
      // ========================================

      .addCase(addWishlist.pending, (state) => {
        state.loading = true;
      })

      .addCase(addWishlist.fulfilled, (state, action) => {
        state.loading = false;

        const wishlist = action.payload?.wishlist;

        if (wishlist?.products) {
          state.items = wishlist.products;
        }

        state.count = state.items.length;
      })

      .addCase(addWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========================================
      // Remove Wishlist
      // ========================================

      .addCase(removeWishlist.pending, (state) => {
        state.loading = true;
      })

      .addCase(removeWishlist.fulfilled, (state, action) => {
        state.loading = false;

        state.items = state.items.filter(
          (item) => item._id !== action.payload
        );

        state.count = state.items.length;
      })

      .addCase(removeWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========================================
      // Clear Wishlist
      // ========================================

      .addCase(clearWishlist.pending, (state) => {
        state.loading = true;
      })

      .addCase(clearWishlist.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
        state.count = 0;
      })

      .addCase(clearWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========================================
      // Wishlist Count
      // ========================================

      .addCase(getWishlistCount.fulfilled, (state, action) => {
        state.count = action.payload?.count || 0;
      });
  },
});

export default wishlistSlice.reducer;