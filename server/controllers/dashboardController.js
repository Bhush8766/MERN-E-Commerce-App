const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const Brand = require("../models/brandModel");
const Order = require("../models/orderModel");
const Review = require("../models/reviewModel");

// ===============================================
// Admin Dashboard
// GET /api/dashboard/admin
// ===============================================
exports.adminDashboard = asyncHandler(async (req, res) => {

    const totalUsers = await User.countDocuments();

    const totalProducts = await Product.countDocuments();

    const totalCategories = await Category.countDocuments();

    const totalBrands = await Brand.countDocuments();

    const totalOrders = await Order.countDocuments();

    const deliveredOrders = await Order.find({
        orderStatus: "Delivered"
    });

    const totalRevenue = deliveredOrders.reduce(
        (sum, order) => sum + order.totalPrice,
        0
    );

    const recentOrders = await Order.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 })
        .limit(5);

    const lowStockProducts = await Product.find({
        stock: { $lte: 5 }
    });

    res.status(200).json({
        success: true,

        statistics: {
            totalUsers,
            totalProducts,
            totalCategories,
            totalBrands,
            totalOrders,
            totalRevenue,
        },

        lowStockProducts,

        recentOrders,
    });

});


// ===============================================
// Vendor Dashboard
// GET /api/dashboard/vendor
// ===============================================
exports.vendorDashboard = asyncHandler(async (req, res) => {

    const products = await Product.find({
        createdBy: req.user.id
    });

    const totalProducts = products.length;

    const productIds = products.map(p => p._id);

    const orders = await Order.find({
        "products.product": {
            $in: productIds
        }
    });

    let totalRevenue = 0;

    orders.forEach(order => {
        totalRevenue += order.totalPrice;
    });

    const totalReviews = await Review.countDocuments({
        product: {
            $in: productIds
        }
    });

    res.status(200).json({
        success: true,

        totalProducts,

        totalOrders: orders.length,

        totalRevenue,

        totalReviews,
    });

});


// ===============================================
// Customer Dashboard
// GET /api/dashboard/customer
// ===============================================
exports.customerDashboard = asyncHandler(async (req, res) => {

    const totalOrders = await Order.countDocuments({
        user: req.user.id
    });

    const pendingOrders = await Order.countDocuments({
        user: req.user.id,
        orderStatus: "Pending",
    });

    const deliveredOrders = await Order.countDocuments({
        user: req.user.id,
        orderStatus: "Delivered",
    });

    const cancelledOrders = await Order.countDocuments({
        user: req.user.id,
        orderStatus: "Cancelled",
    });

    const reviews = await Review.countDocuments({
        user: req.user.id
    });

    res.status(200).json({
        success: true,

        totalOrders,

        pendingOrders,

        deliveredOrders,

        cancelledOrders,

        totalReviews: reviews,
    });

});


// ===============================================
// Monthly Sales
// GET /api/dashboard/monthly-sales
// ===============================================
exports.monthlySales = asyncHandler(async (req, res) => {

    const sales = await Order.aggregate([
        {
            $match: {
                orderStatus: "Delivered"
            }
        },

        {
            $group: {

                _id: {
                    month: {
                        $month: "$createdAt"
                    }
                },

                revenue: {
                    $sum: "$totalPrice"
                },

                orders: {
                    $sum: 1
                }

            }
        },

        {
            $sort: {
                "_id.month": 1
            }
        }

    ]);

    res.status(200).json({
        success: true,
        sales,
    });

});


// ===============================================
// Top Selling Products
// GET /api/dashboard/top-products
// ===============================================
exports.topProducts = asyncHandler(async (req, res) => {

    const products = await Product.find()
        .sort({
            sold: -1
        })
        .limit(10);

    res.status(200).json({
        success: true,
        products,
    });

});


// ===============================================
// Recent Orders
// GET /api/dashboard/recent-orders
// ===============================================
exports.recentOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find()
        .populate("user", "name email")
        .sort({
            createdAt: -1
        })
        .limit(10);

    res.status(200).json({
        success: true,
        orders,
    });

});