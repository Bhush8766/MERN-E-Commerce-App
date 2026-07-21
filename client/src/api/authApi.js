import axiosInstance from "./axiosInstance";

// ==========================
// Register User
// ==========================
export const registerUserApi = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data;
};

// ==========================
// Login User
// ==========================
export const loginUserApi = async (userData) => {
  const response = await axiosInstance.post("/auth/login", userData);
  return response.data;
};

// ==========================
// Get Logged In User
// ==========================
export const getProfileApi = async () => {
  const response = await axiosInstance.get("/auth/profile");
  return response.data;
};

// ==========================
// Logout
// ==========================
export const logoutApi = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};