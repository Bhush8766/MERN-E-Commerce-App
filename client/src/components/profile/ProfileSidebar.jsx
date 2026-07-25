import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Lock,
  LogOut,
} from "lucide-react";

import { logout } from "../../redux/authSlice";

function ProfileSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

      {/* Profile Header */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">

        <img
          src={
            user?.avatar?.url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user?.name || "User"
            )}&background=2563eb&color=ffffff`
          }
          alt={user?.name}
          className="w-28 h-28 rounded-full border-4 border-white mx-auto object-cover bg-white"
        />

        <h2 className="text-2xl font-bold text-white mt-4">
          {user?.name}
        </h2>

        <p className="text-blue-100 mt-1 text-sm">
          {user?.email}
        </p>

      </div>

      {/* Navigation */}

      <div className="p-5 space-y-2">

        <Link
          to="/profile"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
        >
          <User size={20} />
          Dashboard
        </Link>

        <Link
          to="/profile/edit"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
        >
          <User size={20} />
          Edit Profile
        </Link>

        <Link
          to="/change-password"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
        >
          <Lock size={20} />
          Change Password
        </Link>

        <Link
          to="/my-orders"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
        >
          <ShoppingBag size={20} />
          My Orders
        </Link>

        <Link
          to="/wishlist"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
        >
          <Heart size={20} />
          Wishlist
        </Link>

        <Link
          to="/saved-addresses"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
        >
          <MapPin size={20} />
          Saved Addresses
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50 transition"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </div>
  );
}

export default ProfileSidebar;