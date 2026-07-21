const express = require("express");
const router = express.Router();

const {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  brandValidation,
} = require("../middleware/validationMiddleware");

// ===========================================
// Public Routes
// ===========================================

// Get All Brands
router.get("/", getBrands);

// Get Single Brand
router.get("/:id", getBrandById);

// ===========================================
// Admin Routes
// ===========================================

// Create Brand
router.post(
  "/",
  protect,
  authorize("Admin"),
  upload.single("logo"),
  brandValidation,
  createBrand
);

// Update Brand
router.put(
  "/:id",
  protect,
  authorize("Admin"),
  upload.single("logo"),
  brandValidation,
  updateBrand
);

// Delete Brand
router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  deleteBrand
);

module.exports = router;