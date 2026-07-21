import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  getBrands,
  deleteBrand,
} from "../../redux/brandSlice";

const BrandList = () => {
  const dispatch = useDispatch();

  const {
    brands,
    loading,
    error,
  } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const deleteHandler = (id) => {
    const confirmDelete = window.confirm(
      "Delete this brand?"
    );

    if (!confirmDelete) return;

    dispatch(deleteBrand(id));
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-2xl font-bold">
            Brand Management
          </h2>

          <p className="text-gray-500">
            Total Brands : {brands.length}
          </p>

        </div>

        <Link
          to="/admin/brands/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Brand
        </Link>

      </div>

      {/* Loading */}

      {loading && (
        <div className="text-center py-10">
          Loading...
        </div>
      )}

      {/* Error */}

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-5">
          {error}
        </div>
      )}

      {/* Table */}

      {!loading && (

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-gray-100 border-b">

                <th className="p-3 text-left">
                  Logo
                </th>

                <th className="p-3 text-left">
                  Brand
                </th>

                <th className="p-3 text-left">
                  Website
                </th>

                <th className="p-3 text-left">
                  Country
                </th>

                <th className="p-3 text-left">
                  Products
                </th>

                <th className="p-3 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {brands.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-8 text-gray-500"
                  >
                    No Brands Found
                  </td>

                </tr>

              ) : (

                brands.map((brand) => (

                  <tr
                    key={brand._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-3">

                      <img
                        src={
                          brand.logo?.url ||
                          "https://via.placeholder.com/60"
                        }
                        alt={brand.name}
                        className="w-14 h-14 rounded object-cover"
                      />

                    </td>

                    <td className="p-3 font-semibold">
                      {brand.name}
                    </td>

                    <td className="p-3">
                      {brand.website || "-"}
                    </td>

                    <td className="p-3">
                      {brand.country || "-"}
                    </td>

                    <td className="p-3">
                      {brand.productCount || 0}
                    </td>

                    <td className="p-3">

                      <div className="flex justify-center gap-2">

                        <Link
                          to={`/admin/brands/edit/${brand._id}`}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => deleteHandler(brand._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
};

export default BrandList;