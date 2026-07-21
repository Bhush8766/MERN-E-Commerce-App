const asyncHandler = require("express-async-handler");
const Brand = require("../models/brandModel");

// ======================================
// Create Brand
// POST /api/brands
// ======================================
exports.createBrand = asyncHandler(async (req, res) => {
  const { name, description, website, country } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Brand name is required",
    });
  }

  const brandExists = await Brand.findOne({ name });

  if (brandExists) {
    return res.status(400).json({
      success: false,
      message: "Brand already exists",
    });
  }

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

  const brand = await Brand.create({
    name,
    slug,
    description,
    website,
    country,
    logo: {
      public_id: "",
      url: req.file ? req.file.path : "",
    },
    createdBy: req.user ? req.user._id : null,
  });

  res.status(201).json({
    success: true,
    message: "Brand created successfully",
    brand,
  });
});

// ======================================
// Get All Brands
// GET /api/brands
// ======================================
exports.getBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    total: brands.length,
    brands,
  });
});

// ======================================
// Get Single Brand
// GET /api/brands/:id
// ======================================
exports.getBrandById = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    return res.status(404).json({
      success: false,
      message: "Brand not found",
    });
  }

  res.status(200).json({
    success: true,
    brand,
  });
});

// ======================================
// Update Brand
// PUT /api/brands/:id
// ======================================
exports.updateBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    return res.status(404).json({
      success: false,
      message: "Brand not found",
    });
  }

  if (req.body.name) {
    brand.name = req.body.name;

    brand.slug = req.body.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  }

  if (req.body.description) {
    brand.description = req.body.description;
  }

  if (req.body.website) {
    brand.website = req.body.website;
  }

  if (req.body.country) {
    brand.country = req.body.country;
  }

  if (req.file) {
    brand.logo = {
      public_id: "",
      url: req.file.path,
    };
  }

  await brand.save();

  res.status(200).json({
    success: true,
    message: "Brand updated successfully",
    brand,
  });
});

// ======================================
// Delete Brand
// DELETE /api/brands/:id
// ======================================
exports.deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    return res.status(404).json({
      success: false,
      message: "Brand not found",
    });
  }

  await brand.deleteOne();

  res.status(200).json({
    success: true,
    message: "Brand deleted successfully",
  });
});