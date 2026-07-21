const asyncHandler = require("express-async-handler");
const crypto = require("crypto");

const razorpay = require("../config/razorpay");
const Order = require("../models/orderModel");

// ======================================
// Create Razorpay Order
// ======================================
exports.createRazorpayOrder = asyncHandler(async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });
    }

    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    console.log("Options:", options);

    const order = await razorpay.orders.create(options);

    console.log("Razorpay Order:", order);

    res.status(200).json({
      success: true,
      order,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ======================================
// Verify Razorpay Payment
// ======================================
exports.verifyPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderId,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({
      success: false,
      message: "Payment verification failed",
    });
  }

  if (orderId) {
    const order = await Order.findById(orderId);

    if (order) {
      order.paymentStatus = "Paid";
      order.orderStatus = "Processing";
      order.razorpayOrderId = razorpay_order_id;
      order.razorpayPaymentId = razorpay_payment_id;
      order.razorpaySignature = razorpay_signature;

      await order.save();
    }
  }

  res.status(200).json({
    success: true,
    message: "Payment verified successfully",
  });
});

// ======================================
// Cash On Delivery
// ======================================
exports.cashOnDelivery = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  order.paymentMethod = "COD";
  order.paymentStatus = "Pending";

  await order.save();

  res.status(200).json({
    success: true,
    message: "Cash on Delivery selected",
    order,
  });
});

// ======================================
// Get Payment Details
// ======================================
exports.getPaymentDetails = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  res.status(200).json({
    success: true,
    payment: {
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      razorpayOrderId: order.razorpayOrderId,
      razorpayPaymentId: order.razorpayPaymentId,
    },
  });
});

// ======================================
// Refund Payment (Dummy)
// ======================================
exports.refundPayment = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  order.paymentStatus = "Refunded";

  await order.save();

  res.status(200).json({
    success: true,
    message: "Refund processed successfully",
    order,
  });
});


exports.paymentSuccess = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Payment successful",
  });
});

exports.paymentFailed = asyncHandler(async (req, res) => {
  res.status(400).json({
    success: false,
    message: "Payment failed",
  });
});

exports.getPaymentHistory = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});

exports.getPaymentById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.paymentId);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Payment not found",
    });
  }

  res.status(200).json({
    success: true,
    order,
  });
});

exports.webhookHandler = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Webhook received",
  });
});