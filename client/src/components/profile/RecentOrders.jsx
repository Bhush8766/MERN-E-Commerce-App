import { Link } from "react-router-dom";
import { Package } from "lucide-react";

function RecentOrders({ orders = [] }) {
  const recentOrders = orders.slice(0, 5);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Shipped":
        return "bg-blue-100 text-blue-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      case "Processing":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold">
          Recent Orders
        </h2>

        <Link
          to="/my-orders"
          className="text-blue-600 hover:underline font-medium"
        >
          View All
        </Link>

      </div>

      {recentOrders.length === 0 ? (

        <div className="text-center py-12">

          <Package
            size={70}
            className="mx-auto text-gray-300"
          />

          <h3 className="text-xl font-semibold mt-4">
            No Orders Yet
          </h3>

          <p className="text-gray-500 mt-2">
            Start shopping to see your orders here.
          </p>

          <Link
            to="/shop"
            className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Shop Now
          </Link>

        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">
                  Order ID
                </th>

                <th className="text-left py-3">
                  Date
                </th>

                <th className="text-left py-3">
                  Items
                </th>

                <th className="text-left py-3">
                  Total
                </th>

                <th className="text-left py-3">
                  Status
                </th>

                <th className="text-center py-3">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {recentOrders.map((order) => (

                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="py-4 font-medium">
                    #{order._id.slice(-8)}
                  </td>

                  <td className="py-4">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="py-4">
                    {order.products?.length || 0}
                  </td>

                  <td className="py-4 font-semibold text-blue-600">
                    ₹{order.totalPrice}
                  </td>

                  <td className="py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>

                  </td>

                  <td className="py-4 text-center">

                    <Link
                      to={`/order/${order._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      View
                    </Link>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}

export default RecentOrders;