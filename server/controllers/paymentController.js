const asyncHandler = require("express-async-handler");
const crypto = require("crypto");

const razorpay = require("../config/razorpay");

const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

// ======================================================
// Helper Function
// Reduce Product Stock + Clear Cart + Link Order
// ======================================================
const completeOrder = async (order) => {
  // Load full order
  const populatedOrder = await Order.findById(order._id)
    .populate("products.product");

  if (!populatedOrder) {
    throw new Error("Order not found");
  }

  // Reduce Product Stock
  for (const item of populatedOrder.products) {
    if (!item.product) continue;

    const product = await Product.findById(item.product._id);

    if (!product) continue;

    if (product.stock < item.quantity) {
      throw new Error(`${product.title} is out of stock`);
    }

    product.stock -= item.quantity;

    await product.save();
  }

  // Clear User Cart
  const cart = await Cart.findOne({
    user: populatedOrder.user,
  });

  if (cart) {
    cart.products = [];
    cart.totalItems = 0;
    cart.totalPrice = 0;
    cart.totalDiscount = 0;
    cart.shippingCharge = 0;
    cart.tax = 0;
    cart.grandTotal = 0;
    cart.coupon = null;
    cart.couponDiscount = 0;
    cart.isCheckedOut = false;

    await cart.save();
  }

  // Link Order to User
  const user = await User.findById(populatedOrder.user);

  if (user) {
    const exists = user.orders.some(
      (id) => id.toString() === populatedOrder._id.toString()
    );

    if (!exists) {
      user.orders.push(populatedOrder._id);
      await user.save();
    }
  }

  return populatedOrder;
};

// ======================================================
// Create Razorpay Order
// POST /api/orders/payment/create-order
// ======================================================
exports.createRazorpayOrder = asyncHandler(async (req, res) => {
  try {
    const { amount, orderId } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });
    }

    // Optional: verify order exists
    if (orderId) {
      const existingOrder = await Order.findById(orderId);

      if (!existingOrder) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }
    }

    const options = {
      amount: Number(amount) * 100, // Razorpay expects paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      message: "Razorpay order created successfully",
      order: razorpayOrder,
    });
  } catch (error) {
    console.error("Create Razorpay Order Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to create Razorpay order",
    });
  }
});


// ======================================================
// Verify Razorpay Payment
// POST /api/orders/payment/verify
// ======================================================
exports.verifyPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderId,
  } = req.body;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !orderId
  ) {
    return res.status(400).json({
      success: false,
      message: "Missing payment information",
    });
  }

  // Verify Razorpay Signature
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;

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

  // Find Order
  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  // Prevent duplicate verification
  if (order.paymentStatus === "Paid") {
    return res.status(200).json({
      success: true,
      message: "Payment already verified",
      order,
    });
  }

  // Update payment details
  order.paymentMethod = "Razorpay";
  order.paymentStatus = "Paid";
  order.orderStatus = "Processing";

  order.razorpayOrderId = razorpay_order_id;
  order.razorpayPaymentId = razorpay_payment_id;
  order.razorpaySignature = razorpay_signature;

  await order.save();

  // Reduce stock + Clear cart + Link order to user
  await completeOrder(order);

  res.status(200).json({
    success: true,
    message: "Payment verified successfully",
    order,
  });
});


// ======================================================
// Cash On Delivery
// POST /api/orders/payment/cod
// ======================================================
exports.cashOnDelivery = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  if (!orderId) {
    return res.status(400).json({
      success: false,
      message: "Order ID is required",
    });
  }

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  // Prevent duplicate processing
  if (
    order.paymentMethod === "COD" &&
    order.orderStatus !== "Pending"
  ) {
    return res.status(400).json({
      success: false,
      message: "Order has already been processed",
    });
  }

  // Update order
  order.paymentMethod = "COD";
  order.paymentStatus = "Pending";
  order.orderStatus = "Processing";

  await order.save();

  // Reduce stock + Clear cart + Link order
  await completeOrder(order);

  res.status(200).json({
    success: true,
    message: "Cash on Delivery selected successfully",
    order,
  });
});


// ======================================================
// Get Payment Details
// GET /api/orders/payment/:id
// ======================================================
exports.getPaymentDetails = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email");

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
      razorpaySignature: order.razorpaySignature,
      totalAmount: order.totalPrice,
      orderStatus: order.orderStatus,
      createdAt: order.createdAt,
    },
  });
});

// ======================================================
// Refund Payment (Admin)
// POST /api/orders/payment/refund/:id
// ======================================================
exports.refundPayment = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  if (order.paymentStatus !== "Paid") {
    return res.status(400).json({
      success: false,
      message: "Only paid orders can be refunded",
    });
  }

  order.paymentStatus = "Refunded";
  order.orderStatus = "Cancelled";

  await order.save();

  res.status(200).json({
    success: true,
    message: "Refund processed successfully",
    order,
  });
});

// ======================================================
// Payment Success
// ======================================================
exports.paymentSuccess = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Payment successful",
  });
});

// ======================================================
// Payment Failed
// ======================================================
exports.paymentFailed = asyncHandler(async (req, res) => {
  res.status(400).json({
    success: false,
    message: "Payment failed",
  });
});

// ======================================================
// Get Payment History
// ======================================================
exports.getPaymentHistory = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    user: req.user.id,
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    totalPayments: orders.length,
    orders,
  });
});

// ======================================================
// Get Payment By ID
// ======================================================
exports.getPaymentById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.paymentId)
    .populate("user", "name email")
    .populate("products.product");

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

// ======================================================
// Razorpay Webhook
// ======================================================
exports.webhookHandler = asyncHandler(async (req, res) => {
  // Future:
  // Verify webhook signature
  // Update payment status automatically
  // Send email notification
  // Generate invoice

  console.log("Webhook Event:", req.body);

  res.status(200).json({
    success: true,
    message: "Webhook received successfully",
  });
});

