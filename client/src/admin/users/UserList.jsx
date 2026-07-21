import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getUsers,
  updateUserRole,
  deleteUser,
} from "../../redux/userSlice";

function UserList() {
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector(
    (state) => state.users
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      `${user.name} ${user.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [users, search]);

  const handleRoleChange = (id, role) => {
    dispatch(updateUserRole({ id, role }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  if (loading)
    return (
      <div className="text-center py-10">
        Loading users...
      </div>
    );

  if (error)
    return (
      <div className="text-red-600">
        {error}
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          User Management
        </h1>

        <input
          type="text"
          placeholder="Search user..."
          className="border rounded-lg px-4 py-2 w-72"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">
                Name
              </th>

              <th className="p-3 text-left">
                Email
              </th>

              <th className="p-3 text-left">
                Role
              </th>

              <th className="p-3 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="border-t"
              >
                <td className="p-3">
                  {user.name}
                </td>

                <td className="p-3">
                  {user.email}
                </td>

                <td className="p-3">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(
                        user._id,
                        e.target.value
                      )
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="User">
                      User
                    </option>

                    <option value="Vendor">
                      Vendor
                    </option>

                    <option value="Admin">
                      Admin
                    </option>
                  </select>
                </td>

                <td className="p-3 text-center">
                  <button
                    onClick={() =>
                      handleDelete(user._id)
                    }
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-8 text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;