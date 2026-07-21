const mongoose = require("mongoose");

// =====================================
// Cart Item Schema
// =====================================
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },

  price: {
    type: Number,
    required: true,
  },

  subtotal: {
    type: Number,
    required: true,
  },

  color: {
    type: String,
    default: "",
  },

  size: {
    type: String,
    default: "",
  },
});

// =====================================
// Cart Schema
// =====================================
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    products: [cartItemSchema],

    totalItems: {
      type: Number,
      default: 0,
    },

    totalPrice: {
      type: Number,
      default: 0,
    },

    totalDiscount: {
      type: Number,
      default: 0,
    },

    shippingCharge: {
      type: Number,
      default: 0,
    },

    tax: {
      type: Number,
      default: 0,
    },

    grandTotal: {
      type: Number,
      default: 0,
    },

    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
      default: null,
    },

    couponDiscount: {
      type: Number,
      default: 0,
    },

    isCheckedOut: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// =====================================
// Calculate Totals
// =====================================
cartSchema.methods.calculateTotals = function () {
  this.totalItems = this.products.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  this.totalPrice = this.products.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );

  this.grandTotal =
    this.totalPrice +
    this.shippingCharge +
    this.tax -
    this.couponDiscount;
};

// =====================================
// Before Save
// =====================================
cartSchema.pre("save", function (next) {
  this.calculateTotals();
  next();
});

// =====================================
// Virtual
// =====================================
cartSchema.virtual("isEmpty").get(function () {
  return this.products.length === 0;
});

cartSchema.set("toJSON", {
  virtuals: true,
});

cartSchema.set("toObject", {
  virtuals: true,
});

module.exports = mongoose.model("Cart", cartSchema);