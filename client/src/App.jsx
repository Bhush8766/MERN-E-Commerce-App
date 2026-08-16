import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// =====================================================
// LAYOUTS
// =====================================================

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./admin/layout/AdminLayout";
import VendorLayout from "./layouts/VendorLayout";

// =====================================================
// CUSTOMER PAGES
// =====================================================

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

import OrderDetails from "./pages/OrderDetails";

import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";

import ChangePassword from "./pages/ChangePassword";

import SavedAddresses from "./pages/SavedAddresses";
import AddressSelector from "./pages/AddressSelector";

// =====================================================
// ROUTES / AUTH
// =====================================================

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import VendorRoute from "./routes/VendorRoute";

// =====================================================
// AUTH REDUX
// =====================================================

import { getProfile } from "./redux/authSlice";

// =====================================================
// ADMIN PAGES
// =====================================================

import Dashboard from "./admin/dashboard/Dashboard";

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

// =====================================================
// VENDOR PAGES
// =====================================================

import VendorDashboard from "./vendor/VendorDashboard";
import VendorProducts from "./vendor/VendorProducts";
import VendorAddProduct from "./vendor/AddProduct";
import VendorEditProduct from "./vendor/EditProduct";
import VendorOrders from "./vendor/VendorOrders";
import VendorEarnings from "./vendor/VendorEarnings";

// =====================================================
// APP
// =====================================================

function App() {
  const dispatch = useDispatch();

  // ===================================================
  // AUTH TOKEN
  // ===================================================

  const token = useSelector((state) => state.auth?.token);

  // ===================================================
  // LOAD PROFILE
  // ===================================================

  useEffect(() => {
    if (token) {
      dispatch(getProfile());
    }
  }, [token, dispatch]);

  // ===================================================
  // ROUTES
  // ===================================================

  return (
    <Routes>
      {/* =================================================
          CUSTOMER WEBSITE
      ================================================= */}

      <Route element={<MainLayout />}>
        {/* HOME */}

        <Route path="/" element={<Home />} />

        {/* SHOP */}

        <Route path="/shop" element={<Shop />} />

        {/* PRODUCT DETAILS */}

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        {/* CART */}

        <Route path="/cart" element={<Cart />} />

        {/* CHECKOUT */}

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        {/* PAYMENT */}

        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />

        {/* ADDRESS SELECTOR */}

        <Route
          path="/checkout/address"
          element={
            <ProtectedRoute>
              <AddressSelector />
            </ProtectedRoute>
          }
        />

        {/* WISHLIST */}

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        {/* ORDER DETAILS */}

        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />

        {/* Backward-compatible order URL */}

        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />

        {/* CHANGE PASSWORD */}

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        {/* SAVED ADDRESSES */}

        <Route
          path="/saved-addresses"
          element={
            <ProtectedRoute>
              <SavedAddresses />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* =================================================
          AUTH
      ================================================= */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* =================================================
          USER PROTECTED
      ================================================= */}

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-orders"
        element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
      />

      {/* =================================================
          PAYMENT RESULT
      ================================================= */}

      <Route
        path="/payment-success"
        element={
          <ProtectedRoute>
            <PaymentSuccess />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment-success/:id"
        element={
          <ProtectedRoute>
            <PaymentSuccess />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment-failed"
        element={
          <ProtectedRoute>
            <PaymentFailed />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment-failed/:id"
        element={
          <ProtectedRoute>
            <PaymentFailed />
          </ProtectedRoute>
        }
      />

      {/* =================================================
          ADMIN PANEL
      ================================================= */}

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        {/* ADMIN DASHBOARD */}

        <Route
          index
          element={<Dashboard />}
        />

        {/* ===============================================
            ADMIN PRODUCTS
        =============================================== */}

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

        {/* ===============================================
            ADMIN CATEGORIES
        =============================================== */}

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

        {/* ===============================================
            ADMIN BRANDS
        =============================================== */}

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

        {/* ===============================================
            ADMIN ORDERS
        =============================================== */}

        <Route
          path="orders"
          element={<OrderList />}
        />

        {/* ===============================================
            ADMIN USERS
        =============================================== */}

        <Route
          path="users"
          element={<UserList />}
        />
      </Route>

      {/* =================================================
          VENDOR PANEL
      ================================================= */}

      <Route
        path="/vendor"
        element={
          <VendorRoute>
            <VendorLayout />
          </VendorRoute>
        }
      >
        {/* ===============================================
            VENDOR DASHBOARD
        =============================================== */}

        <Route
          index
          element={<VendorDashboard />}
        />

        {/* ===============================================
            VENDOR PRODUCTS
        =============================================== */}

        <Route
          path="products"
          element={<VendorProducts />}
        />

        {/* ADD PRODUCT */}

        <Route
          path="products/add"
          element={<VendorAddProduct />}
        />

        {/* EDIT PRODUCT */}

        <Route
          path="products/edit/:id"
          element={<VendorEditProduct />}
        />

        {/* ===============================================
            VENDOR ORDERS
        =============================================== */}

        <Route
          path="orders"
          element={<VendorOrders />}
        />

        {/* ===============================================
            VENDOR EARNINGS
        =============================================== */}

        <Route
          path="earnings"
          element={<VendorEarnings />}
        />
      </Route>
    </Routes>
  );
}

export default App;