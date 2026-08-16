const asyncHandler = require("express-async-handler");

const Product = require("../models/productModel");

// ======================================================
// HELPER FUNCTIONS
// ======================================================

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

const generateSKU = () => {
  return (
    "SKU-" +
    Date.now() +
    "-" +
    Math.floor(Math.random() * 1000)
  );
};

const convertToArray = (value) => {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);

      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (error) {
      // Not JSON
    }

    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const toNumber = (value, defaultValue = 0) => {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return defaultValue;
  }

  const number = Number(value);

  return Number.isNaN(number)
    ? defaultValue
    : number;
};

const toBoolean = (value) => {
  return (
    value === true ||
    value === "true" ||
    value === 1 ||
    value === "1"
  );
};

// ======================================================
// VENDOR DASHBOARD
// ======================================================

exports.getVendorDashboard = asyncHandler(
  async (req, res) => {
    const vendorId = req.user._id;

    const totalProducts =
      await Product.countDocuments({
        createdBy: vendorId,
      });

    res.status(200).json({
      success: true,

      dashboard: {
        totalProducts,

        totalOrders: 0,

        totalSales: 0,

        pendingOrders: 0,

        deliveredOrders: 0,
      },
    });
  }
);

// ======================================================
// GET VENDOR PRODUCTS
// ======================================================

exports.getVendorProducts = asyncHandler(
  async (req, res) => {
    const products =
      await Product.find({
        createdBy: req.user._id,
      })
        .populate("category")
        .populate("brand")
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,

      count: products.length,

      products,
    });
  }
);

// ======================================================
// GET SINGLE VENDOR PRODUCT
// ======================================================

exports.getVendorProduct = asyncHandler(
  async (req, res) => {
    const product =
      await Product.findOne({
        _id: req.params.id,

        createdBy: req.user._id,
      })
        .populate("category")
        .populate("brand");

    if (!product) {
      return res.status(404).json({
        success: false,

        message:
          "Product not found or you are not authorized to access it",
      });
    }

    res.status(200).json({
      success: true,

      product,
    });
  }
);

// ======================================================
// CREATE VENDOR PRODUCT
// ======================================================

exports.createVendorProduct = asyncHandler(
  async (req, res) => {
    console.log(
      "===================================="
    );

    console.log(
      "CREATE VENDOR PRODUCT"
    );

    console.log(
      "USER:",
      req.user
    );

    console.log(
      "BODY:",
      req.body
    );

    console.log(
      "FILES:",
      req.files
    );

    console.log(
      "===================================="
    );

    // --------------------------------------------------
    // Authentication check
    // --------------------------------------------------

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User is not authenticated",
      });
    }

    // --------------------------------------------------
    // Get request body
    // --------------------------------------------------

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

    // --------------------------------------------------
    // Required fields
    // --------------------------------------------------

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Product title is required",
      });
    }

    if (!description) {
      return res.status(400).json({
        success: false,
        message:
          "Product description is required",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message:
          "Product category is required",
      });
    }

    if (!brand) {
      return res.status(400).json({
        success: false,
        message:
          "Product brand is required",
      });
    }

    // --------------------------------------------------
    // Duplicate title
    // --------------------------------------------------

    const productExists =
      await Product.findOne({
        title: title.trim(),
      });

    if (productExists) {
      return res.status(400).json({
        success: false,
        message:
          "Product with this title already exists",
      });
    }

    // --------------------------------------------------
    // Generate slug
    // --------------------------------------------------

    const slug =
      generateSlug(title);

    // --------------------------------------------------
    // Generate SKU
    // --------------------------------------------------

    const sku =
      generateSKU();

    // --------------------------------------------------
    // Thumbnail
    // --------------------------------------------------

    let thumbnail = {
      public_id: "",
      url: "",
    };

    const thumbnailFile =
      req.files?.thumbnail?.[0];

    if (thumbnailFile) {
      thumbnail = {
        public_id:
          thumbnailFile.filename ||
          thumbnailFile.originalname ||
          "",

        url:
          thumbnailFile.path ||
          thumbnailFile.location ||
          "",
      };
    }

    // --------------------------------------------------
    // Convert numbers
    // --------------------------------------------------

    const parsedPrice =
      toNumber(price);

    const parsedStock =
      toNumber(stock);

    const parsedDiscountPrice =
      toNumber(discountPrice);

    const parsedCostPrice =
      toNumber(costPrice);

    const parsedShippingCharge =
      toNumber(shippingCharge);

    const parsedWeight =
      toNumber(weight);

    // --------------------------------------------------
    // Create Product
    // --------------------------------------------------

    const product =
      await Product.create({
        title: title.trim(),

        slug,

        sku,

        description,

        shortDescription:
          shortDescription || "",

        category,

        brand,

        price: parsedPrice,

        stock: parsedStock,

        discountPrice:
          parsedDiscountPrice,

        costPrice:
          parsedCostPrice,

        colors:
          convertToArray(colors),

        sizes:
          convertToArray(sizes),

        tags:
          convertToArray(tags),

        shippingCharge:
          parsedShippingCharge,

        freeShipping:
          toBoolean(freeShipping),

        weight:
          parsedWeight,

        warranty:
          warranty || "",

        returnPolicy:
          returnPolicy || "",

        website:
          website || "",

        thumbnail,

        createdBy:
          req.user._id,
      });

    // --------------------------------------------------
    // Response
    // --------------------------------------------------

    return res.status(201).json({
      success: true,

      message:
        "Vendor product created successfully",

      product,
    });
  }
);

