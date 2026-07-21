import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CategoryForm from "./CategoryForm";

import {
  createCategory,
  clearCategoryError,
} from "../../redux/categorySlice";

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading,
    error,
    categories,
  } = useSelector((state) => state.category);

  const submitHandler = async (formData) => {
    const result = await dispatch(createCategory(formData));

    if (createCategory.fulfilled.match(result)) {
      navigate("/admin/categories");
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearCategoryError());
    };
  }, [dispatch]);

  return (
    <div className="max-w-3xl mx-auto">

      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Add Category
        </h1>

        <p className="text-gray-500 mt-2">
          Create a new product category.
        </p>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-5">
          {error}
        </div>
      )}

      <CategoryForm
        onSubmit={submitHandler}
        loading={loading}
      />
    </div>
  );
};

export default AddCategory;