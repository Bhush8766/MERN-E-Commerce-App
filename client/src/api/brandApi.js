import axiosInstance from "./axiosInstance";

// ==========================
// GET ALL BRANDS
// ==========================

export const getBrandsApi = async () => {
  const response = await axiosInstance.get("/brands");
  return response.data;
};

// ==========================
// GET SINGLE BRAND
// ==========================

export const getBrandApi = async (id) => {
  const response = await axiosInstance.get(`/brands/${id}`);
  return response.data;
};

// ==========================
// CREATE BRAND
// ==========================

export const createBrandApi = async (brandData) => {
  const response = await axiosInstance.post(
    "/brands",
    brandData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// ==========================
// UPDATE BRAND
// ==========================

export const updateBrandApi = async (id, brandData) => {
  const response = await axiosInstance.put(
    `/brands/${id}`,
    brandData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// ==========================
// DELETE BRAND
// ==========================

export const deleteBrandApi = async (id) => {
  const response = await axiosInstance.delete(`/brands/${id}`);
  return response.data;
};