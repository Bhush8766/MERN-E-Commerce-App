const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
  deleteOrder,
} = require("../controllers/orderController");

const {
  createRazorpayOrder,
  verifyPayment,
} = require("../controllers/paymentController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");


// ===========================================
// CUSTOMER ROUTES
// ===========================================


router.post(
    "/create",
    protect,
    createOrder
);

// Create Order (COD)
// router.post(
//   "/create",
//   protect,
//   authorize("Customer", "Admin"),
//   createOrder
// );

// Get Logged-in User Orders
router.get(
  "/my-orders",
  protect,
  authorize("Customer", "Admin"),
  getMyOrders
);

// Get Single Order
router.get(
  "/:id",
  protect,
  getOrderById
);

// Cancel Order
router.patch(
  "/cancel/:id",
  protect,
  authorize("Customer"),
  cancelOrder
);


// ===========================================
// RAZORPAY PAYMENT ROUTES
// ===========================================

// Create Razorpay Order
router.post(
  "/payment/create-order",
  protect,
  authorize("Customer"),
  createRazorpayOrder
);

// Verify Razorpay Payment
router.post(
  "/payment/verify",
  protect,
  authorize("Customer"),
  verifyPayment
);


// ===========================================
// ADMIN ROUTES
// ===========================================

// Get All Orders
router.get(
  "/",
  protect,
  authorize("Admin"),
  getAllOrders
);

// Update Order Status
router.patch(
  "/status/:id",
  protect,
  authorize("Admin"),
  updateOrderStatus
);

// Delete Order
router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  deleteOrder
);

module.exports = router;