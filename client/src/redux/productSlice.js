import {createSlice,createAsyncThunk}
from "@reduxjs/toolkit";

import axiosInstance from "../api/axiosInstance";


// Get All Products

export const getProducts=createAsyncThunk(

"products/getProducts",

async()=>{

const response =
await axiosInstance.get("/products");


return response.data;

}

);


// Get Single Product

export const getSingleProduct=createAsyncThunk(

"products/getSingleProduct",

async(id)=>{


const response =
await axiosInstance.get(
`/products/${id}`
);


return response.data;


}

);



const productSlice=createSlice({

name:"products",


initialState:{


products:[],

selectedProduct:null,

loading:false,

error:null


},


reducers:{},



extraReducers:(builder)=>{


builder


.addCase(getProducts.pending,(state)=>{

state.loading=true;

})


.addCase(
getProducts.fulfilled,
(state,action)=>{

state.loading=false;

state.products =
action.payload.products || action.payload;

}
)


.addCase(getSingleProduct.fulfilled,

(state,action)=>{

state.selectedProduct=
action.payload;

});


}


});



export default productSlice.reducer;