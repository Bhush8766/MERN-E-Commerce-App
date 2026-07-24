import axiosInstance from "./axiosInstance";

// Get Wishlist
export const getWishlistApi = async () => {
  const { data } = await axiosInstance.get("/wishlist");
  return data;
};

// Add Wishlist
export const addWishlistApi = async (productId) => {
  const { data } = await axiosInstance.post("/wishlist/add", {
    productId,
  });

  return data;
};

// Remove Wishlist
export const removeWishlistApi = async (id) => {
  const { data } = await axiosInstance.delete(
    `/wishlist/remove/${id}`
  );

  return data;
};

// Clear Wishlist
export const clearWishlistApi = async () => {
  const { data } = await axiosInstance.delete("/wishlist/clear");
  return data;
};

// Wishlist Count
export const getWishlistCountApi = async () => {
  const { data } = await axiosInstance.get("/wishlist/count");
  return data;
};