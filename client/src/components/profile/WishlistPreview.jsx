import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";

function WishlistPreview({ wishlist = [] }) {
  const previewItems = wishlist.slice(0, 4);

  const getImageUrl = (item) => {
    if (!item?.thumbnail?.url) {
      return "https://via.placeholder.com/300x300?text=No+Image";
    }

    if (item.thumbnail.url.startsWith("http")) {
      return item.thumbnail.url;
    }

    return `http://localhost:5000/${item.thumbnail.url.replace(/\\/g, "/")}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

      <div className="flex items-center justify-between mb-6">

        <div className="flex items-center gap-2">

          <Heart
            className="text-pink-500"
            size={24}
          />

          <h2 className="text-2xl font-bold">
            Wishlist
          </h2>

        </div>

        <Link
          to="/wishlist"
          className="text-blue-600 hover:underline font-medium"
        >
          View All
        </Link>

      </div>

      {previewItems.length === 0 ? (

        <div className="text-center py-12">

          <Heart
            size={70}
            className="mx-auto text-gray-300"
          />

          <h3 className="text-xl font-semibold mt-4">
            Wishlist is Empty
          </h3>

          <p className="text-gray-500 mt-2">
            Save your favourite products here.
          </p>

          <Link
            to="/shop"
            className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Explore Products
          </Link>

        </div>

      ) : (

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">

          {previewItems.map((item) => {

            const product = item.product || item;

            return (

              <div
                key={product._id}
                className="border rounded-xl overflow-hidden hover:shadow-lg transition"
              >

                <img
                  src={getImageUrl(product)}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">

                  <h3 className="font-semibold text-lg line-clamp-2">
                    {product.title}
                  </h3>

                  <div className="flex items-center gap-1 mt-2">

                    <Star
                      size={16}
                      fill="gold"
                      color="gold"
                    />

                    <span className="text-sm text-gray-600">
                      {product.averageRating || 4.5}
                    </span>

                  </div>

                  <p className="text-blue-600 font-bold text-xl mt-3">
                    ₹{product.price}
                  </p>

                  <Link
                    to={`/product/${product._id}`}
                    className="block text-center mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                  >
                    View Product
                  </Link>

                </div>

              </div>

            );

          })}

        </div>

      )}

    </div>
  );
}

export default WishlistPreview;