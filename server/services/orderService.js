const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const calculatePrice = require("../utils/calculatePrice");

class OrderService {
  static async createOrder(userId, shippingAddress, paymentMethod) {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    const items = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const priceDetails = calculatePrice({
      items,
      shippingCharge: 50,
      taxRate: 18,
    });

    const order = await Order.create({
      user: userId,
      orderItems: items,
      shippingAddress,
      paymentMethod,
      itemsPrice: priceDetails.subTotal,
      taxPrice: priceDetails.tax,
      shippingPrice: priceDetails.shippingCharge,
      totalPrice: priceDetails.total,
      orderStatus: "Pending",
    });

    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }

    cart.items = [];
    await cart.save();

    return order;
  }

  static async cancelOrder(order) {
    if (order.orderStatus === "Delivered") {
      throw new Error("Delivered order cannot be cancelled");
    }

    order.orderStatus = "Cancelled";
    await order.save();

    return order;
  }
}

module.exports = OrderService;