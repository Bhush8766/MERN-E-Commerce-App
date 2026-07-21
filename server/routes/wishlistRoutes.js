const express = require("express");
const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  clearWishlist,
  getWishlistCount,
} = require("../controllers/wishlistController");

const { protect } = require("../middleware/authMiddleware");

// ===============================
// Wishlist Routes
// ===============================

// Add Product To Wishlist
router.post(
  "/add",
  protect,
  addToWishlist
);

// Get Logged-in User Wishlist
router.get(
  "/",
  protect,
  getWishlist
);

// Remove Product From Wishlist
router.delete(
  "/remove/:id",
  protect,
  removeFromWishlist
);

// Clear Wishlist
router.delete(
  "/clear",
  protect,
  clearWishlist
);

// Wishlist Count
router.get(
  "/count",
  protect,
  getWishlistCount
);

module.exports = router;