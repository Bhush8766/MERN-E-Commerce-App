const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // ===============================
    // Basic Information
    // ===============================
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      maxlength: 200,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
    },

    shortDescription: {
      type: String,
      default: "",
      maxlength: 300,
    },

    // ===============================
    // Category
    // ===============================
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    // ===============================
    // Brand
    // ===============================
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },

    // ===============================
    // Images
    // ===============================
    thumbnail: {
      public_id: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },

    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],

    // ===============================
    // Pricing
    // ===============================
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPrice: {
      type: Number,
      default: 0,
    },

    discountPercentage: {
      type: Number,
      default: 0,
    },

    costPrice: {
      type: Number,
      default: 0,
    },

    // ===============================
    // Inventory
    // ===============================
    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    sold: {
      type: Number,
      default: 0,
    },

    sku: {
      type: String,
      unique: true,
      required: true,
      uppercase: true,
      trim: true,
    },

    barcode: {
      type: String,
      default: "",
    },

    // ===============================
    // Status
    // ===============================
    status: {
      type: String,
      enum: [
        "Draft",
        "Published",
        "Out of Stock",
      ],
      default: "Published",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // ===============================
    // Created By
    // ===============================
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

        // ===============================
    // Product Variants
    // ===============================
    colors: [
      {
        type: String,
        trim: true,
      },
    ],

    sizes: [
      {
        type: String,
        trim: true,
      },
    ],

    // ===============================
    // Specifications
    // ===============================
    specifications: [
      {
        key: {
          type: String,
          trim: true,
        },
        value: {
          type: String,
          trim: true,
        },
      },
    ],

    // ===============================
    // Reviews
    // ===============================
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    // ===============================
    // Tags
    // ===============================
    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    // ===============================
    // Shipping
    // ===============================
    shippingCharge: {
      type: Number,
      default: 0,
    },

    freeShipping: {
      type: Boolean,
      default: false,
    },

    weight: {
      type: Number,
      default: 0,
    },

    dimensions: {
      length: {
        type: Number,
        default: 0,
      },
      width: {
        type: Number,
        default: 0,
      },
      height: {
        type: Number,
        default: 0,
      },
    },

    // ===============================
    // Warranty & Return
    // ===============================
    warranty: {
      type: String,
      default: "",
    },

    returnPolicy: {
      type: String,
      default: "",
    },

    // ===============================
    // SEO
    // ===============================
    metaTitle: {
      type: String,
      default: "",
    },

    metaDescription: {
      type: String,
      default: "",
    },

    metaKeywords: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// ===============================
// Indexes
// ===============================
productSchema.index({ title: "text" });
productSchema.index({ slug: 1 });
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ featured: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });

// ===============================
// Virtual
// ===============================
productSchema.virtual("isInStock").get(function () {
  return this.stock > 0;
});

// ===============================
// Enable Virtuals
// ===============================
productSchema.set("toJSON", {
  virtuals: true,
});

productSchema.set("toObject", {
  virtuals: true,
});

module.exports = mongoose.model("Product", productSchema);