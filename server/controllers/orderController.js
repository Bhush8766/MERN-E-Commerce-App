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

  // Find User Cart
  const cart = await Cart.findOne({ user: req.user.id })
    .populate("products.product");

  console.log("Cart Found:", cart);

  if (!cart || cart.products.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Cart is empty",
    });
  }

  // Stock Check
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

    // Create Order
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

    // Reduce Stock
    for (const item of cart.products) {

      const product = await Product.findById(item.product._id);

      product.stock -= item.quantity;

      await product.save();
    }

    // Clear Cart
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

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
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
    .populate("user", "name email");

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
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
    .populate("user", "name email")
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

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  order.orderStatus = status || order.orderStatus;

  if (status === "Delivered") {
    order.isDelivered = true;
    order.deliveredAt = new Date();
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