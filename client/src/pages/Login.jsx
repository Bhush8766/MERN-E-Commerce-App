import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShoppingBag,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { loginUser, clearError } from "../redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user, token } = useSelector(
    (state) => state.auth
  );

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!formData.password.trim()) {
      toast.error("Password is required");
      return;
    }

    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (token && user) {
      toast.success("Login Successful");

      switch (user.role) {
        case "Admin":
          navigate("/admin");
          break;

        case "Vendor":
          navigate("/vendor");
          break;

        default:
          navigate("/");
      }
    }
  }, [token, user, error, dispatch, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-100 to-blue-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* Left Section */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-700 to-indigo-900 text-white p-12">

          <div className="flex items-center gap-3 mb-8">

            <FaShoppingBag className="text-5xl" />

            <h1 className="text-4xl font-bold">
              ShopSphere
            </h1>

          </div>

          <h2 className="text-5xl font-bold leading-tight">
            Welcome Back!
          </h2>

          <p className="mt-6 text-lg leading-8 text-blue-100">
            Login to explore thousands of products,
            manage your orders, wishlist,
            secure payments and much more.
          </p>

          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200"
            alt="shopping"
            className="mt-10 rounded-2xl shadow-lg object-cover h-80"
          />

        </div>

        {/* Right Section */}

        <div className="p-8 md:p-14">

          <div className="text-center mb-10">

            <h2 className="text-4xl font-bold text-gray-800">
              Login
            </h2>

            <p className="text-gray-500 mt-2">
              Sign in to your account
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Email */}

            <div>

              <label className="block mb-2 font-medium text-gray-700">
                Email Address
              </label>

              <div className="relative">

                <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="block mb-2 font-medium text-gray-700">
                Password
              </label>

              <div className="relative">

                <FaLock className="absolute left-4 top-4 text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-4 text-gray-500"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>

                        {/* Remember Me & Forgot Password */}

            <div className="flex items-center justify-between">

              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">

                <input
                  type="checkbox"
                  className="w-4 h-4 accent-blue-600"
                />

                Remember Me

              </label>

              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Forgot Password?
              </Link>

            </div>

            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Logging In..." : "Login"}
            </button>

            {/* Divider */}

            <div className="flex items-center gap-4">

              <div className="flex-1 h-px bg-gray-300"></div>

              <span className="text-gray-400 text-sm">
                OR
              </span>

              <div className="flex-1 h-px bg-gray-300"></div>

            </div>

            {/* Google Login Button (UI Only) */}

            <button
              type="button"
              className="w-full border border-gray-300 hover:bg-gray-100 py-3 rounded-xl font-medium transition"
            >
              Continue with Google
            </button>

            {/* Register */}

            <div className="text-center">

              <span className="text-gray-600">
                Don't have an account?
              </span>

              <Link
                to="/register"
                className="ml-2 text-blue-600 font-semibold hover:underline"
              >
                Register
              </Link>

            </div>

          </form>

          {/* Footer */}

          <div className="mt-10 text-center text-sm text-gray-500">

            By logging in, you agree to our

            <Link
              to="/terms"
              className="text-blue-600 hover:underline ml-1"
            >
              Terms &
            </Link>

            <Link
              to="/privacy"
              className="text-blue-600 hover:underline ml-1"
            >
              Privacy Policy
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;