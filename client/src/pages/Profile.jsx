import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProfileSidebar from "../components/profile/ProfileSidebar";
import DashboardCards from "../components/profile/DashboardCards";
import RecentOrders from "../components/profile/RecentOrders";
import WishlistPreview from "../components/profile/WishlistPreview";
import QuickActions from "../components/profile/QuickActions";

import { getMyOrders } from "../redux/orderSlice";
import { getWishlist } from "../redux/wishlistSlice";
import { getProfile } from "../redux/userSlice";

function Profile() {
  const dispatch = useDispatch();

  const {
    profile,
    loading: profileLoading,
  } = useSelector((state) => state.users);

  const {
    loading: orderLoading,
    orders = [],
  } = useSelector((state) => state.orders);

  const {
    loading: wishlistLoading,
    items = [],
  } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getMyOrders());
    dispatch(getWishlist());
  }, [dispatch]);

  if (profileLoading || orderLoading || wishlistLoading) {
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

          {/* Dashboard */}

          <div className="lg:col-span-3 space-y-8">

            {/* Welcome Card */}

            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-8 text-white">

              <div className="flex flex-col md:flex-row items-center gap-6">

                <img
                  src={
                    profile?.avatar?.url ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      profile?.name || "User"
                    )}`
                  }
                  alt="Profile"
                  className="w-28 h-28 rounded-full border-4 border-white object-cover"
                />

                <div>

                  <h2 className="text-3xl font-bold">
                    {profile?.name}
                  </h2>

                  <p className="text-blue-100 mt-2">
                    {profile?.email}
                  </p>

                  <p className="text-blue-100">
                    {profile?.phone || "No phone number"}
                  </p>

                  <div className="mt-4 inline-flex px-4 py-2 bg-white/20 rounded-full text-sm">
                    {profile?.role}
                  </div>

                </div>

              </div>

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