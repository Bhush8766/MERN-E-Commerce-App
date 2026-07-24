const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// Create Product
exports.createProduct = asyncHandler(async (req, res) => {

   console.log("BODY:", req.body);
  console.log("FILES:", req.files);

  
  const {
    title,
    description,
    shortDescription,
    category,
    brand,
    price,
    stock,
    discountPrice,
    costPrice,
    colors,
    sizes,
    tags,
    shippingCharge,
    freeShipping,
    weight,
    warranty,
    returnPolicy,
    website,
  } = req.body;

  // Check required fields
  if (!title || !description || !category || !brand) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields",
    });
  }

  // Check duplicate title
  const productExists = await Product.findOne({ title });

  if (productExists) {
    return res.status(400).json({
      success: false,
      message: "Product already exists",
    });
  }

  // Generate slug
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

  // Generate SKU
  const sku =
    "SKU-" +
    Date.now() +
    "-" +
    Math.floor(Math.random() * 1000);

 const thumbnailFile = req.files?.thumbnail?.[0];

const product = await Product.create({
  title,
  slug,
  sku,

  description,
  shortDescription,

  category,
  brand,

  price,
  stock,

  discountPrice,
  costPrice,

  colors,
  sizes,
  tags,

  shippingCharge,
  freeShipping,
  weight,

  warranty,
  returnPolicy,

  thumbnail: {
    public_id: "",
    url: thumbnailFile ? thumbnailFile.path : "",
  },

  createdBy: req.user ? req.user._id : null,
});

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});

// Get All Products
exports.getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

// Get Product By ID
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.json({
    success: true,
    product,
  });
});

// Get Product By Slug
exports.getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    slug: req.params.slug,
  });

  res.json({
    success: true,
    product,
  });
});

// Search Products
exports.searchProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword || "";

  const products = await Product.find({
    title: {
      $regex: keyword,
      $options: "i",
    },
  });

  res.json({
    success: true,
    products,
  });
});

// Filter Products
exports.filterProducts = asyncHandler(async (req, res) => {
  const products = await Product.find(req.query);

  res.json({
    success: true,
    products,
  });
});

// Featured Products
exports.getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({
    featured: true,
  });

  res.json({
    success: true,
    products,
  });
});

// Latest Products
exports.getLatestProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort("-createdAt").limit(10);

  res.json({
    success: true,
    products,
  });
});

// Related Products
exports.getRelatedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().limit(4);

  res.json({
    success: true,
    products,
  });
});

// Update Product
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  if (req.body.title) {
    product.title = req.body.title;

    product.slug = req.body.title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  }

  product.description =
    req.body.description || product.description;

  product.shortDescription =
    req.body.shortDescription ||
    product.shortDescription;

  product.category =
    req.body.category || product.category;

  product.brand =
    req.body.brand || product.brand;

  product.price =
    req.body.price || product.price;

  product.stock =
    req.body.stock || product.stock;

  product.discountPrice =
    req.body.discountPrice || product.discountPrice;

  product.costPrice =
    req.body.costPrice || product.costPrice;

 const thumbnailFile = req.files?.thumbnail?.[0];

if (thumbnailFile) {
  product.thumbnail = {
    public_id: "",
    url: thumbnailFile.path,
  };
}

  await product.save();

  res.json({
    success: true,
    message: "Product updated successfully",
    product,
  });
});

// Delete Product
exports.deleteProduct = asyncHandler(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: "Product deleted",
  });
});

// Update Stock
exports.updateProductStock = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  product.stock = req.body.stock;

  await product.save();

  res.json({
    success: true,
    product,
  });
});

// Upload Images
exports.uploadProductImages = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: "Images uploaded",
  });
});

// Delete Image
exports.deleteProductImage = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: "Image deleted",
  });
});

// Low Stock
exports.getLowStockProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({
    stock: {
      $lte: 5,
    },
  });

  res.json({
    success: true,
    products,
  });
});

// Out Of Stock
exports.getOutOfStockProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({
    stock: 0,
  });

  res.json({
    success: true,
    products,
  });
});

// Product Statistics
exports.getAdminProductStats = asyncHandler(async (req, res) => {
  const totalProducts = await Product.countDocuments();

  res.json({
    success: true,
    totalProducts,
  });
});

// Bulk Delete
exports.bulkDeleteProducts = asyncHandler(async (req, res) => {
  await Product.deleteMany({
    _id: {
      $in: req.body.ids,
    },
  });

  res.json({
    success: true,
    message: "Products deleted",
  });
});