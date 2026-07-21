const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyOTP,
  resendOTP,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  registerValidation,
  loginValidation,
} = require("../middleware/validationMiddleware");

// ===============================
// Public Routes
// ===============================

// Register User
router.post(
  "/register",
  registerValidation,
  register
);

// Login User
router.post(
  "/login",
  loginValidation,
  login
);

// Logout User
router.post(
  "/logout",
  logout
);

// Forgot Password
router.post(
  "/forgot-password",
  forgotPassword
);

// Reset Password
router.post(
  "/reset-password/:token",
  resetPassword
);

// Verify OTP
router.post(
  "/verify-otp",
  verifyOTP
);

// Resend OTP
router.post(
  "/resend-otp",
  resendOTP
);

// ===============================
// Protected Routes
// ===============================

// Logged In User Profile
router.get(
  "/profile",
  protect,
  getProfile
);

// Update Profile
router.put(
  "/profile",
  protect,
  updateProfile
);

// Change Password
router.put(
  "/change-password",
  protect,
  changePassword
);

// ===============================
// Admin Route Example
// ===============================

// Only Admin Can Access
router.get(
  "/admin",
  protect,
  authorize("Admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

module.exports = router;