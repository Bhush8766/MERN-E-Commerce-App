const { body, validationResult } = require("express-validator");

// ==========================================
// Handle Validation Errors
// ==========================================
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: errors.array(),
    });
  }

  next();
};

// ==========================================
// User Register Validation
// ==========================================
const registerValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  validate,
];

// ==========================================
// User Login Validation
// ==========================================
const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),

  validate,
];

// ==========================================
// Product Validation
// ==========================================
const productValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Product title is required"),

  body("price")
    .isFloat({ min: 1 })
    .withMessage("Price must be greater than 0"),

  body("stock")
    .isInt({ min: 0 })
    .withMessage("Stock cannot be negative"),

  body("category")
    .notEmpty()
    .withMessage("Category is required"),

  body("brand")
    .notEmpty()
    .withMessage("Brand is required"),

  validate,
];

// ==========================================
// Category Validation
// ==========================================
const categoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required"),

  validate,
];

// ==========================================
// Brand Validation
// ==========================================
const brandValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Brand name is required"),

  validate,
];

// ==========================================
// Review Validation
// ==========================================
const reviewValidation = [
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),

  body("comment")
    .trim()
    .notEmpty()
    .withMessage("Comment is required"),

  validate,
];

// ==========================================
// Order Validation
// ==========================================
const orderValidation = [
  body("shippingAddress.fullName")
    .notEmpty()
    .withMessage("Full name is required"),

  body("shippingAddress.phone")
    .notEmpty()
    .withMessage("Phone number is required"),

  body("shippingAddress.address")
    .notEmpty()
    .withMessage("Address is required"),

  body("shippingAddress.city")
    .notEmpty()
    .withMessage("City is required"),

  body("shippingAddress.state")
    .notEmpty()
    .withMessage("State is required"),

  body("shippingAddress.country")
    .notEmpty()
    .withMessage("Country is required"),

  body("shippingAddress.pincode")
    .notEmpty()
    .withMessage("Pincode is required"),

  validate,
];

module.exports = {
  validate,
  registerValidation,
  loginValidation,
  productValidation,
  categoryValidation,
  brandValidation,
  reviewValidation,
  orderValidation,
};