import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import BrandForm from "./BrandForm";

import {
  createBrand,
  clearBrandError,
} from "../../redux/brandSlice";

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading,
    error,
  } = useSelector((state) => state.brand);

  const submitHandler = async (formData) => {
    const result = await dispatch(
      createBrand(formData)
    );

    if (createBrand.fulfilled.match(result)) {
      navigate("/admin/brands");
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearBrandError());
    };
  }, [dispatch]);

  return (
    <div className="max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Add Brand
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-5">
          {error}
        </div>
      )}

      <BrandForm
        onSubmit={submitHandler}
        loading={loading}
      />

    </div>
  );
};

export default AddBrand;