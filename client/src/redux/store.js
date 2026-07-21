import { configureStore } from "@reduxjs/toolkit";


import authReducer from "./authSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import WishlistReducer from "./wishlistSlice"

import orderReducer from "./orderSlice";

import adminReducer from "./adminSlice";

import categoryReducer from "./categorySlice";

import brandReducer from "./brandSlice";

import userReducer from "./userSlice";

import dashboardReducer from "./dashboardSlice";


const store = configureStore({

reducer:{


auth:authReducer,

products:productReducer,

cart:cartReducer,

wishlist:WishlistReducer,

orders:orderReducer,

admin: adminReducer,

category: categoryReducer,

brand: brandReducer,

users: userReducer,

dashboard: dashboardReducer,


}


});


export default store;