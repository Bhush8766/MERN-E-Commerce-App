const mongoose = require("mongoose");

// =====================================
// Wishlist Item Schema
// =====================================
const wishlistItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
);

// =====================================
// Wishlist Schema
// =====================================
const wishlistSchema = new mongoose.Schema(
  {
    // Wishlist Owner
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Wishlist Products
    products: [wishlistItemSchema],
  },
  {
    timestamps: true,
  }
);

// =====================================
// Virtual - Wishlist Count
// =====================================
wishlistSchema.virtual("totalItems").get(function () {
  return this.products.length;
});

// =====================================
// Enable Virtuals
// =====================================
wishlistSchema.set("toJSON", {
  virtuals: true,
});

wishlistSchema.set("toObject", {
  virtuals: true,
});

// =====================================
// Prevent Duplicate Products
// =====================================
wishlistSchema.methods.hasProduct = function (productId) {
  return this.products.some(
    (item) => item.product.toString() === productId.toString()
  );
};

// =====================================
// Export Model
// =====================================
module.exports = mongoose.model("Wishlist", wishlistSchema);