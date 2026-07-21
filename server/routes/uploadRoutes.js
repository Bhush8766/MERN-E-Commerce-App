const express = require("express");
const router = express.Router();

const {
  uploadSingleImage,
  uploadMultipleImages,
  deleteImage,
  uploadProductImages,
  uploadBrandLogo,
  uploadCategoryImage,
} = require("../controllers/uploadController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

// ==========================================
// Upload Single Image
// ==========================================
router.post(
  "/single",
  protect,
  authorize("Admin", "Vendor"),
  upload.single("image"),
  uploadSingleImage
);

// ==========================================
// Upload Multiple Images
// ==========================================
router.post(
  "/multiple",
  protect,
  authorize("Admin", "Vendor"),
  upload.array("images", 10),
  uploadMultipleImages
);

// ==========================================
// Upload Product Images
// ==========================================
router.post(
  "/product",
  protect,
  authorize("Admin", "Vendor"),
  upload.array("images", 10),
  uploadProductImages
);

// ==========================================
// Upload Brand Logo
// ==========================================
router.post(
  "/brand-logo",
  protect,
  authorize("Admin"),
  upload.single("logo"),
  uploadBrandLogo
);

// ==========================================
// Upload Category Image
// ==========================================
router.post(
  "/category-image",
  protect,
  authorize("Admin"),
  upload.single("image"),
  uploadCategoryImage
);

// ==========================================
// Delete Image
// ==========================================
router.delete(
  "/:publicId",
  protect,
  authorize("Admin", "Vendor"),
  deleteImage
);

module.exports = router;