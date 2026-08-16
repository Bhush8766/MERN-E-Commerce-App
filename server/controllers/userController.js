const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// =====================================================
// GET ALL USERS - ADMIN
// GET /api/users
// =====================================================
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
    .select("-password")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    totalUsers: users.length,
    users,
  });
});

// =====================================================
// GET SINGLE USER - ADMIN
// GET /api/users/:id
// =====================================================
exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// =====================================================
// UPDATE USER - ADMIN
// PUT /api/users/:id
// =====================================================
exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const {
    name,
    email,
    phone,
    gender,
    role,
    isBlocked,
  } = req.body;

  // ==========================================
  // Update only provided fields
  // ==========================================

  if (name !== undefined) {
    user.name = name;
  }

  if (email !== undefined) {
    user.email = email;
  }

  if (phone !== undefined) {
    user.phone = phone;
  }

  if (gender !== undefined) {
    user.gender = gender;
  }

  if (role !== undefined) {
    user.role = role;
  }

  if (isBlocked !== undefined) {
    user.isBlocked = isBlocked;
  }

  await user.save();

  const updatedUser = await User.findById(user._id)
    .select("-password");

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user: updatedUser,
  });
});

// =====================================================
// DELETE USER - ADMIN
// DELETE /api/users/:id
// =====================================================
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // ==========================================
  // Prevent Admin from deleting himself
  // ==========================================

  if (user._id.toString() === req.user.id.toString()) {
    return res.status(400).json({
      success: false,
      message: "You cannot delete your own account",
    });
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    userId: user._id,
  });
});

// =====================================================
// BLOCK USER - ADMIN
// PATCH /api/users/block/:id
// =====================================================
exports.blockUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // ==========================================
  // Prevent Admin from blocking himself
  // ==========================================

  if (user._id.toString() === req.user.id.toString()) {
    return res.status(400).json({
      success: false,
      message: "You cannot block your own account",
    });
  }

  // ==========================================
  // Prevent blocking another Admin
  // ==========================================

  if (user.role === "Admin") {
    return res.status(400).json({
      success: false,
      message: "Admin user cannot be blocked",
    });
  }

  user.isBlocked = true;

  await user.save();

  const blockedUser = await User.findById(user._id)
    .select("-password");

  res.status(200).json({
    success: true,
    message: "User blocked successfully",
    user: blockedUser,
  });
});

// =====================================================
// UNBLOCK USER - ADMIN
// PATCH /api/users/unblock/:id
// =====================================================
exports.unblockUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  user.isBlocked = false;

  await user.save();

  const updatedUser = await User.findById(user._id)
    .select("-password");

  res.status(200).json({
    success: true,
    message: "User unblocked successfully",
    user: updatedUser,
  });
});

// =====================================================
// UPDATE USER ROLE - ADMIN
// PATCH /api/users/role/:id
// =====================================================
exports.updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;

  // ==========================================
  // Validate Role
  // ==========================================

  const allowedRoles = [
    "Customer",
    "Admin",
    "Vendor",
  ];

  if (!role || !allowedRoles.includes(role)) {
    return res.status(400).json({
      success: false,
      message: "Invalid user role",
    });
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // ==========================================
  // Prevent Admin from changing own role
  // ==========================================

  if (user._id.toString() === req.user.id.toString()) {
    return res.status(400).json({
      success: false,
      message: "You cannot change your own role",
    });
  }

  user.role = role;

  await user.save();

  const updatedUser = await User.findById(user._id)
    .select("-password");

  res.status(200).json({
    success: true,
    message: "User role updated successfully",
    user: updatedUser,
  });
});

// =====================================================
// GET MY PROFILE
// GET /api/users/profile
// =====================================================
exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
    .select("-password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// =====================================================
// UPDATE MY PROFILE
// PUT /api/users/profile
// =====================================================
exports.updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const {
    name,
    phone,
    gender,
    avatar,
  } = req.body;

  if (name !== undefined) {
    user.name = name;
  }

  if (phone !== undefined) {
    user.phone = phone;
  }

  if (gender !== undefined) {
    user.gender = gender;
  }

  if (avatar !== undefined) {
    user.avatar = avatar;
  }

  await user.save();

  const updatedUser = await User.findById(user._id)
    .select("-password");

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: updatedUser,
  });
});

