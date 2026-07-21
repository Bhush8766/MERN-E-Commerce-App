import { useSelector } from "react-redux";

function Topbar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold">
        Admin Dashboard
      </h2>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          {user?.name?.charAt(0)?.toUpperCase() || "A"}
        </div>

        <div>
          <p className="font-semibold">
            {user?.name || "Administrator"}
          </p>

          <p className="text-sm text-gray-500">
            {user?.role || "Admin"}
          </p>
        </div>
      </div>
    </header>
  );
}

export default Topbar;