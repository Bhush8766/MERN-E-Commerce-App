import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Selected delivery address
  selectedAddress: null,

  // Payment Method
  paymentMethod: "COD",

  // Coupon
  coupon: "",

  // Discount
  discount: 0,

  // Notes for order
  orderNote: "",

  // Checkout Status
  loading: false,
  success: false,
  error: null,
};

const checkoutSlice = createSlice({
  name: "checkout",

  initialState,

  reducers: {
    // ==========================
    // SELECT ADDRESS
    // ==========================
    selectAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },

    // ==========================
    // PAYMENT METHOD
    // ==========================
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },

    // ==========================
    // COUPON
    // ==========================
    setCoupon: (state, action) => {
      state.coupon = action.payload;
    },

    // ==========================
    // DISCOUNT
    // ==========================
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },

    // ==========================
    // ORDER NOTE
    // ==========================
    setOrderNote: (state, action) => {
      state.orderNote = action.payload;
    },

    // ==========================
    // CLEAR CHECKOUT
    // ==========================
    clearCheckout: (state) => {
      state.selectedAddress = null;
      state.paymentMethod = "COD";
      state.coupon = "";
      state.discount = 0;
      state.orderNote = "";
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
});

export const {
  selectAddress,
  setPaymentMethod,
  setCoupon,
  setDiscount,
  setOrderNote,
  clearCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;