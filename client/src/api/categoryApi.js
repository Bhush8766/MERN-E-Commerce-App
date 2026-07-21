import axiosInstance from "./axiosInstance";

// ==========================
// GET ALL CATEGORIES
// ==========================

export const getCategoriesApi = async () => {
  const response = await axiosInstance.get("/categories");
  return response.data;
};

// ==========================
// GET SINGLE CATEGORY
// ==========================

export const getCategoryApi = async (id) => {
  const response = await axiosInstance.get(`/categories/${id}`);
  return response.data;
};
// ==========================
// CREATE CATEGORY
// ==========================

export const createCategoryApi = async (data) => {
  const response = await axiosInstance.post(
    "/categories",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// ==========================
// UPDATE CATEGORY
// ==========================

export const updateCategoryApi = async (id, data) => {
  const response = await axiosInstance.put(
    `/categories/${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// ==========================
// DELETE CATEGORY
// ==========================

export const deleteCategoryApi = async (id) => {
  const response = await axiosInstance.delete(
    `/categories/${id}`
  );

  return response.data;
};