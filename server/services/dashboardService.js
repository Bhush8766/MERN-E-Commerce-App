const User = require("../models/userModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const Category = require("../models/categoryModel");
const Brand = require("../models/brandModel");

class DashboardService {
  static async getStats() {
    const [
      totalUsers,
      totalProducts,
      totalOrders,
      totalCategories,
      totalBrands,
    ] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Category.countDocuments(),
      Brand.countDocuments(),
    ]);

    const revenue = await Order.aggregate([
      {
        $match: {
          orderStatus: "Delivered",
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    return {
      totalUsers,
      totalProducts,
      totalOrders,
      totalCategories,
      totalBrands,
      totalRevenue: revenue.length ? revenue[0].total : 0,
    };
  }

  static async recentOrders() {
    return await Order.find()
      .populate("user", "name email")
      .sort("-createdAt")
      .limit(10);
  }

  static async lowStockProducts() {
    return await Product.find({
      stock: { $lte: 5 },
    });
  }
}

module.exports = DashboardService;