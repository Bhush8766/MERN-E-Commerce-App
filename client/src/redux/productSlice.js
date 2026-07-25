import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { getSingleProductApi } from "../api/productApi";

// =============================
// Get All Products
// =============================
export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/products");

      console.log("Products API Response:", response.data);

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

// =============================
// Get Single Product
// =============================
export const getSingleProduct = createAsyncThunk(
  "product/getSingleProduct",
  async(id, {rejectWithValue})=>{

    try{

      const response = await axiosInstance.get(
        `/products/${id}`
      );

      console.log(
        "Single Product Response:",
        response.data
      );

      return response.data;

    }
    catch(error){

      return rejectWithValue(
        error.response.data
      );

    }

  }
);

// =============================
// Initial State
// =============================
const initialState={

products:[],

singleProduct:null,

loading:false,

error:null

};

// =============================
// Slice
// =============================
const productSlice = createSlice({
  name: "product",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // =============================
      // Get Products
      // =============================
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.products = action.payload.products || [];
      })

      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =============================
      // Get Single Product
      // =============================
     .addCase(
getSingleProduct.pending,
(state)=>{

state.loading=true;

})


.addCase(
getSingleProduct.fulfilled,
(state,action)=>{

state.loading=false;

state.singleProduct =
action.payload.product;

})


.addCase(
getSingleProduct.rejected,
(state,action)=>{

state.loading=false;

state.error =
action.payload;

})
  },
});

export default productSlice.reducer;