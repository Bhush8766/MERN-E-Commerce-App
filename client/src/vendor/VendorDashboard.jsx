import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Package,
  ShoppingBag,
  Wallet,
  Clock,
  CheckCircle,
} from "lucide-react";

import {
  getVendorDashboard,
} from "../redux/vendorSlice";

const VendorDashboard = () => {
  const dispatch = useDispatch();

  const {
    dashboard,
    loading,
    error,
  } = useSelector(
    (state) => state.vendor
  );

  useEffect(() => {
    dispatch(getVendorDashboard());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-gray-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Vendor Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your products, orders and earnings.
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        <DashboardCard
          title="Products"
          value={dashboard.totalProducts}
          icon={<Package />}
        />

        <DashboardCard
          title="Orders"
          value={dashboard.totalOrders}
          icon={<ShoppingBag />}
        />

        <DashboardCard
          title="Sales"
          value={`₹${dashboard.totalSales}`}
          icon={<Wallet />}
        />

        <DashboardCard
          title="Pending"
          value={dashboard.pendingOrders}
          icon={<Clock />}
        />

        <DashboardCard
          title="Delivered"
          value={dashboard.deliveredOrders}
          icon={<CheckCircle />}
        />
      </div>
    </div>
  );
};

const DashboardCard = ({
  title,
  value,
  icon,
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div className="text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;