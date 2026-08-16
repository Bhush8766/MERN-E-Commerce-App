import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getVendorDashboardApi,
  getVendorProductsApi,
  getVendorProductApi,
  createVendorProductApi,
  updateVendorProductApi,
  deleteVendorProductApi,
  getVendorOrdersApi,
  getVendorEarningsApi,
} from "../api/vendorApi";

// ======================================================
// DASHBOARD
// ======================================================

export const getVendorDashboard =
  createAsyncThunk(
    "vendor/getDashboard",

    async (
      _,
      { rejectWithValue }
    ) => {
      try {
        return await getVendorDashboardApi();
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to load vendor dashboard"
        );
      }
    }
  );

// ======================================================
// GET PRODUCTS
// ======================================================

export const getVendorProducts =
  createAsyncThunk(
    "vendor/getProducts",

    async (
      _,
      { rejectWithValue }
    ) => {
      try {
        return await getVendorProductsApi();
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to load vendor products"
        );
      }
    }
  );

// ======================================================
// GET SINGLE PRODUCT
// ======================================================

export const getVendorProduct =
  createAsyncThunk(
    "vendor/getProduct",

    async (
      id,
      { rejectWithValue }
    ) => {
      try {
        return await getVendorProductApi(
          id
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to load vendor product"
        );
      }
    }
  );

// ======================================================
// CREATE PRODUCT
// ======================================================

export const createVendorProduct =
  createAsyncThunk(
    "vendor/createProduct",

    async (
      productData,
      { rejectWithValue }
    ) => {
      try {
        return await createVendorProductApi(
          productData
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to create vendor product"
        );
      }
    }
  );

// ======================================================
// UPDATE PRODUCT
// ======================================================

export const updateVendorProduct =
  createAsyncThunk(
    "vendor/updateProduct",

    async (
      { id, productData },
      { rejectWithValue }
    ) => {
      try {
        return await updateVendorProductApi(
          id,
          productData
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to update vendor product"
        );
      }
    }
  );

// ======================================================
// DELETE PRODUCT
// ======================================================

export const deleteVendorProduct =
  createAsyncThunk(
    "vendor/deleteProduct",

    async (
      id,
      { rejectWithValue }
    ) => {
      try {
        return await deleteVendorProductApi(
          id
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to delete vendor product"
        );
      }
    }
  );

// ======================================================
// ORDERS
// ======================================================

export const getVendorOrders =
  createAsyncThunk(
    "vendor/getOrders",

    async (
      _,
      { rejectWithValue }
    ) => {
      try {
        return await getVendorOrdersApi();
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to load vendor orders"
        );
      }
    }
  );

// ======================================================
// EARNINGS
// ======================================================

export const getVendorEarnings =
  createAsyncThunk(
    "vendor/getEarnings",

    async (
      _,
      { rejectWithValue }
    ) => {
      try {
        return await getVendorEarningsApi();
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to load vendor earnings"
        );
      }
    }
  );

// ======================================================
// INITIAL STATE
// ======================================================

const initialState = {
  dashboard: {
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
  },

  products: [],

  currentProduct: null,

  orders: [],

  earnings: 0,

  loading: false,

  productLoading: false,

  productSaving: false,

  deletingProduct: false,

  error: null,
};

// ======================================================
// SLICE
// ======================================================

