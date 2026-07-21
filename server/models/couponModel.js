const mongoose = require("mongoose");

// ======================================
// Coupon Schema
// ======================================
const couponSchema = new mongoose.Schema(
  {
    // Coupon Code
    code: {
      type: String,
      required: [true, "Coupon code is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },

    // Coupon Description
    description: {
      type: String,
      default: "",
      trim: true,
    },

    // Discount Type
    discountType: {
      type: String,
      enum: ["Percentage", "Fixed"],
      required: true,
      default: "Percentage",
    },

    // Discount Value
    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },

    // Minimum Order Amount
    minimumOrderAmount: {
      type: Number,
      default: 0,
    },

    // Maximum Discount
    maximumDiscount: {
      type: Number,
      default: 0,
    },

    // Coupon Validity
    startDate: {
      type: Date,
      required: true,
    },

    expiryDate: {
      type: Date,
      required: true,
    },

    // Usage
    usageLimit: {
      type: Number,
      default: 100,
    },

    usedCount: {
      type: Number,
      default: 0,
    },

    // Users Who Used Coupon
    usedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Active Status
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

// ======================================
// Check Expired
// ======================================
couponSchema.virtual("isExpired").get(function () {
  return this.expiryDate < new Date();
});

// ======================================
// Check Available
// ======================================
couponSchema.virtual("isAvailable").get(function () {
  return (
    this.isActive &&
    this.usedCount < this.usageLimit &&
    this.expiryDate > new Date()
  );
});

// ======================================
// Enable Virtuals
// ======================================
couponSchema.set("toJSON", {
  virtuals: true,
});

couponSchema.set("toObject", {
  virtuals: true,
});

// ======================================
// Method : Can User Use Coupon
// ======================================
couponSchema.methods.canUserUse = function (userId) {
  return !this.usedBy.some(
    (id) => id.toString() === userId.toString()
  );
};

// ======================================
// Method : Apply Coupon
// ======================================
couponSchema.methods.applyCoupon = function (
  orderAmount
) {
  if (!this.isAvailable) {
    return {
      success: false,
      message: "Coupon expired or inactive",
    };
  }

  if (orderAmount < this.minimumOrderAmount) {
    return {
      success: false,
      message: `Minimum order amount should be ₹${this.minimumOrderAmount}`,
    };
  }

  let discount = 0;

  if (this.discountType === "Percentage") {
    discount =
      (orderAmount * this.discountValue) / 100;

    if (
      this.maximumDiscount > 0 &&
      discount > this.maximumDiscount
    ) {
      discount = this.maximumDiscount;
    }
  } else {
    discount = this.discountValue;
  }

  return {
    success: true,
    discount,
    finalAmount: orderAmount - discount,
  };
};

// ======================================
// Indexes
// ======================================
couponSchema.index({ code: 1 });
couponSchema.index({ expiryDate: 1 });

// ======================================
// Export
// ======================================
module.exports = mongoose.model(
  "Coupon",
  couponSchema
);