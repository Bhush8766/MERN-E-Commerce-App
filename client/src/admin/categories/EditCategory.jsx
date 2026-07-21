import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import CategoryForm from "./CategoryForm";

import {
  getCategory,
  updateCategory,
  clearCategoryError,
  clearSelectedCategory,
} from "../../redux/categorySlice";

const EditCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    selectedCategory,
    loading,
    error,
  } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategory(id));

    return () => {
      dispatch(clearSelectedCategory());
      dispatch(clearCategoryError());
    };
  }, [dispatch, id]);

  const submitHandler = async (formData) => {
    const result = await dispatch(
      updateCategory({
        id,
        categoryData: formData,
      })
    );

    if (updateCategory.fulfilled.match(result)) {
      navigate("/admin/categories");
    }
  };

  if (loading && !selectedCategory) {
    return (
      <div className="text-center py-10">
        Loading Category...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">

      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Edit Category
        </h1>

        <p className="text-gray-500 mt-2">
          Update category information.
        </p>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-5">
          {error}
        </div>
      )}

      {selectedCategory && (
        <CategoryForm
          initialData={selectedCategory}
          onSubmit={submitHandler}
          loading={loading}
        />
      )}
    </div>
  );
};

export default EditCategory;