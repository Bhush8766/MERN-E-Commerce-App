import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProfileSidebar from "../components/profile/ProfileSidebar";
import DashboardCards from "../components/profile/DashboardCards";
import RecentOrders from "../components/profile/RecentOrders";
import WishlistPreview from "../components/profile/WishlistPreview";
import QuickActions from "../components/profile/QuickActions";

import { getMyOrders } from "../redux/orderSlice";
import { getWishlist } from "../redux/wishlistSlice";

function Profile() {
  const dispatch = useDispatch();

  const { loading: orderLoading, orders = [] } = useSelector(
    (state) => state.orders
  );

  const { loading: wishlistLoading, items = [] } = useSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    dispatch(getMyOrders());
    dispatch(getWishlist());
  }, [dispatch]);

  if (orderLoading || wishlistLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-semibold">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-4xl font-bold mb-8">
          My Account
        </h1>

        <div className="grid lg:grid-cols-4 gap-8">

          {/* Sidebar */}

          <ProfileSidebar />

          {/* Main Dashboard */}

          <div className="lg:col-span-3 space-y-8">

            {/* Welcome */}

            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg">

              <h2 className="text-3xl font-bold">
                Welcome Back 👋
              </h2>

              <p className="mt-3 text-blue-100">
                Manage your profile, orders, wishlist and addresses from one dashboard.
              </p>

            </div>

            {/* Statistics */}

            <DashboardCards
              orders={orders}
              wishlist={items}
            />

            {/* Recent Orders */}

            <RecentOrders
              orders={orders}
            />

            {/* Wishlist */}

            <WishlistPreview
              wishlist={items}
            />

            {/* Quick Actions */}

            <QuickActions />

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;