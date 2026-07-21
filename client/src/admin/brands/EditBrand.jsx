import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import BrandForm from "./BrandForm";

import {
  getBrand,
  updateBrand,
  clearBrandError,
  clearSelectedBrand,
} from "../../redux/brandSlice";

const EditBrand = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    selectedBrand,
    loading,
    error,
  } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(getBrand(id));

    return () => {
      dispatch(clearSelectedBrand());
      dispatch(clearBrandError());
    };
  }, [dispatch, id]);

  const submitHandler = async (formData) => {
    const result = await dispatch(
      updateBrand({
        id,
        brandData: formData,
      })
    );

    if (updateBrand.fulfilled.match(result)) {
      navigate("/admin/brands");
    }
  };

  if (loading && !selectedBrand) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Edit Brand
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-5">
          {error}
        </div>
      )}

      {selectedBrand && (
        <BrandForm
          initialData={selectedBrand}
          onSubmit={submitHandler}
          loading={loading}
        />
      )}

    </div>
  );
};

export default EditBrand;