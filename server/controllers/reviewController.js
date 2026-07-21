const asyncHandler = require("express-async-handler");
const Review = require("../models/reviewModel");
const Product = require("../models/productModel");

// ==============================================
// Add Review
// POST /api/reviews
// ==============================================
exports.addReview = asyncHandler(async (req, res) => {
  const { productId, rating, comment } = req.body;

  if (!productId || !rating || !comment) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const alreadyReviewed = await Review.findOne({
    user: req.user.id,
    product: productId,
  });

  if (alreadyReviewed) {
    return res.status(400).json({
      success: false,
      message: "You have already reviewed this product",
    });
  }

  const review = await Review.create({
    user: req.user.id,
    product: productId,

    // ADD THESE
    name: req.user.name,
    avatar: req.user.avatar,

    rating,
    comment,
  });

  // Update Product Rating
  const reviews = await Review.find({ product: productId });

  const average =
    reviews.reduce((sum, item) => sum + item.rating, 0) /
    reviews.length;

  product.rating = average;
  product.numReviews = reviews.length;

  await product.save();

  res.status(201).json({
    success: true,
    message: "Review added successfully",
    review,
  });
});

// ==============================================
// Get Product Reviews
// GET /api/reviews/product/:productId
// ==============================================
exports.getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    product: req.params.productId,
  })
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    totalReviews: reviews.length,
    reviews,
  });
});

// ==============================================
// Get Single Review
// GET /api/reviews/:id
// ==============================================
exports.getReviewById = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id)
    .populate("user", "name email")
    .populate("product", "title images");

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  res.status(200).json({
    success: true,
    review,
  });
});

// ==============================================
// Update Review
// ==============================================
exports.updateReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const review = await Review.findById(req.params.id);

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  if (review.user.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: "Not authorized",
    });
  }

  review.rating = rating || review.rating;
  review.comment = comment || review.comment;

  await review.save();

  res.status(200).json({
    success: true,
    message: "Review updated successfully",
    review,
  });
});

// ==============================================
// Delete Review
// ==============================================
exports.deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  await review.deleteOne();

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});

// ==============================================
// Get All Reviews
// ==============================================
exports.getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find()
    .populate("user", "name email")
    .populate("product", "title");

  res.status(200).json({
    success: true,
    totalReviews: reviews.length,
    reviews,
  });
});

// ==============================================
// Approve Review
// ==============================================
exports.approveReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  review.status = "Approved";

  await review.save();

  res.status(200).json({
    success: true,
    message: "Review approved successfully",
    review,
  });
});

// ==============================================
// Reject Review
// ==============================================
exports.rejectReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  review.status = "Rejected";

  await review.save();

  res.status(200).json({
    success: true,
    message: "Review rejected successfully",
    review,
  });
});