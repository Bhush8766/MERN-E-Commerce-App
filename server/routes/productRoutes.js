const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  getProductBySlug,
  searchProducts,
  filterProducts,
  getFeaturedProducts,
  getLatestProducts,
  getRelatedProducts,
  updateProduct,
  deleteProduct,
  updateProductStock,
  uploadProductImages,
  deleteProductImage,
  getLowStockProducts,
  getOutOfStockProducts,
  bulkDeleteProducts,
  getAdminProductStats,
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  productValidation,
} = require("../middleware/validationMiddleware");

// ===============================
// Public Routes
// ===============================

router.get("/", getProducts);

router.get("/search", searchProducts);

router.get("/filter", filterProducts);

router.get("/featured", getFeaturedProducts);

router.get("/latest", getLatestProducts);

router.get("/slug/:slug", getProductBySlug);

router.get("/related/:id", getRelatedProducts);

router.get("/:id", getProductById);

// ===============================
// Admin & Vendor Routes
// ===============================

// Create Product
router.post(
  "/",
  protect,
  authorize("Admin", "Vendor"),
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  productValidation,
  createProduct
);

// Update Product
router.put(
  "/:id",
  protect,
  authorize("Admin", "Vendor"),
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  productValidation,
  updateProduct
);

// Delete Product
router.delete(
  "/:id",
  protect,
  authorize("Admin", "Vendor"),
  deleteProduct
);

// Update Stock
router.patch(
  "/stock/:id",
  protect,
  authorize("Admin", "Vendor"),
  updateProductStock
);

// Upload Product Images
router.post(
  "/:id/images",
  protect,
  authorize("Admin", "Vendor"),
  upload.array("images", 10),
  uploadProductImages
);

// Delete Product Image
router.delete(
  "/:id/images/:imageId",
  protect,
  authorize("Admin", "Vendor"),
  deleteProductImage
);

// Low Stock Products
router.get(
  "/admin/low-stock",
  protect,
  authorize("Admin"),
  getLowStockProducts
);

// Out of Stock Products
router.get(
  "/admin/out-of-stock",
  protect,
  authorize("Admin"),
  getOutOfStockProducts
);

// Product Statistics
router.get(
  "/admin/statistics",
  protect,
  authorize("Admin"),
  getAdminProductStats
);

// Bulk Delete Products
router.delete(
  "/admin/bulk-delete",
  protect,
  authorize("Admin"),
  bulkDeleteProducts
);

module.exports = router;