// =====================================================
// CHANGE PASSWORD
// PUT /api/users/change-password
// =====================================================
exports.changePassword = asyncHandler(async (req, res) => {
  const {
    currentPassword,
    newPassword,
  } = req.body;

  // ==========================================
  // Validation
  // ==========================================

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Current password and new password are required",
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      message: "New password must be at least 6 characters",
    });
  }

  // ==========================================
  // Get User with Password
  // ==========================================

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // ==========================================
  // Compare Password
  // ==========================================

  const isMatch = await user.matchPassword(
    currentPassword
  );

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Current password is incorrect",
    });
  }

  // ==========================================
  // Update Password
  // ==========================================

  user.password = newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

// =====================================================
// SAVED ADDRESSES
// =====================================================

// =====================================================
// GET ADDRESSES
// GET /api/users/addresses
// =====================================================
exports.getAddresses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
    .select("addresses");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    addresses: user.addresses || [],
  });
});

// =====================================================
// ADD ADDRESS
// POST /api/users/addresses
// =====================================================
exports.addAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const {
    fullName,
    phone,
    address,
    city,
    state,
    country,
    pincode,
  } = req.body;

  // ==========================================
  // Validation
  // ==========================================

  if (
    !fullName ||
    !phone ||
    !address ||
    !city ||
    !state ||
    !pincode
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all address details",
    });
  }

  // ==========================================
  // First address becomes default
  // ==========================================

  const isFirstAddress =
    !user.addresses ||
    user.addresses.length === 0;

  const newAddress = {
    fullName,
    phone,
    address,
    city,
    state,
    country: country || "India",
    pincode,
    isDefault: isFirstAddress,
  };

  user.addresses.push(newAddress);

  await user.save();

  res.status(201).json({
    success: true,
    message: "Address added successfully",
    addresses: user.addresses,
  });
});

// =====================================================
// UPDATE ADDRESS
// PUT /api/users/addresses/:id
// =====================================================
exports.updateAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const address = user.addresses.id(req.params.id);

  if (!address) {
    return res.status(404).json({
      success: false,
      message: "Address not found",
    });
  }

  const {
    fullName,
    phone,
    address: addressText,
    city,
    state,
    country,
    pincode,
    isDefault,
  } = req.body;

  if (fullName !== undefined) {
    address.fullName = fullName;
  }

  if (phone !== undefined) {
    address.phone = phone;
  }

  if (addressText !== undefined) {
    address.address = addressText;
  }

  if (city !== undefined) {
    address.city = city;
  }

  if (state !== undefined) {
    address.state = state;
  }

  if (country !== undefined) {
    address.country = country;
  }

  if (pincode !== undefined) {
    address.pincode = pincode;
  }

  // ==========================================
  // Set Default
  // ==========================================

  if (isDefault === true) {
    user.addresses.forEach((item) => {
      item.isDefault = false;
    });

    address.isDefault = true;
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "Address updated successfully",
    addresses: user.addresses,
  });
});

// =====================================================
// DELETE ADDRESS
// DELETE /api/users/addresses/:id
// =====================================================
exports.deleteAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const address = user.addresses.id(req.params.id);

  if (!address) {
    return res.status(404).json({
      success: false,
      message: "Address not found",
    });
  }

  const wasDefault = address.isDefault;

  address.deleteOne();

  // ==========================================
  // If default address was deleted,
  // make first remaining address default
  // ==========================================

  if (
    wasDefault &&
    user.addresses.length > 0
  ) {
    user.addresses[0].isDefault = true;
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "Address deleted successfully",
    addresses: user.addresses,
  });
});

// =====================================================
// SET DEFAULT ADDRESS
// PUT /api/users/addresses/default/:id
// =====================================================
exports.setDefaultAddress = asyncHandler(
  async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const address = user.addresses.id(req.params.id);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    // ==========================================
    // Remove default from all addresses
    // ==========================================

    user.addresses.forEach((item) => {
      item.isDefault = false;
    });

    // ==========================================
    // Set selected address as default
    // ==========================================

    address.isDefault = true;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Default address updated successfully",
      addresses: user.addresses,
    });
  }
);