// ======================================================
// UPDATE VENDOR PRODUCT
// ======================================================

exports.updateVendorProduct = asyncHandler(
  async (req, res) => {
    const product =
      await Product.findOne({
        _id: req.params.id,

        createdBy: req.user._id,
      });

    if (!product) {
      return res.status(404).json({
        success: false,

        message:
          "Product not found or you are not authorized",
      });
    }

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

    // --------------------------------------------------
    // TITLE
    // --------------------------------------------------

    if (title !== undefined) {
      product.title =
        title.trim();

      product.slug =
        generateSlug(title);
    }

    // --------------------------------------------------
    // DESCRIPTION
    // --------------------------------------------------

    if (
      description !== undefined
    ) {
      product.description =
        description;
    }

    if (
      shortDescription !==
      undefined
    ) {
      product.shortDescription =
        shortDescription;
    }

    // --------------------------------------------------
    // CATEGORY / BRAND
    // --------------------------------------------------

    if (category !== undefined) {
      product.category =
        category;
    }

    if (brand !== undefined) {
      product.brand =
        brand;
    }

    // --------------------------------------------------
    // PRICING
    // --------------------------------------------------

    if (price !== undefined) {
      product.price =
        toNumber(price);
    }

    if (stock !== undefined) {
      product.stock =
        toNumber(stock);
    }

    if (
      discountPrice !==
      undefined
    ) {
      product.discountPrice =
        toNumber(
          discountPrice
        );
    }

    if (
      costPrice !== undefined
    ) {
      product.costPrice =
        toNumber(costPrice);
    }

    // --------------------------------------------------
    // OPTIONS
    // --------------------------------------------------

    if (colors !== undefined) {
      product.colors =
        convertToArray(colors);
    }

    if (sizes !== undefined) {
      product.sizes =
        convertToArray(sizes);
    }

    if (tags !== undefined) {
      product.tags =
        convertToArray(tags);
    }

    // --------------------------------------------------
    // SHIPPING
    // --------------------------------------------------

    if (
      shippingCharge !==
      undefined
    ) {
      product.shippingCharge =
        toNumber(
          shippingCharge
        );
    }

    if (
      freeShipping !==
      undefined
    ) {
      product.freeShipping =
        toBoolean(
          freeShipping
        );
    }

    if (weight !== undefined) {
      product.weight =
        toNumber(weight);
    }

    // --------------------------------------------------
    // OTHER
    // --------------------------------------------------

    if (
      warranty !== undefined
    ) {
      product.warranty =
        warranty;
    }

    if (
      returnPolicy !==
      undefined
    ) {
      product.returnPolicy =
        returnPolicy;
    }

    if (website !== undefined) {
      product.website =
        website;
    }

    // --------------------------------------------------
    // THUMBNAIL
    // --------------------------------------------------

    const thumbnailFile =
      req.files?.thumbnail?.[0];

    if (thumbnailFile) {
      product.thumbnail = {
        public_id:
          thumbnailFile.filename ||
          thumbnailFile.originalname ||
          "",

        url:
          thumbnailFile.path ||
          thumbnailFile.location ||
          "",
      };
    }

    // --------------------------------------------------
    // SAVE
    // --------------------------------------------------

    await product.save();

    res.status(200).json({
      success: true,

      message:
        "Vendor product updated successfully",

      product,
    });
  }
);

// ======================================================
// DELETE VENDOR PRODUCT
// ======================================================

exports.deleteVendorProduct =
  asyncHandler(
    async (req, res) => {
      const product =
        await Product.findOne({
          _id: req.params.id,

          createdBy:
            req.user._id,
        });

      if (!product) {
        return res.status(404).json({
          success: false,

          message:
            "Product not found or you are not authorized",
        });
      }

      await Product.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,

        message:
          "Vendor product deleted successfully",

        productId:
          req.params.id,
      });
    }
  );

// ======================================================
// VENDOR ORDERS
// ======================================================

exports.getVendorOrders =
  asyncHandler(
    async (req, res) => {
      res.status(200).json({
        success: true,

        orders: [],
      });
    }
  );

// ======================================================
// VENDOR EARNINGS
// ======================================================

exports.getVendorEarnings =
  asyncHandler(
    async (req, res) => {
      res.status(200).json({
        success: true,

        totalEarnings: 0,
      });
    }
  );