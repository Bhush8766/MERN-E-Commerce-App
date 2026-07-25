import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Package, Eye, XCircle, ShoppingBag } from "lucide-react";

import { getMyOrders, cancelOrder } from "../redux/orderSlice";

function MyOrders() {
  const dispatch = useDispatch();

  const {
    orders,
    loading,
  } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const handleCancel = (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    dispatch(cancelOrder(id)).then(() => {
      dispatch(getMyOrders());
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-xl font-semibold">
          Loading Orders...
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-5">

        <div className="flex items-center gap-3 mb-8">

          <ShoppingBag className="text-blue-600" size={32} />

          <h1 className="text-4xl font-bold">
            My Orders
          </h1>

        </div>

        {orders.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-12 text-center">

            <Package
              size={70}
              className="mx-auto text-gray-400"
            />

            <h2 className="text-2xl font-bold mt-5">
              No Orders Yet
            </h2>

            <p className="text-gray-500 mt-3">
              Start shopping and place your first order.
            </p>

            <Link
              to="/shop"
              className="inline-block mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg"
            >
              Shop Now
            </Link>

          </div>

        ) : (

          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order._id}
                className="bg-white rounded-xl shadow p-6"
              >
                <div className="flex justify-between flex-wrap gap-4">

                  <div>

                    <h3 className="font-bold text-lg">
                      Order #{order._id.slice(-8)}
                    </h3>

                    <p className="text-gray-500 mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>

                  </div>

                  <div>

                    <span
                      className={`px-4 py-2 rounded-full text-white text-sm

                      ${
                        order.orderStatus === "Delivered"
                          ? "bg-green-500"
                          : order.orderStatus === "Cancelled"
                          ? "bg-red-500"
                          : order.orderStatus === "Shipped"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }
                      `}
                    >
                      {order.orderStatus}
                    </span>

                  </div>

                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-6">

                  <div>

                    <p className="text-gray-500">
                      Total Items
                    </p>

                    <h3 className="font-semibold text-lg">
                      {order.totalItems}
                    </h3>

                  </div>

                  <div>

                    <p className="text-gray-500">
                      Payment
                    </p>

                    <h3 className="font-semibold text-lg">
                      {order.paymentMethod}
                    </h3>

                  </div>

                  <div>

                    <p className="text-gray-500">
                      Total Amount
                    </p>

                    <h3 className="font-bold text-blue-600 text-xl">
                      ₹{order.totalPrice}
                    </h3>

                  </div>

                </div>

                <div className="mt-6 flex gap-4 flex-wrap">

                  <Link
                    to={`/orders/${order._id}`}
                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg"
                  >
                    <Eye size={18} />
                    View Details
                  </Link>

                  {order.orderStatus === "Pending" && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-lg"
                    >
                      <XCircle size={18} />
                      Cancel Order
                    </button>
                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </div>
  );
}

export default MyOrders;