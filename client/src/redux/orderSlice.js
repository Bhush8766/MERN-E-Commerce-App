import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import {
    createOrderApi,
    getMyOrdersApi,
    getAdminOrdersApi,
    updateOrderStatusApi,
    getOrderByIdApi,
    cancelOrderApi,
    deleteOrderApi,
} from "../api/orderApi";

// ==========================================
// CREATE ORDER
// ==========================================

export const createOrder = createAsyncThunk(
    "orders/create",
    async (data, { rejectWithValue }) => {
        try {
            return await createOrderApi(data);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Order Failed"
            );
        }
    }
);

// ==========================================
// GET MY ORDERS
// ==========================================

export const getMyOrders = createAsyncThunk(
    "orders/myOrders",
    async (_, { rejectWithValue }) => {
        try {
            return await getMyOrdersApi();
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Unable To Fetch Orders"
            );
        }
    }
);

// ==========================================
// GET ADMIN ORDERS
// ==========================================

export const getOrders = createAsyncThunk(
    "orders/getOrders",
    async (_, { rejectWithValue }) => {
        try {
            return await getAdminOrdersApi();
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Unable To Fetch Orders"
            );
        }
    }
);

// ==========================================
// UPDATE ORDER STATUS
// ==========================================

export const updateOrderStatus = createAsyncThunk(
    "orders/updateStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            return await updateOrderStatusApi(id, status);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Unable To Update Order"
            );
        }
    }
);

// ==========================================
// GET ORDER BY ID
// ==========================================

export const getOrderById = createAsyncThunk(
    "orders/getOrderById",
    async (id, { rejectWithValue }) => {
        try {
            return await getOrderByIdApi(id);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Unable To Fetch Order"
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
                "Unable To Cancel Order"
            );
        }
    }
);



export const deleteOrder = createAsyncThunk(

    "orders/delete",

    async (id, { rejectWithValue }) => {

        try {

            await deleteOrderApi(id);

            return id;


        }
        catch (error) {

            return rejectWithValue(

                error.response?.data?.message ||
                "Unable to delete order"

            );

        }


    }

);




const orderSlice = createSlice({
    name: "orders",

    initialState: {
        // Customer
        orders: [],
        createdOrder: null,
        selectedOrder: null,

        // Admin
        adminOrders: [],

        loading: false,
        error: null,
    },

    reducers: {
        clearOrderError: (state) => {
            state.error = null;
        },

        clearCreatedOrder: (state) => {
            state.createdOrder = null;
        },

        clearSelectedOrder: (state) => {
            state.selectedOrder = null;
        },
    },

    extraReducers: (builder) => {
        builder

            // ==================================
            // CREATE ORDER
            // ==================================

            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.createdOrder = action.payload.order;
            })

            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ==================================
            // MY ORDERS
            // ==================================

            .addCase(getMyOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getMyOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders || [];
            })

            .addCase(getMyOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })



            .addCase(deleteOrder.fulfilled,

                (state, action) => {


                    state.loading = false;


                    state.adminOrders =
                        state.adminOrders.filter(

                            (order) =>
                                order._id !== action.payload

                        );


                })
            // ==================================
            // GET ORDER DETAILS
            // ==================================

            .addCase(getOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedOrder = action.payload.order;
            })

            .addCase(getOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ==================================
            // CANCEL ORDER
            // ==================================

            .addCase(cancelOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.loading = false;

                state.selectedOrder = action.payload.order;

                state.orders = state.orders.map((order) =>
                    order._id === action.payload.order._id
                        ? action.payload.order
                        : order
                );
            })

            .addCase(cancelOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ==================================
            // ADMIN ORDERS
            // ==================================

            .addCase(getOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.adminOrders = action.payload.orders || [];
            })

            .addCase(getOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ==================================
            // UPDATE ORDER STATUS
            // ==================================

            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false;

                state.adminOrders = state.adminOrders.map((order) =>
                    order._id === action.payload.order._id
                        ? action.payload.order
                        : order
                );

                if (
                    state.selectedOrder &&
                    state.selectedOrder._id === action.payload.order._id
                ) {
                    state.selectedOrder = action.payload.order;
                }
            })

            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    clearOrderError,
    clearCreatedOrder,
    clearSelectedOrder,
} = orderSlice.actions;

export default orderSlice.reducer;