import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getBrandsApi,
  getBrandApi,
  createBrandApi,
  updateBrandApi,
  deleteBrandApi,
} from "../api/brandApi";

// ==========================
// GET ALL BRANDS
// ==========================

export const getBrands = createAsyncThunk(
  "brand/getBrands",
  async (_, { rejectWithValue }) => {
    try {
      return await getBrandsApi();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch brands"
      );
    }
  }
);

// ==========================
// GET SINGLE BRAND
// ==========================

export const getBrand = createAsyncThunk(
  "brand/getBrand",
  async (id, { rejectWithValue }) => {
    try {
      return await getBrandApi(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch brand"
      );
    }
  }
);

// ==========================
// CREATE BRAND
// ==========================

export const createBrand = createAsyncThunk(
  "brand/createBrand",
  async (brandData, { rejectWithValue }) => {
    try {
      return await createBrandApi(brandData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create brand"
      );
    }
  }
);

// ==========================
// UPDATE BRAND
// ==========================

export const updateBrand = createAsyncThunk(
  "brand/updateBrand",
  async ({ id, brandData }, { rejectWithValue }) => {
    try {
      return await updateBrandApi(id, brandData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update brand"
      );
    }
  }
);

// ==========================
// DELETE BRAND
// ==========================

export const deleteBrand = createAsyncThunk(
  "brand/deleteBrand",
  async (id, { rejectWithValue }) => {
    try {
      await deleteBrandApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete brand"
      );
    }
  }
);

const initialState = {
  brands: [],
  selectedBrand: null,
  loading: false,
  error: null,
};

const brandSlice = createSlice({
  name: "brand",

  initialState,

  reducers: {
    clearBrandError: (state) => {
      state.error = null;
    },

    clearSelectedBrand: (state) => {
      state.selectedBrand = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==========================
      // GET ALL BRANDS
      // ==========================

      .addCase(getBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload.brands || [];
      })

      .addCase(getBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // GET BRAND
      // ==========================

      .addCase(getBrand.pending, (state) => {
        state.loading = true;
      })

      .addCase(getBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBrand = action.payload.brand;
      })

      .addCase(getBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // CREATE BRAND
      // ==========================

      .addCase(createBrand.pending, (state) => {
        state.loading = true;
      })

      .addCase(createBrand.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.brand) {
          state.brands.unshift(action.payload.brand);
        }
      })

      .addCase(createBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // UPDATE BRAND
      // ==========================

      .addCase(updateBrand.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateBrand.fulfilled, (state, action) => {
        state.loading = false;

        state.brands = state.brands.map((brand) =>
          brand._id === action.payload.brand._id
            ? action.payload.brand
            : brand
        );

        state.selectedBrand = action.payload.brand;
      })

      .addCase(updateBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // DELETE BRAND
      // ==========================

      .addCase(deleteBrand.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loading = false;

        state.brands = state.brands.filter(
          (brand) => brand._id !== action.payload
        );
      })

      .addCase(deleteBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearBrandError,
  clearSelectedBrand,
} = brandSlice.actions;

export default brandSlice.reducer;