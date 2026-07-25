import axiosInstance from "./axiosInstance";

// =====================================
// CUSTOMER PROFILE APIs
// =====================================

// Get Logged-in User Profile
export const getProfileApi = async () => {
  const { data } = await axiosInstance.get("/users/profile");
  return data;
};

// Update Logged-in User Profile
export const updateProfileApi = async (userData) => {
  const { data } = await axiosInstance.put(
    "/users/profile",
    userData
  );

  return data;
};

// =====================================
// ADMIN APIs
// =====================================

// Get All Users
export const getUsersApi = async () => {
  const { data } = await axiosInstance.get("/users");
  return data;
};

// Update User Role
export const updateUserRoleApi = async (id, role) => {
  const { data } = await axiosInstance.patch(
    `/users/role/${id}`,
    { role }
  );

  return data;
};

// Delete User
export const deleteUserApi = async (id) => {
  const { data } = await axiosInstance.delete(`/users/${id}`);
  return data;
};