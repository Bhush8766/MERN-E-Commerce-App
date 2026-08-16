const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  blockUser,
  unblockUser,
  updateUserRole,

  getUserProfile,
  updateUserProfile,
  changePassword,

  // Address Controllers
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");

// =====================================================
// LOGGED-IN USER ROUTES
// =====================================================

// ======================================
// GET MY PROFILE
// GET /api/users/profile
// ======================================

router.get(
  "/profile",
  protect,
  getUserProfile
);

// ======================================
// UPDATE MY PROFILE
// PUT /api/users/profile
// ======================================

router.put(
  "/profile",
  protect,
  updateUserProfile
);

// ======================================
// CHANGE PASSWORD
// PUT /api/users/change-password
// ======================================

router.put(
  "/change-password",
  protect,
  changePassword
);

// =====================================================
// SAVED ADDRESS ROUTES
// =====================================================

// ======================================
// GET ADDRESSES
// GET /api/users/addresses
// ======================================

router.get(
  "/addresses",
  protect,
  getAddresses
);

// ======================================
// ADD ADDRESS
// POST /api/users/addresses
// ======================================

router.post(
  "/addresses",
  protect,
  addAddress
);

// ======================================
// UPDATE ADDRESS
// PUT /api/users/addresses/:id
// ======================================

router.put(
  "/addresses/:id",
  protect,
  updateAddress
);

// ======================================
// DELETE ADDRESS
// DELETE /api/users/addresses/:id
// ======================================

router.delete(
  "/addresses/:id",
  protect,
  deleteAddress
);

// ======================================
// SET DEFAULT ADDRESS
// PUT /api/users/addresses/default/:id
// ======================================

router.put(
  "/addresses/default/:id",
  protect,
  setDefaultAddress
);

// =====================================================
// ADMIN USER MANAGEMENT
// =====================================================

// ======================================
// GET ALL USERS
// GET /api/users
// ADMIN ONLY
// ======================================

router.get(
  "/",
  protect,
  authorize("Admin"),
  getAllUsers
);

// ======================================
// GET SINGLE USER
// GET /api/users/:id
// ADMIN ONLY
// ======================================

router.get(
  "/:id",
  protect,
  authorize("Admin"),
  getUserById
);

// ======================================
// UPDATE USER
// PUT /api/users/:id
// ADMIN ONLY
// ======================================

router.put(
  "/:id",
  protect,
  authorize("Admin"),
  updateUser
);

// ======================================
// DELETE USER
// DELETE /api/users/:id
// ADMIN ONLY
// ======================================

router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  deleteUser
);

// ======================================
// BLOCK USER
// PATCH /api/users/block/:id
// ADMIN ONLY
// ======================================

router.patch(
  "/block/:id",
  protect,
  authorize("Admin"),
  blockUser
);

// ======================================
// UNBLOCK USER
// PATCH /api/users/unblock/:id
// ADMIN ONLY
// ======================================

router.patch(
  "/unblock/:id",
  protect,
  authorize("Admin"),
  unblockUser
);

// ======================================
// CHANGE USER ROLE
// PATCH /api/users/role/:id
// ADMIN ONLY
// ======================================

router.patch(
  "/role/:id",
  protect,
  authorize("Admin"),
  updateUserRole
);

module.exports = router;