import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaShoppingBag,
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
    registerUser,
    clearError,
} from "../redux/authSlice";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector(
        (state) => state.auth
    );

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            toast.error("Name is required");
            return;
        }

        if (!formData.email.trim()) {
            toast.error("Email is required");
            return;
        }

        if (!formData.phone.trim()) {
            toast.error("Phone Number is required");
            return;
        }

        if (!formData.password.trim()) {
            toast.error("Password is required");
            return;
        }

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        dispatch(
            registerUser({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
            })
        );
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }

        if (success) {
            toast.success("Registration Successful");
            navigate("/login");
        }
    }, [success, error, dispatch, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-slate-100 to-blue-100 flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

                {/* Left Section */}

                <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-indigo-700 via-blue-700 to-sky-600 text-white p-12">

                    <div className="flex items-center gap-4 mb-8">

                        <FaShoppingBag className="text-5xl" />

                        <h1 className="text-4xl font-bold">
                            ShopSphere
                        </h1>

                    </div>

                    <h2 className="text-5xl font-bold leading-tight">
                        Join Our Store
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-blue-100">
                        Create your account to enjoy a seamless shopping
                        experience with secure payments, order tracking,
                        wishlist, exclusive offers and much more.
                    </p>

                    <img
                        src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=1200"
                        alt="Register"
                        className="mt-10 rounded-2xl shadow-lg h-80 object-cover"
                    />

                </div>

                {/* Right Section */}

                <div className="p-8 md:p-14">

                    <div className="text-center mb-10">

                        <h2 className="text-4xl font-bold text-gray-800">
                            Create Account
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Register to start shopping
                        </p>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Name Field */}
                        <div className="relative">
                            <FaUser className="absolute left-4 top-4 text-gray-400" />

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className="w-full pl-12 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>


                        {/* Email Field */}
                        <div className="relative">
                            <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                className="w-full pl-12 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>


                        {/* Phone Field */}
                        <div className="relative">
                            <FaPhone className="absolute left-4 top-4 text-gray-400" />

                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="w-full pl-12 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>


                        {/* Password Field */}

                        {/* Password Field */}
                        <div className="relative">
                            <FaLock className="absolute left-4 top-4 text-gray-400" />

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-3.5 text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>


                        {/* Confirm Password */}
                        <div className="relative">
                            <FaLock className="absolute left-4 top-4 text-gray-400" />

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm Password"
                                className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-4 top-3.5 text-gray-500"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>


                                 {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>


          {/* Login Link */}
          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </form>

        </div>

      </div>

    </div>
  );
};

export default Register;