import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getCartApi,
  addToCartApi,
  updateCartApi,
  removeCartApi,
  clearCartApi,
} from "../api/cartApi";




// ===============================
// Get Cart
// ===============================

export const getCart = createAsyncThunk(
  "cart/getCart",

  async (_, { rejectWithValue }) => {

    try {

      return await getCartApi();

    } catch(err) {

      return rejectWithValue(
        err.response?.data?.message ||
        "Failed to load cart"
      );

    }

  }
);







// ===============================
// Add To Cart
// ===============================
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (cartData, thunkAPI) => {
        try {
            return await addToCartApi(cartData);
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response.data.message
            );
        }
    }
);








// ===============================
// Update Cart
// ===============================

export const updateCart = createAsyncThunk(

"cart/updateCart",

async({id,quantity},{rejectWithValue})=>{


try{

return await updateCartApi(
id,
quantity
);


}
catch(err){


return rejectWithValue(

err.response?.data?.message ||
"Failed to update cart"

);


}


}

);









// ===============================
// Remove Cart
// ===============================


export const removeCart = createAsyncThunk(

"cart/removeCart",

async(id,{rejectWithValue})=>{


try{


await removeCartApi(id);

return id;


}
catch(err){


return rejectWithValue(

err.response?.data?.message ||
"Failed to remove item"

);


}


}

);









// ===============================
// Clear Cart
// ===============================


export const clearCart = createAsyncThunk(

"cart/clearCart",

async(_,{rejectWithValue})=>{


try{


await clearCartApi();

return true;


}
catch(err){


return rejectWithValue(

err.response?.data?.message ||
"Failed to clear cart"

);


}


}

);









// ===============================
// Initial State
// ===============================


const initialState={


items:[],


loading:false,


error:null



};









// ===============================
// Slice
// ===============================


const cartSlice=createSlice({

name:"cart",


initialState,


reducers:{},



extraReducers:(builder)=>{


builder



// ===============================
// GET CART
// ===============================


.addCase(
getCart.pending,
(state)=>{

state.loading=true;

}
)



.addCase(
getCart.fulfilled,
(state,action)=>{


state.loading=false;


state.items =
action.payload?.cart?.products || [];


}
)



.addCase(
getCart.rejected,
(state,action)=>{


state.loading=false;

state.error=action.payload;


}
)









// ===============================
// ADD CART
// ===============================


.addCase(
addToCart.pending,
(state)=>{

state.loading=true;

}
)



.addCase(
addToCart.fulfilled,
(state,action)=>{


state.loading=false;


state.items =
action.payload?.cart?.products || [];


}
)



.addCase(
addToCart.rejected,
(state,action)=>{


state.loading=false;

state.error=action.payload;


}
)









// ===============================
// UPDATE CART
// ===============================


.addCase(
updateCart.fulfilled,
(state,action)=>{


state.items =
action.payload?.cart?.products || [];


}
)








// ===============================
// REMOVE CART
// ===============================


.addCase(
removeCart.fulfilled,
(state,action)=>{


state.items =
state.items.filter(

(item)=>
item._id !== action.payload

);


}
)








// ===============================
// CLEAR CART
// ===============================


.addCase(
clearCart.fulfilled,
(state)=>{


state.items=[];


}
);



}


});




export default cartSlice.reducer;