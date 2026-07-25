import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getOrderDetails } from "../redux/orderSlice";

function OrderDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { order, loading } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  if (loading || !order) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading Order...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-5">

        <div className="bg-white rounded-xl shadow p-6 mb-6">

  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

    <div>

      <h1 className="text-3xl font-bold">
        Order #{order._id.slice(-8)}
      </h1>

      <p className="text-gray-500 mt-2">
        {new Date(order.createdAt).toLocaleString()}
      </p>

    </div>

    <span
      className={`px-5 py-2 rounded-full text-white font-semibold

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



<div className="bg-white rounded-xl shadow p-6 mb-6">

  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

    <div>

      <h1 className="text-3xl font-bold">
        Order #{order._id.slice(-8)}
      </h1>

      <p className="text-gray-500 mt-2">
        {new Date(order.createdAt).toLocaleString()}
      </p>

    </div>

    <span
      className={`px-5 py-2 rounded-full text-white font-semibold

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






<div className="bg-white rounded-xl shadow p-6 mb-6">

  <h2 className="text-2xl font-bold mb-6">
    Ordered Products
  </h2>

  <div className="space-y-6">

    {order.products.map((item) => (

      <div
        key={item._id}
        className="flex flex-col md:flex-row gap-5 border-b pb-5"
      >

        <img
          src={
            item.image
              ? item.image.startsWith("http")
                ? item.image
                : `http://localhost:5000/${item.image.replace(/\\/g, "/")}`
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

          {item.color && (
            <p className="text-gray-500">
              Color : {item.color}
            </p>
          )}

          {item.size && (
            <p className="text-gray-500">
              Size : {item.size}
            </p>
          )}

        </div>

        <div className="text-right">

          <p className="text-2xl font-bold text-blue-600">
            ₹{item.subtotal}
          </p>

          <p className="text-gray-500">
            ₹{item.price} × {item.quantity}
          </p>

        </div>

      </div>

    ))}

  </div>

</div>







<div className="bg-white rounded-xl shadow p-6 mb-6">

  <h2 className="text-2xl font-bold mb-6">
    Price Details
  </h2>

  <div className="space-y-4">

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







<div className="bg-white rounded-xl shadow p-6">

  <h2 className="text-2xl font-bold mb-6">
    Order Progress
  </h2>

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
          order.orderStatus === "Pending"
            ? "bg-yellow-500"
            : "bg-green-500"
        }
        `}
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
          ["Shipped", "Delivered"].includes(order.orderStatus)
            ? "bg-green-500"
            : "bg-gray-300"
        }
        `}
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
        }
        `}
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