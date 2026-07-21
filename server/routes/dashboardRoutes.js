const express = require("express");
const router = express.Router();

const {
  adminDashboard,
  vendorDashboard,
  customerDashboard,
  monthlySales,
  topProducts,
  recentOrders,
} = require("../controllers/dashboardController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// Admin Dashboard
router.get(
  "/admin",
  protect,
  authorize("Admin"),
  adminDashboard
);

// Vendor Dashboard
router.get(
  "/vendor",
  protect,
  authorize("Vendor"),
  vendorDashboard
);

// Customer Dashboard
router.get(
  "/customer",
  protect,
  authorize("Customer"),
  customerDashboard
);

// Monthly Sales
router.get(
  "/monthly-sales",
  protect,
  authorize("Admin"),
  monthlySales
);

// Top Products
router.get(
  "/top-products",
  protect,
  authorize("Admin"),
  topProducts
);

// Recent Orders
router.get(
  "/recent-orders",
  protect,
  authorize("Admin"),
  recentOrders
);

module.exports = router;