const express = require("express");
const router = express.Router();

const {
  addToCart,
  getMyCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  getCartCount,
  getCartTotal,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

// ==========================================
// All Cart Routes Require Login
// ==========================================

// Add Product To Cart
router.post(
  "/addToCart",
  protect,
  addToCart
);

// Get Logged In User Cart
router.get(
  "/getMyCart",
  protect,
  getMyCart
);

// Update Product Quantity
router.patch(
  "/updateQuantity/:id",
  protect,
  updateQuantity
);

// Remove Product From Cart
router.delete(
  "/removeFromCart/:id",
  protect,
  removeFromCart
);

// Clear Cart
router.delete(
  "/clearCart",
  protect,
  clearCart
);

// Get Cart Item Count
router.get(
  "/getCartCount",
  protect,
  getCartCount
);

// Get Cart Total
router.get(
  "/getCartTotal",
  protect,
  getCartTotal
);

module.exports = router;