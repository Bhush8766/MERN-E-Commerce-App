const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// ======================================================
// Create Order
// POST /api/orders/create
// ======================================================
exports.createOrder = asyncHandler(async (req, res) => {
  const {
    shippingAddress,
    paymentMethod,
    paymentStatus,
  } = req.body;

  console.log("========== CREATE ORDER ==========");
  console.log("User:", req.user);

  // ==========================================
  // Validate Shipping Address
  // ==========================================

  if (!shippingAddress) {
    return res.status(400).json({
      success: false,
      message: "Shipping address is required",
    });
  }

  // ==========================================
  // Find User Cart
  // ==========================================

  const cart = await Cart.findOne({
    user: req.user.id,
  }).populate("products.product");

  console.log("Cart Found:", cart);

  if (!cart || cart.products.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Cart is empty",
    });
  }

  // ==========================================
  // Stock Validation
  // ==========================================

  for (const item of cart.products) {
    if (!item.product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    console.log(
      `${item.product.title} Stock: ${item.product.stock} Qty: ${item.quantity}`
    );

    if (item.product.stock < item.quantity) {
      return res.status(400).json({
        success: false,
        message: `${item.product.title} is out of stock`,
      });
    }
  }

  try {
    // ==========================================
    // Create Order
    // ==========================================

    const order = await Order.create({
      user: req.user.id,

      products: cart.products.map((item) => ({
        product: item.product._id,
        name: item.product.title,
        image: item.product.thumbnail?.url || "",
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal,
        color: item.color || "",
        size: item.size || "",
      })),

      shippingAddress: {
        fullName: shippingAddress.fullName,
        phone: shippingAddress.phone,
        address: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state,
        country: shippingAddress.country,
        pincode: shippingAddress.pincode,
      },

      paymentMethod,

      paymentStatus: paymentStatus || "Pending",

      orderStatus: "Pending",

      totalItems: cart.totalItems,

      itemsPrice: cart.totalPrice,

      shippingPrice: cart.shippingCharge,

      taxPrice: cart.tax,

      totalPrice: cart.grandTotal,
    });

    console.log("ORDER CREATED SUCCESSFULLY");
    console.log(order);

    // ==========================================
    // IMPORTANT
    // ==========================================
    // Do NOT clear cart here.
    // Do NOT reduce stock here.
    //
    // These actions will happen after:
    // 1. Razorpay payment is verified
    // 2. OR COD is confirmed
    // inside paymentController.js
    // ==========================================

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ======================================================
// Get My Orders
// GET /api/orders/my-orders
// ======================================================
exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    user: req.user.id,
  })
    .populate("products.product")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    totalOrders: orders.length,
    orders,
  });
});

// ======================================================
// Get Order By ID
// GET /api/orders/:id
// ======================================================
exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("products.product")
    .populate("user", "name email phone");

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  // Prevent users from viewing other users' orders
  if (
    req.user.role !== "Admin" &&
    order.user._id.toString() !== req.user.id
  ) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to access this order",
    });
  }

  res.status(200).json({
    success: true,
    order,
  });
});


// ======================================================
// Get All Orders (Admin)
// GET /api/orders
// ======================================================
exports.getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email phone")
    .populate("products.product")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    totalOrders: orders.length,
    orders,
  });
});

// ======================================================
// Update Order Status
// PATCH /api/orders/status/:id
// ======================================================
exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const allowedStatus = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  if (!status || !allowedStatus.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid order status",
    });
  }

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  // Prevent updating delivered orders
  if (order.orderStatus === "Delivered") {
    return res.status(400).json({
      success: false,
      message: "Order has already been delivered",
    });
  }

  order.orderStatus = status;

  if (status === "Delivered") {
    order.isDelivered = true;
    order.deliveredAt = new Date();
  } else {
    order.isDelivered = false;
    order.deliveredAt = null;
  }

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    order,
  });
});



// ======================================================
// Cancel Order
// PATCH /api/orders/cancel/:id
// ======================================================
exports.cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  // Customer can cancel only own order
  if (
    req.user.role !== "Admin" &&
    order.user.toString() !== req.user.id
  ) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to cancel this order",
    });
  }

  // Cannot cancel after delivery
  if (order.orderStatus === "Delivered") {
    return res.status(400).json({
      success: false,
      message: "Delivered order cannot be cancelled",
    });
  }

  // Already cancelled
  if (order.orderStatus === "Cancelled") {
    return res.status(400).json({
      success: false,
      message: "Order already cancelled",
    });
  }

  order.orderStatus = "Cancelled";
  order.cancelledAt = new Date();

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order cancelled successfully",
    order,
  });
});

// ======================================================
// Delete Order
// DELETE /api/orders/:id
// ======================================================
exports.deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
});