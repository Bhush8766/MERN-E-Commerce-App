const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    // ======================================
    // BASIC INFORMATION
    // ======================================

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    phone: {
      type: String,
      default: "",
    },

    // ======================================
    // AVATAR
    // ======================================

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

    // ======================================
    // GENDER
    // ======================================

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Other",
    },

    // ======================================
    // ROLE
    // ======================================

    role: {
      type: String,
      enum: ["Customer", "Vendor", "Admin"],
      default: "Customer",
    },

    // ======================================
    // SAVED ADDRESSES
    // ======================================

    addresses: [
      {
        fullName: String,
        phone: String,
        address: String,
        city: String,
        state: String,
        country: String,
        pincode: String,

        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],

    // ======================================
    // WISHLIST
    // ======================================

    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wishlist",
      },
    ],

    // ======================================
    // CART
    // ======================================

    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },

    // ======================================
    // ORDERS
    // ======================================

    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    // ======================================
    // ACCOUNT VERIFICATION
    // ======================================

    isVerified: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
      default: "",
    },

    otpExpire: {
      type: Date,
    },

    // ======================================
    // PASSWORD RESET
    // ======================================

    resetPasswordToken: String,

    resetPasswordExpire: Date,

    // ======================================
    // ACCOUNT STATUS
    // ======================================

    status: {
      type: String,
      enum: ["Active", "Blocked"],
      default: "Active",
    },
  },

  {
    timestamps: true,
  }
);

// ======================================
// HASH PASSWORD BEFORE SAVE
// ======================================

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(
    this.password,
    salt
  );

  next();
});

// ======================================
// COMPARE PASSWORD
// ======================================

userSchema.methods.comparePassword = async function (
  enteredPassword
) {
  return await bcrypt.compare(
    enteredPassword,
    this.password
  );
};

// ======================================
// GENERATE JWT TOKEN
// ======================================

userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      id: this._id,
      role: this.role,
    },

    process.env.JWT_SECRET,

    {
      expiresIn:
        process.env.JWT_EXPIRE || "7d",
    }
  );
};

module.exports = mongoose.model(
  "User",
  userSchema
);