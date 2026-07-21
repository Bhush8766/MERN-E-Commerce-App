const mongoose = require("mongoose");

// ======================================
// Review Schema
// ======================================
const reviewSchema = new mongoose.Schema(
  {
    // User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Product
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    // User Name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // User Image
    avatar: {
      public_id: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },

    // Rating
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    // Review
    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    // Images
    images: [
      {
        public_id: String,
        url: String,
      },
    ],

    // Likes
    likes: {
      type: Number,
      default: 0,
    },

    // Verified Purchase
    verifiedPurchase: {
      type: Boolean,
      default: false,
    },

    // Admin Reply
    adminReply: {
      message: {
        type: String,
        default: "",
      },

      repliedAt: Date,
    },

    // Status
    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
      ],
      default: "Approved",
    },
  },
  {
    timestamps: true,
  }
);

// ======================================
// Prevent Duplicate Reviews
// ======================================
reviewSchema.index(
  {
    user: 1,
    product: 1,
  },
  {
    unique: true,
  }
);

// ======================================
// Indexes
// ======================================
reviewSchema.index({ rating: -1 });
reviewSchema.index({ createdAt: -1 });

// ======================================
// Export
// ======================================
module.exports = mongoose.model(
  "Review",
  reviewSchema
);