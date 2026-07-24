import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getWishlist,
  removeWishlist,
  clearWishlist,
} from "../redux/wishlistSlice";

import { addToCart } from "../redux/cartSlice";

function Wishlist() {
  const dispatch = useDispatch();

  const { items, loading } = useSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-2xl">
        Loading Wishlist...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          My Wishlist
        </h1>

        {items.length > 0 && (
          <button
            onClick={() => dispatch(clearWishlist())}
            className="bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            Clear Wishlist
          </button>
        )}

      </div>

      {items.length === 0 ? (
        <div className="text-center mt-20">

          <h2 className="text-3xl font-bold">
            Wishlist is Empty
          </h2>

          <Link to="/shop">

            <button className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg">
              Continue Shopping
            </button>

          </Link>

        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {items.map((item) => {

            // Supports both backend formats:
            // { _id, product:{} }
            // { _id, title, thumbnail }

            const product = item.product || item;

            const image =
              product?.thumbnail?.url
                ? `http://localhost:5000/${product.thumbnail.url.replaceAll(
                    "\\",
                    "/"
                  )}`
                : "/no-image.png";

            return (
              <div
                key={item._id}
                className="border rounded-xl p-5 shadow hover:shadow-lg transition"
              >

                <Link to={`/product/${product._id}`}>

                  <img
                    src={image}
                    alt={product.title}
                    className="w-full h-60 object-cover rounded-lg"
                  />

                </Link>

                <h2 className="text-xl font-bold mt-4">
                  {product.title}
                </h2>

                <p className="text-blue-600 text-2xl font-bold mt-2">
                  ₹ {product.price}
                </p>

                <div className="flex gap-3 mt-5">

                  <button
                    onClick={() =>
                      dispatch(
                        addToCart({
                          productId: product._id,
                          quantity: 1,
                        })
                      )
                    }
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
                  >
                    Add To Cart
                  </button>

                  <button
                    onClick={() =>
                      dispatch(removeWishlist(item._id))
                    }
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg"
                  >
                    Remove
                  </button>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default Wishlist;