const express = require("express");

const router =
  express.Router();

const {
  getVendorDashboard,
  getVendorProducts,
  getVendorProduct,
  createVendorProduct,
  updateVendorProduct,
  deleteVendorProduct,
  getVendorOrders,
  getVendorEarnings,
} = require("../controllers/vendorController");

const {
  protect,
} = require("../middleware/authMiddleware");

const authorize =
  require("../middleware/roleMiddleware");

const upload =
  require("../middleware/uploadMiddleware");

// ======================================================
// VENDOR DASHBOARD
// ======================================================

router.get(
  "/dashboard",
  protect,
  authorize("Vendor"),
  getVendorDashboard
);

// ======================================================
// VENDOR PRODUCTS
// ======================================================

// Get all vendor products

router.get(
  "/products",
  protect,
  authorize("Vendor"),
  getVendorProducts
);

// Get single vendor product

router.get(
  "/products/:id",
  protect,
  authorize("Vendor"),
  getVendorProduct
);

// Create vendor product

router.post(
  "/products",
  protect,
  authorize("Vendor"),
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  createVendorProduct
);

// Update vendor product

router.put(
  "/products/:id",
  protect,
  authorize("Vendor"),
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  updateVendorProduct
);

// Delete vendor product

router.delete(
  "/products/:id",
  protect,
  authorize("Vendor"),
  deleteVendorProduct
);

// ======================================================
// VENDOR ORDERS
// ======================================================

router.get(
  "/orders",
  protect,
  authorize("Vendor"),
  getVendorOrders
);

// ======================================================
// VENDOR EARNINGS
// ======================================================

router.get(
  "/earnings",
  protect,
  authorize("Vendor"),
  getVendorEarnings
);

module.exports = router;