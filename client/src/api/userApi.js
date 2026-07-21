import axiosInstance from "./axiosInstance";

// =========================
// GET ALL USERS
// =========================

export const getUsersApi = async () => {
  const { data } = await axiosInstance.get("/users");
  return data;
};

// =========================
// UPDATE ROLE
// =========================

export const updateUserRoleApi = async (id, role) => {
  const { data } = await axiosInstance.put(`/users/${id}`, {
    role,
  });

  return data;
};

// =========================
// DELETE USER
// =========================

export const deleteUserApi = async (id) => {
  const { data } = await axiosInstance.delete(`/users/${id}`);
  return data;
};