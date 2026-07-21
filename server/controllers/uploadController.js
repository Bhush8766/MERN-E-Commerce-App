const asyncHandler = require("express-async-handler");
const cloudinary = require("../config/cloudinary");

// =============================================
// Upload Single Image
// POST /api/upload/single
// =============================================
exports.uploadSingleImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload an image",
    });
  }

  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "MERN-E-Commerce",
    resource_type: "image",
  });

  res.status(200).json({
    success: true,
    message: "Image uploaded successfully",
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });
});

// =============================================
// Upload Multiple Images
// POST /api/upload/multiple
// =============================================
exports.uploadMultipleImages = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please upload images",
    });
  }

  const images = [];

  for (const file of req.files) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "MERN-E-Commerce",
      resource_type: "image",
    });

    images.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  res.status(200).json({
    success: true,
    message: "Images uploaded successfully",
    images,
  });
});

// =============================================
// Upload Profile Image
// POST /api/upload/profile
// =============================================
exports.uploadProfileImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload profile image",
    });
  }

  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "MERN-E-Commerce/Profile",
  });

  res.status(200).json({
    success: true,
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });
});

// =============================================
// Upload Product Images
// POST /api/upload/product
// =============================================
exports.uploadProductImages = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please upload product images",
    });
  }

  const images = [];

  for (const file of req.files) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "MERN-E-Commerce/Products",
    });

    images.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  res.status(200).json({
    success: true,
    images,
  });
});

// =============================================
// Upload Brand Logo
// POST /api/upload/brand
// =============================================
exports.uploadBrandLogo = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload brand logo",
    });
  }

  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "MERN-E-Commerce/Brands",
  });

  res.status(200).json({
    success: true,
    logo: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });
});

// =============================================
// Upload Category Image
// POST /api/upload/category
// =============================================
exports.uploadCategoryImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload category image",
    });
  }

  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "MERN-E-Commerce/Categories",
  });

  res.status(200).json({
    success: true,
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });
});

// =============================================
// Delete Image
// DELETE /api/upload/:publicId
// =============================================
exports.deleteImage = asyncHandler(async (req, res) => {
  const { publicId } = req.params;

  const result = await cloudinary.uploader.destroy(publicId);

  if (result.result !== "ok") {
    return res.status(404).json({
      success: false,
      message: "Image not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Image deleted successfully",
  });
});