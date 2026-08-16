import axiosInstance from "./axiosInstance";

// =====================================================
// PROFILE
// =====================================================

// ==========================================
// GET MY PROFILE
// GET /api/users/profile
// ==========================================

export const getProfileApi = async () => {
  return await axiosInstance.get(
    "/users/profile"
  );
};

// ==========================================
// UPDATE MY PROFILE
// PUT /api/users/profile
// ==========================================

export const updateProfileApi = async (
  data
) => {
  return await axiosInstance.put(
    "/users/profile",
    data
  );
};

// =====================================================
// PASSWORD
// =====================================================

// ==========================================
// CHANGE PASSWORD
// PUT /api/users/change-password
// ==========================================

export const changePasswordApi = async (
  data
) => {
  return await axiosInstance.put(
    "/users/change-password",
    data
  );
};

// =====================================================
// ADMIN USER MANAGEMENT
// =====================================================

// ==========================================
// GET ALL USERS
// GET /api/users
// ==========================================

export const getUsersApi = async () => {
  const { data } =
    await axiosInstance.get(
      "/users"
    );

  return data;
};

// ==========================================
// GET SINGLE USER
// GET /api/users/:id
// ==========================================

export const getUserByIdApi = async (
  id
) => {
  const { data } =
    await axiosInstance.get(
      `/users/${id}`
    );

  return data;
};

// ==========================================
// UPDATE USER
// PUT /api/users/:id
// ==========================================

export const updateUserApi = async (
  id,
  userData
) => {
  const { data } =
    await axiosInstance.put(
      `/users/${id}`,
      userData
    );

  return data;
};

// ==========================================
// BLOCK USER
// PATCH /api/users/block/:id
// ==========================================

export const blockUserApi = async (
  id
) => {
  const { data } =
    await axiosInstance.patch(
      `/users/block/${id}`
    );

  return data;
};

// ==========================================
// UNBLOCK USER
// PATCH /api/users/unblock/:id
// ==========================================

export const unblockUserApi = async (
  id
) => {
  const { data } =
    await axiosInstance.patch(
      `/users/unblock/${id}`
    );

  return data;
};

// ==========================================
// UPDATE USER ROLE
// PATCH /api/users/role/:id
// ==========================================

export const updateUserRoleApi = async (
  id,
  role
) => {
  const { data } =
    await axiosInstance.patch(
      `/users/role/${id}`,
      {
        role,
      }
    );

  return data;
};

// ==========================================
// DELETE USER
// DELETE /api/users/:id
// ==========================================

export const deleteUserApi = async (
  id
) => {
  const { data } =
    await axiosInstance.delete(
      `/users/${id}`
    );

  return data;
};

// =====================================================
// SAVED ADDRESS API
// =====================================================

// ==========================================
// GET ADDRESSES
// ==========================================

export const getAddressesApi = async () => {
  return await axiosInstance.get(
    "/users/addresses"
  );
};

// ==========================================
// ADD ADDRESS
// ==========================================

export const addAddressApi = async (
  data
) => {
  return await axiosInstance.post(
    "/users/addresses",
    data
  );
};

// ==========================================
// UPDATE ADDRESS
// ==========================================

export const updateAddressApi = async (
  id,
  data
) => {
  return await axiosInstance.put(
    `/users/addresses/${id}`,
    data
  );
};

// ==========================================
// DELETE ADDRESS
// ==========================================

export const deleteAddressApi = async (
  id
) => {
  return await axiosInstance.delete(
    `/users/addresses/${id}`
  );
};

// ==========================================
// SET DEFAULT ADDRESS
// ==========================================

export const setDefaultAddressApi =
  async (id) => {
    return await axiosInstance.put(
      `/users/addresses/default/${id}`
    );
  };