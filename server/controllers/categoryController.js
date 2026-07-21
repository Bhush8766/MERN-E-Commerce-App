const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");

// ======================================
// Create Category
// POST /api/categories
// ======================================
exports.createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const categoryExists = await Category.findOne({ name });

  if (categoryExists) {
    return res.status(400).json({
      success: false,
      message: "Category already exists",
    });
  }

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

  const category = await Category.create({
    name,
    slug,
    description,
    image: {
      public_id: "",
      url: req.file ? req.file.path : "",
    },
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    category,
  });
});

// ======================================
// Get All Categories
// GET /api/categories
// ======================================
exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    total: categories.length,
    categories,
  });
});

// ======================================
// Get Single Category
// GET /api/categories/:id
// ======================================
exports.getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  res.status(200).json({
    success: true,
    category,
  });
});

// ======================================
// Update Category
// PUT /api/categories/:id
// ======================================
exports.updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  category.name = req.body.name || category.name;
  category.description = req.body.description || category.description;

  if (req.file) {
    category.image = req.file.path;
  }

  await category.save();

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    category,
  });
});

// ======================================
// Delete Category
// DELETE /api/categories/:id
// ======================================
exports.deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  await category.deleteOne();

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
})