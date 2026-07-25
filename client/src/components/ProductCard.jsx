import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Heart, ShoppingCart, Star } from "lucide-react";

import { addToCart } from "../redux/cartSlice";
import { addWishlist } from "../redux/wishlistSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const image = product.thumbnail?.url
    ? `http://localhost:5000/${product.thumbnail.url.replace(/\\/g, "/")}`
    : "/no-image.png";

  const rating = product.rating || 4.5;

  const reviews = product.numReviews || 0;

  const stock = product.stock || 0;

  const hasDiscount =
    product.comparePrice &&
    product.comparePrice > product.price;

  const discount = hasDiscount
    ? Math.round(
        ((product.comparePrice - product.price) /
          product.comparePrice) *
          100
      )
    : 0;


    return (

        <div

            className="bg-white rounded-2xl shadow hover:shadow-2xl transition overflow-hidden group"

        >


      {/* Product Image */}

      <div className="relative overflow-hidden">

        <img
          src={image}
          alt={product.title}
          loading="lazy"
          onError={(e) => {
            e.target.src = "/no-image.png";
          }}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Discount Badge */}

        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
            -{discount}% OFF
          </span>
        )}

        {/* Stock Badge */}

        <span
          className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full shadow ${
            stock > 0
              ? "bg-green-600 text-white"
              : "bg-gray-700 text-white"
          }`}
        >
          {stock > 0 ? "In Stock" : "Out of Stock"}
        </span>

        {/* Wishlist Button */}

        <button
          onClick={() => dispatch(addWishlist(product._id))}
          className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition duration-300"
        >
          <Heart size={20} />
        </button>

      </div>



            {/* DETAILS */}

      {/* Product Details */}

      <div className="p-5">

        {/* Category */}

        <p className="text-sm text-gray-500">
          {product.category?.name || "Premium Product"}
        </p>

        {/* Product Title */}

        <h3 className="mt-2 text-lg font-bold text-gray-800 line-clamp-2 min-h-[56px]">
          {product.title}
        </h3>

        {/* Rating */}

        <div className="flex items-center gap-1 mt-3">

          {[1, 2, 3, 4, 5].map((item) => (

            <Star
              key={item}
              size={16}
              className={
                item <= Math.round(rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }
            />

          ))}

          <span className="text-sm text-gray-500 ml-2">
            ({reviews})
          </span>

        </div>

        {/* Price */}

        <div className="flex items-center gap-3 mt-4">

          <span className="text-2xl font-bold text-blue-600">
            ₹{product.price}
          </span>

          {hasDiscount && (
            <span className="text-gray-400 line-through">
              ₹{product.comparePrice}
            </span>
          )}

        </div>

        {/* Stock */}

        <p
          className={`mt-2 text-sm font-medium ${
            stock > 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {stock > 0
            ? `${stock} items available`
            : "Currently unavailable"}
        </p>

        {/* Buttons */}

        <div className="mt-6 space-y-3">

          <button
            disabled={stock === 0}
            onClick={() =>
              dispatch(
                addToCart({
                  productId: product._id,
                  quantity: 1,
                })
              )
            }
            className={`w-full flex justify-center items-center gap-2 py-3 rounded-xl font-semibold transition ${
              stock > 0
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <ShoppingCart size={18} />
            Add To Cart
          </button>

          <Link
            to={`/product/${product._id}`}
            className="block text-center border border-blue-600 text-blue-600 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition"
          >
            View Details
          </Link>

        </div>

      </div>

  



        </div>

    );

};


export default ProductCard;