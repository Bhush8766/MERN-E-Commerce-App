const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// ======================================================
// CREATE PRODUCT
// ======================================================
exports.createProduct = asyncHandler(async (req, res) => {
  console.log("========== CREATE PRODUCT ==========");
  console.log("BODY:", req.body);
  console.log("FILES:", req.files);
  console.log("USER:", req.user);

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
    featured,
  } = req.body;

  // ======================================================
  // REQUIRED FIELDS
  // ======================================================

  if (!title || !description || !category || !brand) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields",
    });
  }

  // ======================================================
  // CHECK DUPLICATE TITLE
  // ======================================================

  const productExists = await Product.findOne({
    title: title.trim(),
  });

  if (productExists) {
    return res.status(400).json({
      success: false,
      message: "Product already exists",
    });
  }

  // ======================================================
  // GENERATE SLUG
  // ======================================================

  const slug = title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

  // ======================================================
  // CHECK DUPLICATE SLUG
  // ======================================================

  const slugExists = await Product.findOne({ slug });

  if (slugExists) {
    return res.status(400).json({
      success: false,
      message: "Product with this name already exists",
    });
  }

  // ======================================================
  // GENERATE SKU
  // ======================================================

  const sku =
    "SKU-" +
    Date.now() +
    "-" +
    Math.floor(Math.random() * 1000);

  // ======================================================
  // THUMBNAIL
  // ======================================================

  const thumbnailFile =
    req.files?.thumbnail?.[0];

  // ======================================================
  // CREATE PRODUCT
  // ======================================================

  const product = await Product.create({
    title: title.trim(),

    slug,

    sku,

    description,

    shortDescription:
      shortDescription || "",

    category,

    brand,

    price:
      price !== undefined && price !== ""
        ? Number(price)
        : 0,

    stock:
      stock !== undefined && stock !== ""
        ? Number(stock)
        : 0,

    discountPrice:
      discountPrice !== undefined &&
      discountPrice !== ""
        ? Number(discountPrice)
        : 0,

    costPrice:
      costPrice !== undefined &&
      costPrice !== ""
        ? Number(costPrice)
        : 0,

    colors,

    sizes,

    tags,

    shippingCharge:
      shippingCharge !== undefined &&
      shippingCharge !== ""
        ? Number(shippingCharge)
        : 0,

    freeShipping:
      freeShipping === true ||
      freeShipping === "true",

    weight:
      weight !== undefined && weight !== ""
        ? Number(weight)
        : 0,

    warranty:
      warranty || "",

    returnPolicy:
      returnPolicy || "",

    website:
      website || "",

    featured:
      featured === true ||
      featured === "true",

    thumbnail: {
      public_id: "",
      url: thumbnailFile
        ? thumbnailFile.path
        : "",
    },

    createdBy:
      req.user
        ? req.user._id
        : null,
  });

  // ======================================================
  // RESPONSE
  // ======================================================

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});


// ======================================================
// GET ALL PRODUCTS
// ======================================================
exports.getProducts = asyncHandler(
  async (req, res) => {

    const products =
      await Product.find()
        .populate("category")
        .populate("brand")
        .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  }
);


// ======================================================
// GET PRODUCT BY ID
// ======================================================
exports.getProductById = asyncHandler(
  async (req, res) => {

    const product =
      await Product.findById(
        req.params.id
      )
        .populate("category")
        .populate("brand");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  }
);


// ======================================================
// GET PRODUCT BY SLUG
// ======================================================
exports.getProductBySlug = asyncHandler(
  async (req, res) => {

    const product =
      await Product.findOne({
        slug: req.params.slug,
      })
        .populate("category")
        .populate("brand");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  }
);


// ======================================================
// SEARCH PRODUCTS
// ======================================================
exports.searchProducts = asyncHandler(
  async (req, res) => {

    const keyword =
      req.query.keyword || "";

    const products =
      await Product.find({
        title: {
          $regex: keyword,
          $options: "i",
        },
      })
        .populate("category")
        .populate("brand");

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  }
);


