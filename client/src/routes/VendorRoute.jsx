import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const VendorRoute = ({ children }) => {
  const { user, loading } = useSelector(
    (state) => state.auth
  );

  // ==========================================
  // Wait until authentication/profile loads
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-gray-600 font-medium">
            Checking vendor access...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // Not logged in
  // ==========================================

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ==========================================
  // Check Vendor role
  // ==========================================

  const role = user.role?.toLowerCase();

  if (role !== "vendor") {
    return <Navigate to="/" replace />;
  }

  // ==========================================
  // Render nested route
  // ==========================================

  if (children) {
    return children;
  }

  return <Outlet />;
};

export default VendorRoute;