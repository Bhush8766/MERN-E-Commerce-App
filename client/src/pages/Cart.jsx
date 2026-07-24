import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getCart,
  updateCart,
  removeCart,
} from "../redux/cartSlice";
    
function Cart() {
  const dispatch = useDispatch();

  const { items, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Loading Cart...</h2>
      </div>
    );
  }

  const total = items.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-8">
        Shopping Cart
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-20">

          <h2 className="text-2xl font-bold">
            Your Cart is Empty
          </h2>

          <Link to="/shop">
            <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg">
              Continue Shopping
            </button>
          </Link>

        </div>
      ) : (
        <>
          {items.map((item) => {

            const image =
              item.product?.thumbnail?.url
                ? `http://localhost:5000/${item.product.thumbnail.url.replace(/\\/g, "/")}`
                : "/no-image.png";

            return (
              <div
                key={item._id}
                className="flex items-center gap-6 border rounded-xl shadow p-5 mb-5"
              >
                <img
                  src={image}
                  alt={item.product?.title || "Product"}
                  className="w-28 h-28 object-cover rounded-lg"
                />

                <div className="flex-1">

                  <h2 className="text-xl font-bold">
                    {item.product?.title}
                  </h2>

                  <p className="text-blue-600 mt-2 font-semibold">
                    ₹ {item.price}
                  </p>

                  <div className="flex items-center gap-3 mt-4">

                    <button
                      disabled={item.quantity <= 1}
                      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                      onClick={async () => {
                        await dispatch(
                          updateCart({
                            id: item.product._id,
                            quantity: item.quantity - 1,
                          })
                        );

                        dispatch(getCart());
                      }}
                    >
                      -
                    </button>

                    <span className="font-bold text-lg">
                      {item.quantity}
                    </span>

                    <button
                      className="px-3 py-1 bg-gray-200 rounded"
                      onClick={async () => {
                        await dispatch(
                          updateCart({
                            id: item.product._id,
                            quantity: item.quantity + 1,
                          })
                        );

                        dispatch(getCart());
                      }}
                    >
                      +
                    </button>

                    <button
                      className="ml-6 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded"
                      onClick={async () => {
                        await dispatch(removeCart(item._id));
                        dispatch(getCart());
                      }}
                    >
                      Remove
                    </button>

                  </div>

                </div>

                <div className="text-right">

                  <p className="font-bold text-lg">
                    ₹ {item.subtotal}
                  </p>

                </div>

              </div>
            );
          })}

          <div className="text-right mt-10 border-t pt-6">

            <h2 className="text-3xl font-bold">
              Total : ₹ {total}
            </h2>

            <Link to="/checkout">

              <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg">
                Proceed To Checkout
              </button>

            </Link>

          </div>
        </>
      )}

    </div>
  );
}

export default Cart;