// ======================================================
// FILTER PRODUCTS
// ======================================================
exports.filterProducts = asyncHandler(
  async (req, res) => {

    const {
      category,
      brand,
      minPrice,
      maxPrice,
      minStock,
      maxStock,
      featured,
    } = req.query;

    const filter = {};

    // Category
    if (category) {
      filter.category = category;
    }

    // Brand
    if (brand) {
      filter.brand = brand;
    }

    // Price
    if (
      minPrice !== undefined ||
      maxPrice !== undefined
    ) {
      filter.price = {};

      if (minPrice !== undefined) {
        filter.price.$gte =
          Number(minPrice);
      }

      if (maxPrice !== undefined) {
        filter.price.$lte =
          Number(maxPrice);
      }
    }

    // Stock
    if (
      minStock !== undefined ||
      maxStock !== undefined
    ) {
      filter.stock = {};

      if (minStock !== undefined) {
        filter.stock.$gte =
          Number(minStock);
      }

      if (maxStock !== undefined) {
        filter.stock.$lte =
          Number(maxStock);
      }
    }

    // Featured
    if (featured !== undefined) {
      filter.featured =
        featured === "true";
    }

    const products =
      await Product.find(filter)
        .populate("category")
        .populate("brand");

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  }
);


// ======================================================
// FEATURED PRODUCTS
// ======================================================
exports.getFeaturedProducts =
  asyncHandler(async (req, res) => {

    const products =
      await Product.find({
        featured: true,
      })
        .populate("category")
        .populate("brand")
        .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  });


// ======================================================
// LATEST PRODUCTS
// ======================================================
exports.getLatestProducts =
  asyncHandler(async (req, res) => {

    const products =
      await Product.find()
        .populate("category")
        .populate("brand")
        .sort({ createdAt: -1 })
        .limit(10);

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  });


// ======================================================
// RELATED PRODUCTS
// ======================================================
exports.getRelatedProducts =
  asyncHandler(async (req, res) => {

    const {
      category,
      brand,
      exclude,
    } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (brand) {
      filter.brand = brand;
    }

    if (exclude) {
      filter._id = {
        $ne: exclude,
      };
    }

    const products =
      await Product.find(filter)
        .populate("category")
        .populate("brand")
        .limit(4);

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  });


// ======================================================
// UPDATE PRODUCT
// ======================================================
exports.updateProduct =
  asyncHandler(async (req, res) => {

    console.log(
      "========== UPDATE PRODUCT =========="
    );

    console.log(
      "ID:",
      req.params.id
    );

    console.log(
      "BODY:",
      req.body
    );

    console.log(
      "FILES:",
      req.files
    );

    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ======================================================
    // TITLE + SLUG
    // ======================================================

    if (
      req.body.title &&
      req.body.title.trim() !== product.title
    ) {

      const newTitle =
        req.body.title.trim();

      const duplicate =
        await Product.findOne({
          title: newTitle,
          _id: {
            $ne: product._id,
          },
        });

      if (duplicate) {
        return res.status(400).json({
          success: false,
          message:
            "Product with this title already exists",
        });
      }

      product.title = newTitle;

      product.slug =
        newTitle
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, "");
    }

    // ======================================================
    // BASIC FIELDS
    // ======================================================

    if (
      req.body.description !== undefined
    ) {
      product.description =
        req.body.description;
    }

    if (
      req.body.shortDescription !==
      undefined
    ) {
      product.shortDescription =
        req.body.shortDescription;
    }

    if (
      req.body.category !== undefined
    ) {
      product.category =
        req.body.category;
    }

    if (
      req.body.brand !== undefined
    ) {
      product.brand =
        req.body.brand;
    }

    // ======================================================
    // NUMERIC FIELDS
    // ======================================================

    if (
      req.body.price !== undefined &&
      req.body.price !== ""
    ) {
      product.price =
        Number(req.body.price);
    }

    if (
      req.body.stock !== undefined &&
      req.body.stock !== ""
    ) {
      product.stock =
        Number(req.body.stock);
    }

    if (
      req.body.discountPrice !==
        undefined &&
      req.body.discountPrice !== ""
    ) {
      product.discountPrice =
        Number(req.body.discountPrice);
    }

    if (
      req.body.costPrice !== undefined &&
      req.body.costPrice !== ""
    ) {
      product.costPrice =
        Number(req.body.costPrice);
    }

    if (
      req.body.shippingCharge !==
        undefined &&
      req.body.shippingCharge !== ""
    ) {
      product.shippingCharge =
        Number(req.body.shippingCharge);
    }

    if (
      req.body.weight !== undefined &&
      req.body.weight !== ""
    ) {
      product.weight =
        Number(req.body.weight);
    }

    // ======================================================
    // OTHER FIELDS
    // ======================================================

    if (
      req.body.colors !== undefined
    ) {
      product.colors =
        req.body.colors;
    }

    if (
      req.body.sizes !== undefined
    ) {
      product.sizes =
        req.body.sizes;
    }

    if (
      req.body.tags !== undefined
    ) {
      product.tags =
        req.body.tags;
    }

    if (
      req.body.warranty !== undefined
    ) {
      product.warranty =
        req.body.warranty;
    }

    if (
      req.body.returnPolicy !==
      undefined
    ) {
      product.returnPolicy =
        req.body.returnPolicy;
    }

    if (
      req.body.website !== undefined
    ) {
      product.website =
        req.body.website;
    }

    if (
      req.body.freeShipping !==
      undefined
    ) {
      product.freeShipping =
        req.body.freeShipping === true ||
        req.body.freeShipping === "true";
    }

    if (
      req.body.featured !== undefined
    ) {
      product.featured =
        req.body.featured === true ||
        req.body.featured === "true";
    }

    // ======================================================
    // UPDATE THUMBNAIL
    // ======================================================

    const thumbnailFile =
      req.files?.thumbnail?.[0];

    if (thumbnailFile) {

      product.thumbnail = {
        public_id: "",
        url: thumbnailFile.path,
      };
    }

    // ======================================================
    // SAVE
    // ======================================================

    await product.save();

    res.status(200).json({
      success: true,
      message:
        "Product updated successfully",
      product,
    });
  });


