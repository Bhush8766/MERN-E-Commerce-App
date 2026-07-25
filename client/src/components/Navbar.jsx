import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  ShoppingCart,
  Heart,
  User,
  Package,
  MapPin,
  Lock,
  LogOut,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";

import { logout } from "../redux/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const { items: cartItems = [] } = useSelector(
    (state) => state.cart
  );

  const { items: wishlistItems = [] } = useSelector(
    (state) => state.wishlist
  );

  const [openMenu, setOpenMenu] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpenMenu(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}

        <Link
          to="/"
          className="text-4xl font-bold text-blue-600"
        >
          ShopSphere
        </Link>

        {/* Right Side */}

        <div className="flex items-center gap-6">

          <Link
            to="/shop"
            className="hover:text-blue-600"
          >
            Shop
          </Link>

          {/* Wishlist */}

          <Link
            to="/wishlist"
            className="relative"
          >
            <Heart
              size={22}
              className="text-red-500"
            />

            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}

          </Link>

          {/* Cart */}

          <Link
            to="/cart"
            className="relative"
          >
            <ShoppingCart size={22} />

            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}

          </Link>

          {/* User */}

          {user ? (

            <div
              className="relative"
              ref={menuRef}
            >

              <button
                onClick={() =>
                  setOpenMenu(!openMenu)
                }
                className="flex items-center gap-2 font-medium hover:text-blue-600"
              >

                <User size={18} />

                <span>
                  Hi {user.name}
                </span>

                <ChevronDown
                  size={16}
                  className={`transition ${
                    openMenu
                      ? "rotate-180"
                      : ""
                  }`}
                />

              </button>

              {openMenu && (

                <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border overflow-hidden z-50">

                  <div className="bg-blue-600 text-white p-4">

                    <p className="font-semibold">
                      {user.name}
                    </p>

                    <p className="text-sm">
                      {user.email}
                    </p>

                  </div>

                  <Link
                    to="/profile"
                    onClick={() =>
                      setOpenMenu(false)
                    }
                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>

                  <Link
                    to="/my-orders"
                    onClick={() =>
                      setOpenMenu(false)
                    }
                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
                  >
                    <Package size={18} />
                    My Orders
                  </Link>

                  <Link
                    to="/wishlist"
                    onClick={() =>
                      setOpenMenu(false)
                    }
                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
                  >
                    <Heart size={18} />
                    Wishlist
                  </Link>

                  <Link
                    to="/saved-addresses"
                    onClick={() =>
                      setOpenMenu(false)
                    }
                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
                  >
                    <MapPin size={18} />
                    Saved Addresses
                  </Link>

                  <Link
                    to="/change-password"
                    onClick={() =>
                      setOpenMenu(false)
                    }
                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
                  >
                    <Lock size={18} />
                    Change Password
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>

                </div>

              )}

            </div>

          ) : (

            <div className="flex items-center gap-4">

              <Link
                to="/login"
                className="hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Register
              </Link>

            </div>

          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;