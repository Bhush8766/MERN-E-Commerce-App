import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import {
  Package,
  MapPin,
  CreditCard,
  Truck,
  ArrowLeft,
} from "lucide-react";

import { getOrderDetails } from "../redux/orderSlice";

function OrderDetails() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const {
    order,
    loading,
    error,
  } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading Order...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600 text-xl">
        {error}
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Order not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-7xl mx-auto px-5">

        {/* Back Button */}

        <Link
          to="/my-orders"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft size={18} />
          Back to My Orders
        </Link>

        {/* Header */}

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">

          <div className="flex flex-col md:flex-row justify-between gap-4">

            <div>

              <h1 className="text-3xl font-bold">
                Order #{order._id.slice(-8)}
              </h1>

              <p className="text-gray-500 mt-2">
                {new Date(order.createdAt).toLocaleString()}
              </p>

            </div>

            <div>

              <span
                className={`px-5 py-2 rounded-full text-white font-semibold

                ${
                  order.orderStatus === "Delivered"
                    ? "bg-green-600"
                    : order.orderStatus === "Cancelled"
                    ? "bg-red-600"
                    : order.orderStatus === "Shipped"
                    ? "bg-blue-600"
                    : "bg-yellow-500"
                }`}
              >
                {order.orderStatus}
              </span>

            </div>

          </div>

        </div>

        {/* Shipping + Payment */}

        <div className="grid md:grid-cols-2 gap-6 mb-6">

          {/* Shipping */}

          <div className="bg-white rounded-xl shadow-lg p-6">

            <div className="flex items-center gap-2 mb-5">

              <MapPin className="text-blue-600" />

              <h2 className="text-2xl font-bold">
                Shipping Address
              </h2>

            </div>

            <p className="font-semibold">
              {order.shippingAddress.fullName}
            </p>

            <p>{order.shippingAddress.phone}</p>

            <p>{order.shippingAddress.address}</p>

            <p>
              {order.shippingAddress.city},{" "}
              {order.shippingAddress.state}
            </p>

            <p>
              {order.shippingAddress.country} -{" "}
              {order.shippingAddress.pincode}
            </p>

          </div>

          {/* Payment */}

          <div className="bg-white rounded-xl shadow-lg p-6">

            <div className="flex items-center gap-2 mb-5">

              <CreditCard className="text-green-600" />

              <h2 className="text-2xl font-bold">
                Payment
              </h2>

            </div>

            <p>

              <strong>Method:</strong>{" "}

              {order.paymentMethod}

            </p>

            <p className="mt-3">

              <strong>Status:</strong>{" "}

              <span
                className={`font-semibold

                ${
                  order.paymentStatus === "Paid"
                    ? "text-green-600"
                    : "text-orange-500"
                }`}
              >
                {order.paymentStatus}
              </span>

            </p>

          </div>

        </div>

        {/* Products */}

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">

          <div className="flex items-center gap-2 mb-6">

            <Package className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              Ordered Products
            </h2>

          </div>

          <div className="space-y-5">

            {order.products.map((item, index) => (

              <div
                key={index}
                className="flex flex-col md:flex-row gap-5 border-b pb-5"
              >

                <img
                  src={
                    item.image
                      ? item.image.startsWith("http")
                        ? item.image
                        : `http://localhost:5000/${item.image.replace(
                            /\\/g,
                            "/"
                          )}`
                      : "https://via.placeholder.com/120"
                  }
                  alt={item.name}
                  className="w-28 h-28 rounded-lg object-cover border"
                />

                <div className="flex-1">

                  <h3 className="text-xl font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Quantity : {item.quantity}
                  </p>

                  <p className="text-gray-500">
                    Price : ₹{item.price}
                  </p>

                  {item.color && (
                    <p>Color : {item.color}</p>
                  )}

                  {item.size && (
                    <p>Size : {item.size}</p>
                  )}

                </div>

                <div className="text-right">

                  <p className="text-2xl font-bold text-blue-600">
                    ₹{item.subtotal}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Price Details */}

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">

          <h2 className="text-2xl font-bold mb-5">
            Price Details
          </h2>

          <div className="space-y-3">

            <div className="flex justify-between">

              <span>Items Price</span>

              <span>₹{order.itemsPrice}</span>

            </div>

            <div className="flex justify-between">

              <span>Shipping</span>

              <span>₹{order.shippingPrice}</span>

            </div>

            <div className="flex justify-between">

              <span>Tax</span>

              <span>₹{order.taxPrice}</span>

            </div>

            <hr />

            <div className="flex justify-between text-2xl font-bold text-blue-600">

              <span>Total</span>

              <span>₹{order.totalPrice}</span>

            </div>

          </div>

        </div>

        {/* Tracking */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <div className="flex items-center gap-2 mb-6">

            <Truck className="text-orange-500" />

            <h2 className="text-2xl font-bold">
              Order Progress
            </h2>

          </div>

          <div className="grid grid-cols-4 gap-4 text-center">

            <div>

              <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto">
                ✓
              </div>

              <p className="mt-2">
                Ordered
              </p>

            </div>

            <div>

              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto text-white

                ${
                  ["Processing","Shipped","Delivered"].includes(order.orderStatus)
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              >
                ✓
              </div>

              <p className="mt-2">
                Processing
              </p>

            </div>

            <div>

              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto text-white

                ${
                  ["Shipped","Delivered"].includes(order.orderStatus)
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              >
                ✓
              </div>

              <p className="mt-2">
                Shipped
              </p>

            </div>

            <div>

              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto text-white

                ${
                  order.orderStatus === "Delivered"
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              >
                ✓
              </div>

              <p className="mt-2">
                Delivered
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default OrderDetails;