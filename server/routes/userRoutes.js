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
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// ==========================================
// Logged In User Routes
// ==========================================

// Get My Profile
router.get("/profile", protect, getUserProfile);

// Update My Profile
router.put("/profile", protect, updateUserProfile);

// ==========================================
// Authenticated User Routes
// ==========================================

// Get All Users (Any Logged-in User)
router.get("/", protect, getAllUsers);

// Get Single User (Any Logged-in User)
router.get("/:id", protect, getUserById);

// ==========================================
// Admin Routes
// ==========================================

// Update User
router.put("/:id", protect, authorize("Admin"), updateUser);

// Delete User
router.delete("/:id", protect, authorize("Admin"), deleteUser);

// Block User
router.patch("/block/:id", protect, authorize("Admin"), blockUser);

// Unblock User
router.patch("/unblock/:id", protect, authorize("Admin"), unblockUser);

// Update User Role
router.patch("/role/:id", protect, authorize("Admin"), updateUserRole);

module.exports = router;