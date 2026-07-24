import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addToCart } from "../redux/cartSlice";
import { addWishlist } from "../redux/wishlistSlice";


const ProductCard = ({ product }) => {


    const dispatch = useDispatch();



    const image = product.thumbnail?.url
        ? `http://localhost:5000/${product.thumbnail.url.replace(/\\/g, "/")}`
        : "/no-image.png";



    return (

        <div

            className="bg-white rounded-2xl shadow hover:shadow-2xl transition overflow-hidden group"

        >


            {/* IMAGE */}


            <div className="relative overflow-hidden">


                <img

                    src={image}

                    alt={product.title}

                    className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"

                />



                <span

                    className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full"

                >

                    New

                </span>



            </div>





            {/* DETAILS */}


            <div className="p-5">



                <h3 className="font-bold text-lg truncate">

                    {product.title}

                </h3>



                <p className="text-gray-500 text-sm mt-2">

                    {product.category?.name || "Premium Product"}

                </p>



                <p className="text-blue-600 font-bold text-xl mt-3">

                    ₹{product.price}

                </p>





                {/* BUTTONS */}


                <div className="flex gap-2 mt-5">


                    <button


                        onClick={() =>
                            dispatch(
                                addToCart({
                                    productId: product._id,
                                    quantity: 1,
                                })
                            )
                        }


                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"

                    >

                        🛒 Cart

                    </button>




                    <button


                        onClick={() => dispatch(addWishlist(product._id))}


                        className="px-4 border rounded-lg hover:bg-red-50"

                    >

                        ❤️

                    </button>


                </div>





                <Link

                    to={`/product/${product._id}`}

                    className="block mt-4 text-center text-blue-600"

                >

                    View Details →

                </Link>



            </div>




        </div>

    );

};


export default ProductCard;