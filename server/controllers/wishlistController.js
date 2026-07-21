const asyncHandler = require("express-async-handler");
const Wishlist = require("../models/wishlistModel");
const Product = require("../models/productModel");

// ======================================
// Add Product To Wishlist
// ======================================
exports.addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  let wishlist = await Wishlist.findOne({
    user: req.user.id,
  });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: req.user.id,
      products: [],
    });
  }

  const exists = wishlist.products.find(
    (item) => item.product.toString() === productId
  );

  if (exists) {
    return res.status(400).json({
      success: false,
      message: "Product already exists in wishlist",
    });
  }

  wishlist.products.push({
    product: product._id,
  });

  await wishlist.save();

  res.status(200).json({
    success: true,
    message: "Product added to wishlist",
    wishlist,
  });
});

// ======================================
// Get Wishlist
// ======================================
exports.getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({
    user: req.user.id,
  }).populate("products.product");

  if (!wishlist) {
    return res.status(200).json({
      success: true,
      wishlist: {
        products: [],
      },
    });
  }

  res.status(200).json({
    success: true,
    wishlist,
  });
});

// ======================================
// Remove Product From Wishlist
// ======================================
exports.removeFromWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({
    user: req.user.id,
  });

  if (!wishlist) {
    return res.status(404).json({
      success: false,
      message: "Wishlist not found",
    });
  }

  wishlist.products = wishlist.products.filter((item) => {
    const productId = item.product._id
      ? item.product._id.toString()
      : item.product.toString();

    return productId !== req.params.id;
  });

  await wishlist.save();

  res.status(200).json({
    success: true,
    message: "Product removed from wishlist",
    wishlist,
  });
});

// ======================================
// Clear Wishlist
// ======================================
exports.clearWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({
    user: req.user.id,
  });

  if (!wishlist) {
    return res.status(404).json({
      success: false,
      message: "Wishlist not found",
    });
  }

  wishlist.products = [];

  await wishlist.save();

  res.status(200).json({
    success: true,
    message: "Wishlist cleared successfully",
  });
});

// ======================================
// Wishlist Count
// ======================================
exports.getWishlistCount = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({
    user: req.user.id,
  });

  const count = wishlist ? wishlist.products.length : 0;

  res.status(200).json({
    success: true,
    count,
  });
});