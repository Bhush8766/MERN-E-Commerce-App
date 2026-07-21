const mongoose = require("mongoose");

// ======================================
// Order Item Schema
// ======================================
const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    quantity: {
      type: Number,
      required: true,
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
  },
  {
    _id: false,
  }
);

// ======================================
// Shipping Address Schema
// ======================================
const shippingSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

// ======================================
// Payment Result Schema
// ======================================
const paymentResultSchema = new mongoose.Schema(
  {
    paymentId: String,
    orderId: String,
    signature: String,
    transactionId: String,
  },
  {
    _id: false,
  }
);

// ======================================
// Order Schema
// ======================================
const orderSchema = new mongoose.Schema(
  {
    // Customer
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Ordered Products
    products: [orderItemSchema],

    // Shipping
    shippingAddress: shippingSchema,

    // Payment
    paymentMethod: {
      type: String,
      enum: ["COD", "Razorpay"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Paid",
        "Failed",
        "Refunded",
      ],
      default: "Pending",
    },

    paymentResult: paymentResultSchema,

    // Order Status
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Processing",
        "Shipped",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
        "Returned",
      ],
      default: "Pending",
    },

    // Coupon
    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
    },

    couponDiscount: {
      type: Number,
      default: 0,
    },

        // ======================================
    // Order Summary
    // ======================================
    totalItems: {
      type: Number,
      required: true,
      default: 0,
    },

    itemsPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    shippingPrice: {
      type: Number,
      default: 0,
    },

    taxPrice: {
      type: Number,
      default: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    // ======================================
    // Delivery Information
    // ======================================
    isDelivered: {
      type: Boolean,
      default: false,
    },

    deliveredAt: {
      type: Date,
    },

    expectedDelivery: {
      type: Date,
    },

    cancelledAt: {
      type: Date,
    },

    // ======================================
    // Tracking
    // ======================================
    trackingNumber: {
      type: String,
      default: "",
    },

    courierPartner: {
      type: String,
      default: "",
    },

    // ======================================
    // Invoice
    // ======================================
    invoiceNumber: {
      type: String,
      default: "",
    },

    // ======================================
    // Notes
    // ======================================
    customerNote: {
      type: String,
      default: "",
    },

    adminNote: {
      type: String,
      default: "",
    },

    // ======================================
    // Refund
    // ======================================
    refundAmount: {
      type: Number,
      default: 0,
    },

    refundReason: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// ======================================
// Indexes
// ======================================
orderSchema.index({ user: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ createdAt: -1 });

// ======================================
// Virtual
// ======================================
orderSchema.virtual("canCancel").get(function () {
  return (
    this.orderStatus === "Pending" ||
    this.orderStatus === "Confirmed"
  );
});

// ======================================
// Virtual
// ======================================
orderSchema.virtual("canReturn").get(function () {
  return this.orderStatus === "Delivered";
});

// ======================================
// Enable Virtuals
// ======================================
orderSchema.set("toJSON", {
  virtuals: true,
});

orderSchema.set("toObject", {
  virtuals: true,
});

// ======================================
// Export Model
// ======================================
module.exports = mongoose.model("Order", orderSchema);