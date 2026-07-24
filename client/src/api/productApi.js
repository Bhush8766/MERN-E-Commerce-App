import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await axiosInstance.get("/products");

    console.log("API Response:", response.data);

    return response.data;
  }
);

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

    .addCase(getProducts.pending,(state)=>{
      state.loading=true;
    })


    .addCase(getProducts.fulfilled,(state,action)=>{

      state.loading=false;
      state.products=action.payload;

    })


  }

});


export default productSlice.reducer;