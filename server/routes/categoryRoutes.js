const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  categoryValidation,
} = require("../middleware/validationMiddleware");

// ======================================
// Public Routes
// ======================================

// Get All Categories
router.get("/", getCategories);

// Get Single Category
router.get("/:id", getCategoryById);

// ======================================
// Admin Routes
// ======================================

// Create Category
router.post(
  "/",
  protect,
  authorize("Admin"),
  upload.single("image"),
  categoryValidation,
  createCategory
);

// Update Category
router.put(
  "/:id",
  protect,
  authorize("Admin"),
  upload.single("image"),
  categoryValidation,
  updateCategory
);

// Delete Category
router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  deleteCategory
);

module.exports = router;