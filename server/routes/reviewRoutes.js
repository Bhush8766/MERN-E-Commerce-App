const express = require("express");
const router = express.Router();

const {
  addReview,
  getProductReviews,
  getReviewById,
  updateReview,
  deleteReview,
  approveReview,
  rejectReview,
  getAllReviews,
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  reviewValidation,
} = require("../middleware/validationMiddleware");

const upload = require("../middleware/uploadMiddleware");

// ===========================================
// Public Routes
// ===========================================

// Get Reviews of a Product
router.get(
  "/product/:productId",
  getProductReviews
);

// Get Single Review
router.get(
  "/:id",
  getReviewById
);

// ===========================================
// Customer Routes
// ===========================================

// Add Review
router.post(
  "/",
  protect,
  authorize("Customer"),
  upload.array("images", 5),
  reviewValidation,
  addReview
);

// Update Review
router.put(
  "/:id",
  protect,
  authorize("Customer"),
  upload.array("images", 5),
  reviewValidation,
  updateReview
);

// Delete Review
router.delete(
  "/:id",
  protect,
  authorize("Customer"),
  deleteReview
);

// ===========================================
// Admin Routes
// ===========================================

// Get All Reviews
router.get(
  "/admin/all",
  protect,
  authorize("Admin"),
  getAllReviews
);

// Approve Review
router.patch(
  "/approve/:id",
  protect,
  authorize("Admin"),
  approveReview
);

// Reject Review
router.patch(
  "/reject/:id",
  protect,
  authorize("Admin"),
  rejectReview
);

module.exports = router;