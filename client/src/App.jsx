import {
    Routes,
    Route
} from "react-router-dom";


import {
    useEffect
} from "react";


import {
    useDispatch,
    useSelector
} from "react-redux";



// Layouts

import MainLayout from "./layouts/MainLayout";

import AdminLayout from "./admin/layout/AdminLayout";



// Website Pages

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";

import Wishlist from "./pages/Wishlist";



// Routes

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";



// Auth

import {
    getProfile
} from "./redux/authSlice";



// Admin Pages

import Dashboard from "./admin/dashboard/Dashboard";
// import OrderDetails from "./admin/OrderDetails";


// Products

import ProductList from "./admin/products/ProductList";
import AddProduct from "./admin/products/AddProduct";
import EditProduct from "./admin/products/EditProduct";


// Categories

import CategoryList from "./admin/categories/CategoryList";
import AddCategory from "./admin/categories/AddCategory";
import EditCategory from "./admin/categories/EditCategory";


// Brands

import BrandList from "./admin/brands/BrandList";
import AddBrand from "./admin/brands/AddBrand";
import EditBrand from "./admin/brands/EditBrand";


// Users

import UserList from "./admin/users/UserList";


// Orders

import OrderList from "./admin/orders/OrderList";

import OrderDetails from "./pages/OrderDetails";

import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";

import ChangePassword from "./pages/ChangePassword";


import Address from "./pages/SavedAddresses"







function App(){


const dispatch = useDispatch();



const token =
useSelector(
(state)=>state.auth.token
);





useEffect(()=>{


if(token){

dispatch(
    getProfile()
);

}


},[
token,
dispatch
]);






return (

<Routes>



{/* ============================
    CUSTOMER WEBSITE
============================ */}


<Route element={<MainLayout />}>


<Route
path="/"
element={<Home />}
/>


<Route
path="/shop"
element={<Shop />}
/>


<Route
    path="/product/:id"
    element={<ProductDetails />}
/>


<Route
path="/cart"
element={<Cart />}
/>



<Route

path="/checkout"

element={

<ProtectedRoute>

<Checkout />

</ProtectedRoute>

}

/>



<Route
path="/wishlist"
element={
<ProtectedRoute>
<Wishlist />
</ProtectedRoute>
}
/>



<Route
  path="/orders/:id"
  element={<OrderDetails />}
/>



<Route
 path="/change-password"
 element={<ChangePassword />}
/>

<Route
  path="/saved-addresses"
  element={
    <ProtectedRoute>
      <Address />
    </ProtectedRoute>
  }
/>

</Route>







{/* ============================
    AUTH
============================ */}



<Route
path="/login"
element={<Login />}
/>


<Route
path="/register"
element={<Register />}
/>








{/* ============================
    USER PROTECTED
============================ */}



<Route

path="/profile"

element={

<ProtectedRoute>

<Profile />

</ProtectedRoute>

}

/>









{/* <Route

path="/orders"

element={

<ProtectedRoute>

<MyOrders />

</ProtectedRoute>

}

/> */}


<Route path="/my-orders" element={<MyOrders />} />


<Route
  path="/payment-success"
  element={<PaymentSuccess />}
/>

<Route
  path="/payment-failed"
  element={<PaymentFailed />}
/>





{/* ============================
        ADMIN PANEL
============================ */}



<Route

path="/admin"

element={

<AdminRoute>


<AdminLayout />

</AdminRoute>

}



>


{/* 
<Route
path="/admin/orders"
element={<OrderList/>}
/>



<Route
path="/admin/orders/:id"
element={<OrderDetails/>}
/> */}



<Route

index

element={<Dashboard />}

/>






{/* PRODUCTS */}


<Route

path="products"

element={<ProductList />}

/>



<Route

path="products/add"

element={<AddProduct />}

/>



<Route

path="products/edit/:id"

element={<EditProduct />}

/>






{/* CATEGORIES */}



<Route

path="categories"

element={<CategoryList />}

/>



<Route

path="categories/add"

element={<AddCategory />}

/>



<Route

path="categories/edit/:id"

element={<EditCategory />}

/>








{/* BRANDS */}



<Route

path="brands"

element={<BrandList />}

/>



<Route

path="brands/add"

element={<AddBrand />}

/>



<Route

path="brands/edit/:id"

element={<EditBrand />}

/>








{/* ORDERS */}



<Route

path="orders"

element={<OrderList />}

/>







{/* USERS */}



<Route

path="users"

element={<UserList />}

/>



</Route>









</Routes>


);


}



export default App;