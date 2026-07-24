import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaStar,
  FaShippingFast,
} from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-800 text-white">
      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full">
            <FaShippingFast />
            <span>Free Shipping Above ₹999</span>
          </div>

          {/* Heading */}
          <h1 className="mt-8 text-5xl md:text-6xl xl:text-7xl font-extrabold leading-tight">
            Upgrade Your
            <span className="block text-cyan-300">
              Shopping Experience
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg text-slate-200 leading-8 max-w-xl">
            Discover premium electronics, fashion, lifestyle,
            gaming and home essentials with unbeatable prices,
            secure payments and lightning-fast delivery.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-5 mt-10">
            <Link
              to="/shop"
              className="flex items-center gap-3 bg-cyan-400 hover:bg-cyan-300 text-slate-900 px-8 py-4 rounded-xl font-bold transition duration-300"
            >
              Shop Now
              <FaArrowRight />
            </Link>

            <Link
              to="/register"
              className="border border-white/30 hover:bg-white hover:text-slate-900 px-8 py-4 rounded-xl font-bold transition duration-300"
            >
              Join Today
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16">
            <div>
              <h2 className="text-3xl font-bold">10K+</h2>
              <p className="text-slate-300 mt-2">
                Happy Customers
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">5K+</h2>
              <p className="text-slate-300 mt-2">
                Premium Products
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">4.9★</h2>
              <p className="text-slate-300 mt-2">
                Customer Rating
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          {/* Main Image */}
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=900&q=80"
            alt="Shopping"
            className="rounded-3xl shadow-2xl"
          />

          {/* Floating Card 1 */}
          <div className="absolute -left-8 top-12 bg-white text-slate-900 rounded-2xl shadow-xl p-5 w-56">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80"
                alt="Sneakers"
                className="w-16 h-16 rounded-xl object-cover"
              />

              <div>
                <h3 className="font-bold">
                  Nike Sneakers
                </h3>

                <p className="text-blue-600 font-bold">
                  ₹4,999
                </p>
              </div>
            </div>
          </div>

          {/* Floating Card 2 */}
          <div className="absolute -right-6 bottom-10 bg-white text-slate-900 rounded-2xl shadow-xl p-5 w-60">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold">
                  Customer Reviews
                </h4>

                <div className="flex text-yellow-500 mt-2">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </div>

              <div className="text-3xl font-bold">
                4.9
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;