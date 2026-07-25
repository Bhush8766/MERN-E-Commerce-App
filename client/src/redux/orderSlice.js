import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  createOrderAPI,
  getMyOrdersApi,
  getOrderDetailsAPI,
  cancelOrderApi,
  getAdminOrdersApi,
  updateOrderStatusApi,
  deleteOrderApi,
} from "../api/orderApi";

// ==========================================
// CREATE ORDER
// ==========================================
export const createOrder = createAsyncThunk(
    "orders/createOrder",

    async(orderData,{rejectWithValue})=>{

        try{

            const response =
                await createOrderAPI(orderData);


            return response.data;

        }
        catch(error){

            return rejectWithValue(
                error.response?.data?.message ||
                "Order failed"
            );

        }

    }
);

// ==========================================
// GET MY ORDERS
// ==========================================
export const getMyOrders = createAsyncThunk(
  "orders/getMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      return await getMyOrdersApi();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to load orders"
      );
    }
  }
);

// ==========================================
// GET ORDER DETAILS
// ==========================================
export const getOrderDetails = createAsyncThunk(
  "orders/getOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      return await getOrderDetailsAPI(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to load order"
      );
    }
  }
);

// ==========================================
// CANCEL ORDER
// ==========================================
export const cancelOrder = createAsyncThunk(
  "orders/cancelOrder",
  async (id, { rejectWithValue }) => {
    try {
      return await cancelOrderApi(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to cancel order"
      );
    }
  }
);

// ==========================================
// ADMIN - GET ALL ORDERS
// ==========================================
export const getAdminOrders = createAsyncThunk(
  "orders/getAdminOrders",
  async (_, { rejectWithValue }) => {
    try {
      return await getAdminOrdersApi();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to load admin orders"
      );
    }
  }
);

// ==========================================
// ADMIN - UPDATE STATUS
// ==========================================
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      return await updateOrderStatusApi(id, status);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update status"
      );
    }
  }
);

// ==========================================
// ADMIN - DELETE ORDER
// ==========================================
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      await deleteOrderApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete order"
      );
    }
  }
);

const initialState = {

    orders:[],
    order:null,
    loading:false,
    error:null

};

const orderSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    clearOrder: (state) => {
      state.order = null;
    },

    clearOrderError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==========================================
      // CREATE ORDER
      // ==========================================
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.order = action.payload.order;

        state.orders.unshift(action.payload.order);
      })

      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================================
      // GET MY ORDERS
      // ==========================================
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
      })

      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = action.payload.orders || [];
      })

      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================================
      // GET ORDER DETAILS
      // ==========================================
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
      })

      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;

        state.order = action.payload.order;
      })

      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================================
      // CANCEL ORDER
      // ==========================================
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.orders = state.orders.map((order) =>
          order._id === action.payload.order._id
            ? action.payload.order
            : order
        );

        if (
          state.order &&
          state.order._id === action.payload.order._id
        ) {
          state.order = action.payload.order;
        }
      })

      // ==========================================
      // ADMIN GET ORDERS
      // ==========================================
      .addCase(getAdminOrders.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAdminOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = action.payload.orders;
      })

      .addCase(getAdminOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================================
      // ADMIN UPDATE STATUS
      // ==========================================
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.orders = state.orders.map((order) =>
          order._id === action.payload.order._id
            ? action.payload.order
            : order
        );

        if (
          state.order &&
          state.order._id === action.payload.order._id
        ) {
          state.order = action.payload.order;
        }
      })

      // ==========================================
      // ADMIN DELETE ORDER
      // ==========================================
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );

        if (
          state.order &&
          state.order._id === action.payload
        ) {
          state.order = null;
        }
      });
  },
});

export const {
  clearOrder,
  clearOrderError,
} = orderSlice.actions;

export default orderSlice.reducer;