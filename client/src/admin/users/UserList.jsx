import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  Search,
  UserCheck,
  UserX,
  Trash2,
  Shield,
  RefreshCw,
} from "lucide-react";

import {
  getUsers,
  blockUser,
  unblockUser,
  updateUserRole,
  deleteUser,
} from "../../redux/userSlice";

function UserList() {
  const dispatch = useDispatch();

  const {
    users = [],
    loading,
    actionLoading,
    error,
    actionError,
  } = useSelector(
    (state) => state.users
  );

  const [search, setSearch] =
    useState("");

  const [roleFilter, setRoleFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  // ==========================================
  // LOAD USERS
  // ==========================================

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // ==========================================
  // FILTER USERS
  // ==========================================

  const filteredUsers = useMemo(() => {
    const searchValue =
      search
        .trim()
        .toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !searchValue ||
        `${user.name || ""} ${
          user.email || ""
        } ${user.phone || ""}`
          .toLowerCase()
          .includes(searchValue);

      const matchesRole =
        roleFilter === "All" ||
        user.role === roleFilter;

      const matchesStatus =
        statusFilter === "All" ||
        user.status === statusFilter;

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );
    });
  }, [
    users,
    search,
    roleFilter,
    statusFilter,
  ]);

  // ==========================================
  // BLOCK
  // ==========================================

  const handleBlock = async (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to block this user?"
      );

    if (!confirmed) return;

    try {
      await dispatch(
        blockUser(id)
      ).unwrap();
    } catch (error) {
      console.error(
        "Block user error:",
        error
      );
    }
  };

  // ==========================================
  // UNBLOCK
  // ==========================================

  const handleUnblock = async (id) => {
    try {
      await dispatch(
        unblockUser(id)
      ).unwrap();
    } catch (error) {
      console.error(
        "Unblock user error:",
        error
      );
    }
  };

  // ==========================================
  // CHANGE ROLE
  // ==========================================

  const handleRoleChange = async (
    id,
    role
  ) => {
    try {
      await dispatch(
        updateUserRole({
          id,
          role,
        })
      ).unwrap();
    } catch (error) {
      console.error(
        "Role update error:",
        error
      );
    }
  };

  // ==========================================
  // DELETE USER
  // ==========================================

  const handleDelete = async (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to permanently delete this user?"
      );

    if (!confirmed) return;

    try {
      await dispatch(
        deleteUser(id)
      ).unwrap();
    } catch (error) {
      console.error(
        "Delete user error:",
        error
      );
    }
  };

  // ==========================================
  // REFRESH
  // ==========================================

  const handleRefresh = () => {
    dispatch(getUsers());
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center gap-3">
          <RefreshCw
            size={22}
            className="animate-spin text-blue-600"
          />

          <span className="text-lg font-medium">
            Loading users...
          </span>
        </div>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="space-y-6">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            User Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage customers, vendors and
            administrators.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={loading}
          className="
            flex
            items-center
            justify-center
            gap-2
            px-4
            py-2
            rounded-lg
            border
            bg-white
            hover:bg-gray-50
          "
        >
          <RefreshCw size={18} />

          Refresh
        </button>
      </div>

      {/* =====================================
          ERROR
      ===================================== */}

      {(error || actionError) && (
        <div className="
          bg-red-50
          border
          border-red-200
          text-red-700
          px-4
          py-3
          rounded-lg
        ">
          {actionError || error}
        </div>
      )}

      {/* =====================================
          FILTERS
      ===================================== */}

      <div className="
        bg-white
        rounded-xl
        shadow-sm
        border
        p-4
      ">

        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-4
        ">

          {/* Search */}

          <div className="relative">

            <Search
              size={18}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              placeholder="Search name, email or phone..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
                w-full
                border
                rounded-lg
                pl-10
                pr-4
                py-2.5
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

          </div>

          {/* Role */}

          <select
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(
                e.target.value
              )
            }
            className="
              border
              rounded-lg
              px-4
              py-2.5
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          >
            <option value="All">
              All Roles
            </option>

            <option value="Customer">
              Customer
            </option>

            <option value="Vendor">
              Vendor
            </option>

            <option value="Admin">
              Admin
            </option>
          </select>

          {/* Status */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="
              border
              rounded-lg
              px-4
              py-2.5
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          >
            <option value="All">
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Blocked">
              Blocked
            </option>
          </select>

        </div>
      </div>

      {/* =====================================
          USER COUNT
      ===================================== */}

      <div className="flex items-center justify-between">

        <p className="text-gray-600">
          Showing{" "}
          <span className="font-bold">
            {filteredUsers.length}
          </span>{" "}
          of{" "}
          <span className="font-bold">
            {users.length}
          </span>{" "}
          users
        </p>

      </div>

      {/* =====================================
          TABLE
      ===================================== */}

      <div className="
        bg-white
        rounded-xl
        shadow-sm
        border
        overflow-hidden
      ">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                  User
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                  Phone
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                  Role
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold text-gray-600">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredUsers.map(
                (user) => (
                  <tr
                    key={user._id}
                    className="
                      border-t
                      hover:bg-gray-50
                    "
                  >

                    {/* User */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        {user.avatar?.url ? (
                          <img
                            src={
                              user.avatar.url
                            }
                            alt={
                              user.name
                            }
                            className="
                              w-11
                              h-11
                              rounded-full
                              object-cover
                            "
                          />
                        ) : (
                          <div className="
                            w-11
                            h-11
                            rounded-full
                            bg-blue-100
                            text-blue-700
                            flex
                            items-center
                            justify-center
                            font-bold
                          ">
                            {user.name
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </div>
                        )}

                        <div>

                          <p className="font-semibold text-gray-800">
                            {user.name}
                          </p>

                          <p className="text-sm text-gray-500">
                            {user.email}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Phone */}

                    <td className="px-5 py-4 text-gray-600">
                      {user.phone || "—"}
                    </td>

                    {/* Role */}

                    <td className="px-5 py-4">

                      <select
                        value={
                          user.role
                        }
                        disabled={
                          actionLoading
                        }
                        onChange={(e) =>
                          handleRoleChange(
                            user._id,
                            e.target.value
                          )
                        }
                        className="
                          border
                          rounded-lg
                          px-3
                          py-2
                          text-sm
                          outline-none
                          focus:ring-2
                          focus:ring-blue-500
                        "
                      >

                        <option value="Customer">
                          Customer
                        </option>

                        <option value="Vendor">
                          Vendor
                        </option>

                        <option value="Admin">
                          Admin
                        </option>

                      </select>

                    </td>

                    {/* Status */}

                    <td className="px-5 py-4">

                      {user.status ===
                      "Blocked" ? (
                        <span className="
                          inline-flex
                          items-center
                          gap-1
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-semibold
                          bg-red-100
                          text-red-700
                        ">
                          <UserX size={14} />

                          Blocked
                        </span>
                      ) : (
                        <span className="
                          inline-flex
                          items-center
                          gap-1
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-semibold
                          bg-green-100
                          text-green-700
                        ">
                          <UserCheck size={14} />

                          Active
                        </span>
                      )}

                    </td>

                    {/* Actions */}

                    <td className="px-5 py-4">

                      <div className="
                        flex
                        items-center
                        justify-center
                        gap-2
                      ">

                        {/* Block / Unblock */}

                        {user.status ===
                        "Blocked" ? (
                          <button
                            onClick={() =>
                              handleUnblock(
                                user._id
                              )
                            }
                            disabled={
                              actionLoading
                            }
                            title="Unblock User"
                            className="
                              p-2
                              rounded-lg
                              bg-green-100
                              text-green-700
                              hover:bg-green-200
                              disabled:opacity-50
                            "
                          >
                            <UserCheck
                              size={18}
                            />
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleBlock(
                                user._id
                              )
                            }
                            disabled={
                              actionLoading
                            }
                            title="Block User"
                            className="
                              p-2
                              rounded-lg
                              bg-orange-100
                              text-orange-700
                              hover:bg-orange-200
                              disabled:opacity-50
                            "
                          >
                            <UserX
                              size={18}
                            />
                          </button>
                        )}

                        {/* Delete */}

                        <button
                          onClick={() =>
                            handleDelete(
                              user._id
                            )
                          }
                          disabled={
                            actionLoading
                          }
                          title="Delete User"
                          className="
                            p-2
                            rounded-lg
                            bg-red-100
                            text-red-700
                            hover:bg-red-200
                            disabled:opacity-50
                          "
                        >
                          <Trash2
                            size={18}
                          />
                        </button>

                      </div>

                    </td>

                  </tr>
                )
              )}

              {/* Empty */}

              {filteredUsers.length ===
                0 && (
                <tr>

                  <td
                    colSpan="5"
                    className="
                      text-center
                      py-12
                      text-gray-500
                    "
                  >

                    <Shield
                      size={40}
                      className="
                        mx-auto
                        mb-3
                        text-gray-300
                      "
                    />

                    No users found.

                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default UserList;