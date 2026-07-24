import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-950 via-blue-900 to-indigo-950 text-white">

      {/* Top */}
      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-4 gap-12">

          {/* Logo */}
          <div>

            <Link
              to="/"
              className="text-4xl font-extrabold"
            >
              ShopVerse
            </Link>

            <p className="mt-6 text-blue-200 leading-8">
              Premium online shopping destination offering quality products,
              secure payments, fast delivery, and exceptional customer service.
            </p>

            <div className="flex gap-4 mt-8">

              {["📘", "📸", "🐦", "💼"].map((icon, index) => (

                <div
                  key={index}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-blue-600 cursor-pointer flex items-center justify-center text-xl transition"
                >
                  {icon}
                </div>

              ))}

            </div>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-2xl font-bold mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4">

              <li>
                <Link to="/" className="text-blue-200 hover:text-white transition">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/shop" className="text-blue-200 hover:text-white transition">
                  Shop
                </Link>
              </li>

              <li>
                <Link to="/cart" className="text-blue-200 hover:text-white transition">
                  Cart
                </Link>
              </li>

              <li>
                <Link to="/wishlist" className="text-blue-200 hover:text-white transition">
                  Wishlist
                </Link>
              </li>

              <li>
                <Link to="/login" className="text-blue-200 hover:text-white transition">
                  Login
                </Link>
              </li>

            </ul>

          </div>

          {/* Customer Service */}
          <div>

            <h3 className="text-2xl font-bold mb-6">
              Customer Service
            </h3>

            <ul className="space-y-4 text-blue-200">

              <li className="hover:text-white cursor-pointer transition">
                Help Center
              </li>

              <li className="hover:text-white cursor-pointer transition">
                Returns & Refunds
              </li>

              <li className="hover:text-white cursor-pointer transition">
                Shipping Policy
              </li>

              <li className="hover:text-white cursor-pointer transition">
                Privacy Policy
              </li>

              <li className="hover:text-white cursor-pointer transition">
                Terms & Conditions
              </li>

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-2xl font-bold mb-6">
              Contact
            </h3>

            <div className="space-y-5 text-blue-200">

              <p>
                📍 Pune, Maharashtra, India
              </p>

              <p>
                📞 +91 98765 43210
              </p>

              <p>
                ✉ support@shopverse.com
              </p>

              <p>
                🕒 Mon - Sat : 9 AM - 8 PM
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-white/10"></div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">

        <p className="text-blue-300 text-center md:text-left">
          © {new Date().getFullYear()} ShopVerse. All Rights Reserved.
        </p>

        <div className="flex gap-6 mt-5 md:mt-0">

          <img
            src="https://img.icons8.com/color/48/visa.png"
            alt="Visa"
            className="h-8"
          />

          <img
            src="https://img.icons8.com/color/48/mastercard.png"
            alt="Mastercard"
            className="h-8"
          />

          <img
            src="https://img.icons8.com/color/48/paypal.png"
            alt="PayPal"
            className="h-8"
          />

          <img
            src="https://img.icons8.com/color/48/google-pay.png"
            alt="Google Pay"
            className="h-8"
          />

        </div>

      </div>

    </footer>
  );
};

export default Footer;