const vendorSlice =
  createSlice({
    name: "vendor",

    initialState,

    reducers: {
      clearVendorError:
        (state) => {
          state.error = null;
        },

      clearCurrentProduct:
        (state) => {
          state.currentProduct =
            null;
        },

      resetVendorState:
        (state) => {
          state.dashboard = {
            totalProducts: 0,
            totalOrders: 0,
            totalSales: 0,
            pendingOrders: 0,
            deliveredOrders: 0,
          };

          state.products = [];

          state.currentProduct =
            null;

          state.orders = [];

          state.earnings = 0;

          state.loading = false;

          state.productLoading =
            false;

          state.productSaving =
            false;

          state.deletingProduct =
            false;

          state.error = null;
        },
    },

    extraReducers:
      (builder) => {
        builder

          // ==========================================
          // DASHBOARD
          // ==========================================

          .addCase(
            getVendorDashboard.pending,
            (state) => {
              state.loading =
                true;

              state.error =
                null;
            }
          )

          .addCase(
            getVendorDashboard.fulfilled,
            (
              state,
              action
            ) => {
              state.loading =
                false;

              state.dashboard =
                action.payload
                  ?.dashboard ||
                state.dashboard;
            }
          )

          .addCase(
            getVendorDashboard.rejected,
            (
              state,
              action
            ) => {
              state.loading =
                false;

              state.error =
                action.payload;
            }
          )

          // ==========================================
          // PRODUCTS
          // ==========================================

          .addCase(
            getVendorProducts.pending,
            (state) => {
              state.loading =
                true;

              state.error =
                null;
            }
          )

          .addCase(
            getVendorProducts.fulfilled,
            (
              state,
              action
            ) => {
              state.loading =
                false;

              state.products =
                action.payload
                  ?.products ||
                [];
            }
          )

          .addCase(
            getVendorProducts.rejected,
            (
              state,
              action
            ) => {
              state.loading =
                false;

              state.error =
                action.payload;
            }
          )

          // ==========================================
          // SINGLE PRODUCT
          // ==========================================

          .addCase(
            getVendorProduct.pending,
            (state) => {
              state.productLoading =
                true;

              state.error =
                null;

              state.currentProduct =
                null;
            }
          )

          .addCase(
            getVendorProduct.fulfilled,
            (
              state,
              action
            ) => {
              state.productLoading =
                false;

              state.currentProduct =
                action.payload
                  ?.product ||
                null;
            }
          )

          .addCase(
            getVendorProduct.rejected,
            (
              state,
              action
            ) => {
              state.productLoading =
                false;

              state.currentProduct =
                null;

              state.error =
                action.payload;
            }
          )

          // ==========================================
          // CREATE PRODUCT
          // ==========================================

          .addCase(
            createVendorProduct.pending,
            (state) => {
              state.productSaving =
                true;

              state.error =
                null;
            }
          )

          .addCase(
            createVendorProduct.fulfilled,
            (
              state,
              action
            ) => {
              state.productSaving =
                false;

              const product =
                action.payload
                  ?.product;

              if (product) {
                state.products.unshift(
                  product
                );

                state.currentProduct =
                  product;
              }
            }
          )

          .addCase(
            createVendorProduct.rejected,
            (
              state,
              action
            ) => {
              state.productSaving =
                false;

              state.error =
                action.payload;
            }
          )

          // ==========================================
          // UPDATE PRODUCT
          // ==========================================

          .addCase(
            updateVendorProduct.pending,
            (state) => {
              state.productSaving =
                true;

              state.error =
                null;
            }
          )

          .addCase(
            updateVendorProduct.fulfilled,
            (
              state,
              action
            ) => {
              state.productSaving =
                false;

              const product =
                action.payload
                  ?.product;

              if (product) {
                state.currentProduct =
                  product;

                const index =
                  state.products.findIndex(
                    (item) =>
                      item._id ===
                      product._id
                  );

                if (
                  index !== -1
                ) {
                  state.products[
                    index
                  ] = product;
                }
              }
            }
          )

          .addCase(
            updateVendorProduct.rejected,
            (
              state,
              action
            ) => {
              state.productSaving =
                false;

              state.error =
                action.payload;
            }
          )

          // ==========================================
          // DELETE PRODUCT
          // ==========================================

          .addCase(
            deleteVendorProduct.pending,
            (state) => {
              state.deletingProduct =
                true;

              state.error =
                null;
            }
          )

          .addCase(
            deleteVendorProduct.fulfilled,
            (
              state,
              action
            ) => {
              state.deletingProduct =
                false;

              const id =
                action.payload
                  ?.productId;

              if (id) {
                state.products =
                  state.products.filter(
                    (product) =>
                      product._id !==
                      id
                  );
              }
            }
          )

          .addCase(
            deleteVendorProduct.rejected,
            (
              state,
              action
            ) => {
              state.deletingProduct =
                false;

              state.error =
                action.payload;
            }
          )

          // ==========================================
          // ORDERS
          // ==========================================

          .addCase(
            getVendorOrders.pending,
            (state) => {
              state.loading =
                true;

              state.error =
                null;
            }
          )

          .addCase(
            getVendorOrders.fulfilled,
            (
              state,
              action
            ) => {
              state.loading =
                false;

              state.orders =
                action.payload
                  ?.orders ||
                [];
            }
          )

          .addCase(
            getVendorOrders.rejected,
            (
              state,
              action
            ) => {
              state.loading =
                false;

              state.error =
                action.payload;
            }
          )

          // ==========================================
          // EARNINGS
          // ==========================================

          .addCase(
            getVendorEarnings.pending,
            (state) => {
              state.loading =
                true;

              state.error =
                null;
            }
          )

          .addCase(
            getVendorEarnings.fulfilled,
            (
              state,
              action
            ) => {
              state.loading =
                false;

              state.earnings =
                action.payload
                  ?.totalEarnings ||
                0;
            }
          )

          .addCase(
            getVendorEarnings.rejected,
            (
              state,
              action
            ) => {
              state.loading =
                false;

              state.error =
                action.payload;
            }
          );
      },
  });

// ======================================================
// ACTIONS
// ======================================================

export const {
  clearVendorError,
  clearCurrentProduct,
  resetVendorState,
} = vendorSlice.actions;

// ======================================================
// REDUCER
// ======================================================

export default vendorSlice.reducer;