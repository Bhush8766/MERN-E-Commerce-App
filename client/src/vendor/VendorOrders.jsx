import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  getVendorOrders,
} from "../redux/vendorSlice";

const VendorOrders = () => {
  const dispatch = useDispatch();

  const {
    orders,
    loading,
    error,
  } = useSelector(
    (state) => state.vendor
  );

  useEffect(() => {
    dispatch(getVendorOrders());
  }, [dispatch]);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Vendor Orders
        </h1>

        <p className="text-gray-500 mt-2">
          Orders containing your products.
        </p>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-20">
          Loading orders...
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          No orders found.
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow p-6"
            >
              <div className="flex flex-wrap justify-between gap-4 border-b pb-4">
                <div>
                  <p className="font-bold">
                    Order #{order._id}
                  </p>

                  <p className="text-sm text-gray-500">
                    {order.user?.name ||
                      "Customer"}
                  </p>
                </div>

                <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700">
                  {order.orderStatus}
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {order.products?.map(
                  (item, index) => (
                    <div
                      key={
                        item._id || index
                      }
                      className="flex justify-between border-b pb-3"
                    >
                      <div>
                        <p className="font-semibold">
                          {item.name ||
                            item.product?.title}
                        </p>

                        <p className="text-sm text-gray-500">
                          Qty:{" "}
                          {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold">
                        ₹
                        {Number(
                          item.price || 0
                        ) *
                          Number(
                            item.quantity ||
                              0
                          )}
                      </p>
                    </div>
                  )
                )}
              </div>

              <div className="flex justify-between mt-5">
                <span className="font-semibold">
                  Order Total
                </span>

                <span className="font-bold text-lg">
                  ₹{order.totalPrice}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorOrders;