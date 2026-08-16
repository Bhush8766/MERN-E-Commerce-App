import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import orderReducer from "./orderSlice";
import adminReducer from "./adminSlice";
import categoryReducer from "./categorySlice";
import brandReducer from "./brandSlice";
import userReducer from "./userSlice";
import dashboardReducer from "./dashboardSlice";
import checkoutReducer from "./checkoutSlice";

import vendorReducer from "./vendorSlice";

import reviewReducer
from "./reviewSlice";



const store = configureStore({
  reducer: {
    auth: authReducer,

    // Product Slice
     product: productReducer,

    // Cart
    cart: cartReducer,

    // Wishlist
    wishlist: wishlistReducer,

    // Orders
    orders: orderReducer,

    // Admin
    admin: adminReducer,

    // Categories
    category: categoryReducer,

    // Brands
    brand: brandReducer,

    // Users
    users: userReducer,

    // Dashboard
    dashboard: dashboardReducer,


    checkout: checkoutReducer,

    review: reviewReducer,

    vendor: vendorReducer,
  },
});

export default store;