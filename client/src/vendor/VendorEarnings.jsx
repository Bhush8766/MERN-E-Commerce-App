import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Wallet } from "lucide-react";

import {
  getVendorEarnings,
} from "../redux/vendorSlice";

const VendorEarnings = () => {
  const dispatch = useDispatch();

  const {
    earnings,
    loading,
    error,
  } = useSelector(
    (state) => state.vendor
  );

  useEffect(() => {
    dispatch(getVendorEarnings());
  }, [dispatch]);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Vendor Earnings
        </h1>

        <p className="text-gray-500 mt-2">
          Track your product sales and earnings.
        </p>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="max-w-md bg-white rounded-xl shadow p-8">
        <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
          <Wallet size={28} />
        </div>

        <p className="text-gray-500 mt-6">
          Total Earnings
        </p>

        {loading ? (
          <p className="text-gray-500 mt-2">
            Loading...
          </p>
        ) : (
          <h2 className="text-4xl font-bold mt-2">
            ₹{earnings}
          </h2>
        )}
      </div>
    </div>
  );
};

export default VendorEarnings;