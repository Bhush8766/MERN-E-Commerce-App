import axiosInstance from "./axiosInstance";

// ======================================================
// VENDOR DASHBOARD
// ======================================================

export const getVendorDashboardApi =
  async () => {
    const { data } =
      await axiosInstance.get(
        "/vendor/dashboard"
      );

    return data;
  };

// ======================================================
// GET VENDOR PRODUCTS
// ======================================================

export const getVendorProductsApi =
  async () => {
    const { data } =
      await axiosInstance.get(
        "/vendor/products"
      );

    return data;
  };

// ======================================================
// GET SINGLE VENDOR PRODUCT
// ======================================================

export const getVendorProductApi =
  async (id) => {
    const { data } =
      await axiosInstance.get(
        `/vendor/products/${id}`
      );

    return data;
  };

// ======================================================
// CREATE VENDOR PRODUCT
// ======================================================

export const createVendorProductApi =
  async (productData) => {
    const { data } =
      await axiosInstance.post(
        "/vendor/products",
        productData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return data;
  };

// ======================================================
// UPDATE VENDOR PRODUCT
// ======================================================

export const updateVendorProductApi =
  async (
    id,
    productData
  ) => {
    const { data } =
      await axiosInstance.put(
        `/vendor/products/${id}`,
        productData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return data;
  };

// ======================================================
// DELETE VENDOR PRODUCT
// ======================================================

export const deleteVendorProductApi =
  async (id) => {
    const { data } =
      await axiosInstance.delete(
        `/vendor/products/${id}`
      );

    return data;
  };

// ======================================================
// VENDOR ORDERS
// ======================================================

export const getVendorOrdersApi =
  async () => {
    const { data } =
      await axiosInstance.get(
        "/vendor/orders"
      );

    return data;
  };

// ======================================================
// VENDOR EARNINGS
// ======================================================

export const getVendorEarningsApi =
  async () => {
    const { data } =
      await axiosInstance.get(
        "/vendor/earnings"
      );

    return data;
  };