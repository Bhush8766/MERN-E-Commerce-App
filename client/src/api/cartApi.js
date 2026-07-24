import axiosInstance from "./axiosInstance";

// ===============================
// Get My Cart
// ===============================
export const getCartApi = async () => {
  const { data } = await axiosInstance.get("/cart/getMyCart");
  return data;
};

// ===============================
// Add To Cart
// ===============================
export const addToCartApi = async (cartData) => {
  const { data } = await axiosInstance.post(
    "/cart/addToCart",
    cartData
  );

  return data;
};

// ===============================
// Update Quantity
// ===============================
export const updateCartApi = async (id, quantity) => {
  const { data } = await axiosInstance.patch(
    `/cart/updateQuantity/${id}`,
    {
      quantity,
    }
  );

  return data;
};

// ===============================
// Remove Item
// ===============================
export const removeCartApi = async (id) => {
  const { data } = await axiosInstance.delete(
    `/cart/removeFromCart/${id}`
  );

  return data;
};

// ===============================
// Clear Cart
// ===============================
export const clearCartApi = async () => {
  const { data } = await axiosInstance.delete(
    "/cart/clearCart"
  );

  return data;
};

// ===============================
// Cart Count
// ===============================
export const getCartCountApi = async () => {
  const { data } = await axiosInstance.get(
    "/cart/getCartCount"
  );

  return data;
};

// ===============================
// Cart Total
// ===============================
export const getCartTotalApi = async () => {
  const { data } = await axiosInstance.get(
    "/cart/getCartTotal"
  );

  return data;
};