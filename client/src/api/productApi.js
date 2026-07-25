import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "./axiosInstance";

// ===============================
// Get All Products
// ===============================
export const getProductsApi = async (params = {}) => {
  const { data } = await axiosInstance.get("/products", { params });
  return data;
};

// ===============================
// Get Single Product
// ===============================
export const getSingleProductApi = async (id) => {
  const { data } = await axiosInstance.get(`/products/${id}`);
  return data;
};


const productSlice = createSlice({

  name:"products",

  initialState:{
    products:[],
    loading:false,
  },


  reducers:{},


  extraReducers:(builder)=>{

    builder

    .addCase(getProductsApi.pending,(state)=>{
      state.loading=true;
    })


    .addCase(getProductsApi.fulfilled,(state,action)=>{

      state.loading=false;
      state.products=action.payload;

    })


  }

});


export default productSlice.reducer;