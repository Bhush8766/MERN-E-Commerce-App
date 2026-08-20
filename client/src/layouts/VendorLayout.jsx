import { NavLink, Outlet, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Wallet,
  LogOut,
  Store,
} from "lucide-react";

import { useDispatch } from "react-redux";

import { logout } from "../redux/authSlice";

const VendorLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/vendor",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      path: "/vendor/products",
      icon: Package,
    },
    {
      name: "Orders",
      path: "/vendor/orders",
      icon: ShoppingBag,
    },
    {
      name: "Earnings",
      path: "/vendor/earnings",
      icon: Wallet,
    },
  ];

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <aside className="w-64 bg-gray-900 text-white fixed left-0 top-0 bottom-0 flex flex-col">
        {/* Logo */}

        <div className="h-20 flex items-center gap-3 px-6 border-b border-gray-700">
          <Store className="text-blue-400" size={28} />

          <div>
            <h1 className="font-bold text-lg">
              Vendor Panel
            </h1>

            <p className="text-xs text-gray-400">
              MERN E-Commerce
            </p>
          </div>
        </div>

        {/* Navigation */}

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/vendor"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`
                }
              >
                <Icon size={20} />

                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-gray-800"
          >
            <LogOut size={20} />

            Logout
          </button>
        </div>
      </aside>

      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <main className="ml-64 flex-1 min-h-screen">
        <Outlet />
      </main>  
    </div>
  );
};

export default VendorLayout;  