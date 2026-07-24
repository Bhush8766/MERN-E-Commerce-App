const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// ===============================
// Add Product To Cart
// POST /cart/addToCart
// ===============================
exports.addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user.id,
      products: [],
      totalItems: 0,
      totalPrice: 0,
    });
  }

  const itemIndex = cart.products.findIndex(
    item => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    cart.products[itemIndex].quantity += Number(quantity);

    cart.products[itemIndex].subtotal =
      cart.products[itemIndex].quantity * product.price;
  } else {
    cart.products.push({
      product: product._id,
      quantity,
      price: product.price,
      subtotal: quantity * product.price,
    });
  }

  cart.totalItems = cart.products.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  cart.totalPrice = cart.products.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Product added to cart",
    cart,
  });
});

// ===============================
// Get My Cart
// GET /cart/getMyCart
// ===============================
exports.getMyCart = asyncHandler(async (req, res) => {

  const cart = await Cart.findOne({ user: req.user.id })
    .populate({
      path: "products.product",
      select: "title price thumbnail stock",
    });

  if (!cart) {
    return res.status(200).json({
      success: true,
      cart: {
        products: [],
        totalItems: 0,
        totalPrice: 0,
      },
    });
  }

  console.log("Cart Response:");
  console.log(JSON.stringify(cart, null, 2));

  res.status(200).json({
    success: true,
    cart,
  });

});

// ===============================
// Update Quantity
// PATCH /cart/updateQuantity/:id
// ===============================
exports.updateQuantity = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const productId = req.params.id;

  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    return res.status(404).json({
      success: false,
      message: "Cart not found",
    });
  }

  const item = cart.products.find(
    (item) => item.product.toString() === productId
  );

  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Cart item not found",
    });
  }

  item.quantity = Number(quantity);
  item.subtotal = item.quantity * item.price;

  cart.calculateTotals();

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Quantity updated successfully",
    cart,
  });
});

// ===============================
// Remove From Cart
// DELETE /cart/removeFromCart/:id
// ===============================
exports.removeFromCart = asyncHandler(async (req, res) => {

  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    return res.status(404).json({
      success: false,
      message: "Cart not found",
    });
  }

  cart.products = cart.products.filter(
    item => item._id.toString() !== req.params.id
  );

  cart.totalItems = cart.products.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  cart.totalPrice = cart.products.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Item removed from cart",
    cart,
  });

});

// ===============================
// Clear Cart
// DELETE /cart/clearCart
// ===============================
exports.clearCart = asyncHandler(async (req, res) => {

  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    return res.status(404).json({
      success: false,
      message: "Cart not found",
    });
  }

  cart.products = [];
  cart.totalItems = 0;
  cart.totalPrice = 0;

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Cart cleared successfully",
  });

});

// ===============================
// Get Cart Count
// GET /cart/getCartCount
// ===============================
exports.getCartCount = asyncHandler(async (req, res) => {

  const cart = await Cart.findOne({ user: req.user.id });

  const count = cart
    ? cart.products.reduce(
        (sum, item) => sum + item.quantity,
        0
      )
    : 0;

  res.status(200).json({
    success: true,
    count,
  });

});

// ===============================
// Get Cart Total
// GET /cart/getCartTotal
// ===============================
exports.getCartTotal = asyncHandler(async (req, res) => {

  const cart = await Cart.findOne({ user: req.user.id });

  const total = cart ? cart.totalPrice : 0;

  res.status(200).json({
    success: true,
    totalPrice: total,
  });

});