import { Link } from "react-router-dom";

import {
  ShoppingBag,
  Heart,
  MapPin,
  User,
  Lock,
  Store,
} from "lucide-react";

function QuickActions() {
  const actions = [
    {
      title: "Continue Shopping",
      description: "Browse latest products",
      icon: Store,
      to: "/shop",
      bg: "from-blue-500 to-indigo-600",
    },
    {
      title: "My Orders",
      description: "Track your purchases",
      icon: ShoppingBag,
      to: "/my-orders",
      bg: "from-green-500 to-emerald-600",
    },
    {
      title: "Wishlist",
      description: "Your favourite products",
      icon: Heart,
      to: "/wishlist",
      bg: "from-pink-500 to-rose-600",
    },
    {
      title: "Saved Addresses",
      description: "Manage delivery address",
      icon: MapPin,
      to: "/saved-addresses",
      bg: "from-yellow-500 to-orange-500",
    },
    {
      title: "Edit Profile",
      description: "Update account details",
      icon: User,
      to: "/profile/edit",
      bg: "from-purple-500 to-violet-600",
    },
    {
      title: "Change Password",
      description: "Keep your account secure",
      icon: Lock,
      to: "/change-password",
      bg: "from-gray-600 to-gray-800",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {actions.map((action, index) => {
          const Icon = action.icon;

          return (
            <Link
              key={index}
              to={action.to}
              className={`bg-gradient-to-r ${action.bg} rounded-xl p-6 text-white hover:scale-105 transition-transform duration-300 shadow-lg`}
            >
              <Icon size={40} />

              <h3 className="text-xl font-bold mt-4">
                {action.title}
              </h3>

              <p className="text-sm opacity-90 mt-2">
                {action.description}
              </p>
            </Link>
          );
        })}

      </div>

    </div>
  );
}

export default QuickActions;