const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    // Category Name
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      maxlength: [100, "Category name cannot exceed 100 characters"],
    },

    // URL Slug
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Description
    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },

    // Category Image
    image: {
      public_id: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },

    // Parent Category
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    // Child Categories
    subCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],

    // Products
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    // Featured Category
    isFeatured: {
      type: Boolean,
      default: false,
    },

    // Active / Inactive
    isActive: {
      type: Boolean,
      default: true,
    },

    // Created By
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// ===============================
// Indexes
// ===============================
categorySchema.index({ name: 1 });
categorySchema.index({ slug: 1 });

// ===============================
// Virtual Product Count
// ===============================
categorySchema.virtual("productCount").get(function () {
  return this.products.length;
});

// ===============================
// Enable Virtuals
// ===============================
categorySchema.set("toJSON", {
  virtuals: true,
});

categorySchema.set("toObject", {
  virtuals: true,
});

module.exports = mongoose.model("Category", categorySchema);