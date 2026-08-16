import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "../redux/productSlice";

import ProductCard from "../components/ProductCard";

import HeroSection from "../components/home/HeroSection";

import FeaturesSection from "../components/home/FeaturesSection";

const Home = () => {
     

  const dispatch = useDispatch();       



const { products, loading } = useSelector(       
    (state) => state.product
);

  useEffect(() => {

    dispatch(getProducts());

  }, [dispatch]);




  return (

    <div className="bg-gray-50">
   

       <HeroSection />

         
{/* ===========================
    TRUSTED BRANDS
=========================== */}

<section className="py-16 bg-gray-50">

  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-center text-4xl font-bold">
      Trusted By Top Brands
    </h2>

    <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mt-14">

      {[
        "Apple",
        "Samsung",
        "Sony",
        "Nike",
        "Adidas",
      ].map((brand, index) => (

        <div
          key={index}
          className="bg-white rounded-2xl shadow p-8 flex justify-center items-center hover:shadow-xl transition"
        >

          <span className="text-2xl font-bold text-gray-700">
            {brand}
          </span>

        </div>

      ))}

    </div>

  </div>

</section>



{/* ===========================
    FLASH SALE
=========================== */}

<section className="py-24 bg-red-50">

  <div className="max-w-7xl mx-auto px-6">

    <div className="bg-gradient-to-r from-red-600 via-pink-600 to-orange-500 rounded-[40px] overflow-hidden">

      <div className="grid md:grid-cols-2 gap-10 items-center px-10 md:px-16 py-16">

        {/* LEFT */}

        <div>

          <span className="bg-white/20 px-5 py-2 rounded-full text-white font-semibold">
            ⚡ Flash Sale
          </span>

          <h2 className="text-5xl font-extrabold text-white mt-6 leading-tight">
            Mega Sale Up To
            <br />
            <span className="text-yellow-300">
              70% OFF
            </span>
          </h2>

          <p className="text-red-100 mt-6 text-lg leading-8">
            Hurry! Limited-time offers on premium products.
            Grab your favorites before they're gone.
          </p>

          <div className="flex gap-4 mt-10">

            {[
              ["12", "Hours"],
              ["45", "Minutes"],
              ["30", "Seconds"],
            ].map((item, index) => (

              <div
                key={index}
                className="bg-white text-center rounded-2xl px-6 py-5 min-w-[90px]"
              >

                <h3 className="text-3xl font-bold text-red-600">
                  {item[0]}
                </h3>

                <p className="text-gray-500 text-sm">
                  {item[1]}
                </p>

              </div>

            ))}

          </div>

          <Link
            to="/shop"
            className="inline-block mt-10 bg-white text-red-600 px-10 py-4 rounded-xl font-bold hover:scale-105 transition"
          >
            Shop Flash Sale →
          </Link>

        </div>

        {/* RIGHT */}

        <div className="hidden md:flex justify-center">

          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900"
            alt="Flash Sale"
            className="rounded-3xl shadow-2xl w-full max-w-md object-cover"
          />

        </div>

      </div>

    </div>

  </div>

</section>  




   {/* ===========================
    PREMIUM CATEGORIES
=========================== */}

<section className="py-24 bg-white">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center">

      <span className="text-blue-600 font-semibold tracking-widest uppercase">
        Shop By Category
      </span>

      <h2 className="text-5xl font-bold mt-3">
        Explore Popular Categories
      </h2>

      <p className="text-gray-500 mt-5 text-lg max-w-2xl mx-auto">
        Browse our carefully selected collections designed for every lifestyle.
      </p>

    </div>



    <div className="grid md:grid-cols-4 gap-8 mt-16">

      {[
        {
          title: "Electronics",
          icon: "📱",
          products: "320+ Products",
          color: "from-blue-500 to-cyan-500",
        },
        {
          title: "Fashion",
          icon: "👕",
          products: "540+ Products",
          color: "from-pink-500 to-rose-500",
        },
        {
          title: "Home",
          icon: "🏠",
          products: "280+ Products",
          color: "from-green-500 to-emerald-500",
        },
        {
          title: "Gaming",
          icon: "🎮",
          products: "160+ Products",
          color: "from-purple-500 to-indigo-500",
        },
      ].map((cat, index) => (

        <div
          key={index}
          className="group relative rounded-3xl overflow-hidden bg-gray-50 hover:shadow-2xl transition duration-500 cursor-pointer"
        >

          <div
            className={`h-44 bg-gradient-to-r ${cat.color} flex items-center justify-center`}
          >

            <div className="text-7xl group-hover:scale-125 transition duration-500">
              {cat.icon}
            </div>

          </div>

          <div className="p-8">

            <h3 className="text-2xl font-bold">
              {cat.title}
            </h3>

            <p className="text-gray-500 mt-2">
              {cat.products}
            </p>

            <button
              className="mt-6 text-blue-600 font-semibold group-hover:translate-x-2 transition"
            >
              Shop Now →
            </button>

          </div>

        </div>

      ))}

    </div>

  </div>

</section>








{/* ===========================
    BEST SELLERS
=========================== */}

<section className="py-24 bg-white">

  <div className="max-w-7xl mx-auto px-6">

    <div className="flex justify-between items-center">

      <div>

        <span className="text-blue-600 uppercase tracking-widest font-semibold">
          Most Popular
        </span>

        <h2 className="text-5xl font-bold mt-2">
          Best Sellers
        </h2>

      </div>

      <Link
        to="/shop"
        className="text-blue-600 font-bold"
      >
        View All →
      </Link>

    </div>

    <div className="grid md:grid-cols-4 gap-8 mt-16">

  {products?.length > 0 ? (
    products.slice(0, 4).map((product) => (
      <ProductCard
        key={product._id}
        product={product}
      />
    ))
  ) : (
    <div className="col-span-4 text-center py-10">
      <h3 className="text-gray-500 text-xl">
        No Products Found
      </h3>
    </div>
  )}

 
</div>   

  </div>

</section>





<FeaturesSection />





{/* ===========================
    PROMOTIONAL BANNER
=========================== */}

<section className="py-24 bg-gray-50">

  <div className="max-w-7xl mx-auto px-6">

    <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500">

      {/* Decorative Circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/10"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white/10"></div>

      <div className="relative grid md:grid-cols-2 gap-10 items-center px-10 md:px-16 py-16">

        {/* Left */}
        <div>

          <span className="inline-block bg-white/20 backdrop-blur px-5 py-2 rounded-full text-sm font-semibold">
            🔥 Limited Time Offer
          </span>

          <h2 className="text-5xl md:text-6xl font-extrabold text-white mt-6 leading-tight">
            Up to
            <span className="text-yellow-300"> 50% OFF </span>
            on Premium Products
          </h2>

          <p className="text-blue-100 text-lg mt-6 leading-8">
            Upgrade your lifestyle with top-quality products at unbeatable
            prices. Don't miss this exclusive sale.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">

            <Link
              to="/shop"
              className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition"
            >
              Shop Now
            </Link>

            <Link
              to="/register"
              className="border border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-700 transition"
            >
              Join Now
            </Link>

          </div>

        </div>

        {/* Right */}
        <div className="hidden md:flex justify-center">

          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900"
            alt="Sale"
            className="rounded-3xl shadow-2xl w-full max-w-md object-cover hover:scale-105 transition duration-500"
          />

        </div>

      </div>

    </div>

  </div>

</section>















{/* ===========================
    CUSTOMER TESTIMONIALS
=========================== */}

<section className="py-24 bg-white">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center">

      <span className="uppercase tracking-[4px] text-blue-600 font-semibold">
        Testimonials
      </span>

      <h2 className="text-5xl font-bold mt-4">
        What Our Customers Say
      </h2>

      <p className="text-gray-500 mt-5 text-lg max-w-2xl mx-auto">
        Thousands of happy customers trust our products and services every day.
      </p>

    </div>

    <div className="grid md:grid-cols-3 gap-8 mt-16">

      {[
        {
          name: "Rahul Sharma",
          image: "https://randomuser.me/api/portraits/men/32.jpg",
          review:
            "Amazing quality and lightning-fast delivery. Everything arrived exactly as described.",
        },

        {
          name: "Priya Patel",
          image: "https://randomuser.me/api/portraits/women/44.jpg",
          review:
            "One of the best online shopping experiences I've had. Great customer support too!",
        },

        {
          name: "Amit Verma",
          image: "https://randomuser.me/api/portraits/men/76.jpg",
          review:
            "Excellent products at competitive prices. Highly recommend this store to everyone.",
        },
      ].map((item, index) => (

        <div
          key={index}
          className="bg-gray-50 rounded-3xl p-8 shadow hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
        >

          <div className="flex text-yellow-400 text-xl">
            ⭐⭐⭐⭐⭐
          </div>

          <p className="text-gray-600 leading-8 mt-6">
            "{item.review}"
          </p>

          <div className="flex items-center mt-8">

            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-full object-cover"
            />

            <div className="ml-4">

              <h4 className="font-bold text-lg">
                {item.name}
              </h4>

              <p className="text-gray-500">
                Verified Customer
              </p>

            </div>

          </div>

        </div>

      ))}

    </div>

  </div>

</section>



    </div>


  );

};



export default Home;