// ======================================================
// DELETE PRODUCT
// ======================================================
exports.deleteProduct =
  asyncHandler(async (req, res) => {

    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  });


// ======================================================
// UPDATE PRODUCT STOCK
// ======================================================
exports.updateProductStock =
  asyncHandler(async (req, res) => {

    const {
      stock,
    } = req.body;

    if (
      stock === undefined ||
      stock === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Stock is required",
      });
    }

    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.stock =
      Number(stock);

    await product.save();

    res.status(200).json({
      success: true,
      message:
        "Product stock updated successfully",
      product,
    });
  });


// ======================================================
// UPLOAD PRODUCT IMAGES
// ======================================================
exports.uploadProductImages =
  asyncHandler(async (req, res) => {

    console.log(
      "PRODUCT IMAGES:",
      req.files
    );

    res.status(200).json({
      success: true,
      message: "Images uploaded",
      files: req.files || [],
    });
  });


// ======================================================
// DELETE PRODUCT IMAGE
// ======================================================
exports.deleteProductImage =
  asyncHandler(async (req, res) => {

    const {
      imageId,
    } = req.body;

    console.log(
      "DELETE IMAGE:",
      imageId
    );

    res.status(200).json({
      success: true,
      message: "Image deleted",
    });
  });


// ======================================================
// LOW STOCK PRODUCTS
// ======================================================
exports.getLowStockProducts =
  asyncHandler(async (req, res) => {

    const products =
      await Product.find({
        stock: {
          $lte: 5,
        },
      })
        .populate("category")
        .populate("brand")
        .sort({ stock: 1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  });


// ======================================================
// OUT OF STOCK PRODUCTS
// ======================================================
exports.getOutOfStockProducts =
  asyncHandler(async (req, res) => {

    const products =
      await Product.find({
        stock: 0,
      })
        .populate("category")
        .populate("brand");

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  });


// ======================================================
// PRODUCT STATISTICS
// ======================================================
exports.getAdminProductStats =
  asyncHandler(async (req, res) => {

    const totalProducts =
      await Product.countDocuments();

    const lowStockProducts =
      await Product.countDocuments({
        stock: {
          $lte: 5,
        },
      });

    const outOfStockProducts =
      await Product.countDocuments({
        stock: 0,
      });

    const featuredProducts =
      await Product.countDocuments({
        featured: true,
      });

    res.status(200).json({
      success: true,

      totalProducts,

      lowStockProducts,

      outOfStockProducts,

      featuredProducts,
    });
  });


// ======================================================
// BULK DELETE PRODUCTS
// ======================================================
exports.bulkDeleteProducts =
  asyncHandler(async (req, res) => {

    const {
      ids,
    } = req.body;

    if (
      !Array.isArray(ids) ||
      ids.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Product IDs are required",
      });
    }

    const result =
      await Product.deleteMany({
        _id: {
          $in: ids,
        },
      });

    res.status(200).json({
      success: true,
      message:
        "Products deleted successfully",

      deletedCount:
        result.deletedCount,
    });
  });