import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getCategoriesApi,
  getCategoryApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from "../api/categoryApi";

// ==========================
// GET ALL CATEGORIES
// ==========================

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      return await getCategoriesApi();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);

// ==========================
// GET SINGLE CATEGORY
// ==========================

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async (id, { rejectWithValue }) => {
    try {
      return await getCategoryApi(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch category"
      );
    }
  }
);

// ==========================
// CREATE CATEGORY
// ==========================

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      return await createCategoryApi(categoryData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create category"
      );
    }
  }
);

// ==========================
// UPDATE CATEGORY
// ==========================

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      return await updateCategoryApi(id, categoryData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update category"
      );
    }
  }
);

// ==========================
// DELETE CATEGORY
// ==========================

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      await deleteCategoryApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete category"
      );
    }
  }
);

const initialState = {
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",

  initialState,

  reducers: {
    clearCategoryError: (state) => {
      state.error = null;
    },

    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==========================
      // GET ALL
      // ==========================

      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories || [];
      })

      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // GET SINGLE
      // ==========================

      .addCase(getCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCategory = action.payload.category;
      })

      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // CREATE
      // ==========================

      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.category) {
          state.categories.unshift(action.payload.category);
        }
      })

      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // UPDATE
      // ==========================

      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.categories = state.categories.map((category) =>
          category._id === action.payload.category._id
            ? action.payload.category
            : category
        );

        state.selectedCategory = action.payload.category;
      })

      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // DELETE
      // ==========================

      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.categories = state.categories.filter(
          (category) => category._id !== action.payload
        );
      })

      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearCategoryError,
  clearSelectedCategory,
} = categorySlice.actions;

export default categorySlice.reducer;