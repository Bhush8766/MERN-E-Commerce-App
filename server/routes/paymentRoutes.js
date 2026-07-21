const express = require("express");
const router = express.Router();

const {
  createRazorpayOrder,
  verifyPayment,
  refundPayment,
  cashOnDelivery,
  getPaymentDetails,
} = require("../controllers/paymentController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// Customer

router.post(
  "/create-order",
  protect,
  authorize("Customer"),
  createRazorpayOrder
);

router.post(
  "/verify",
  protect,
  authorize("Customer"),
  verifyPayment
);

router.post(
  "/cod",
  protect,
  authorize("Customer"),
  cashOnDelivery
);

router.get(
  "/:id",
  protect,
  getPaymentDetails
);

// Admin

router.post(
  "/refund/:id",
  protect,
  authorize("Admin"),
  refundPayment
);

module.exports = router;