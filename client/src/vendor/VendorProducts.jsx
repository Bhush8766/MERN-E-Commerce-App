import { useEffect } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  Plus,
  Edit,
  Trash2,
  Loader2,
  Package,
} from "lucide-react";

import {
  getVendorProducts,
  deleteVendorProduct,
} from "../redux/vendorSlice";

const VendorProducts = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    products = [],
    productLoading,
    error,
    deletingProductId,
  } = useSelector(
    (state) => state.vendor
  );

  // ==================================================
  // LOAD PRODUCTS
  // ==================================================

  useEffect(() => {
    dispatch(getVendorProducts());
  }, [dispatch]);

  // ==================================================
  // DELETE
  // ==================================================

  const handleDelete = async (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmed) return;

    const result = await dispatch(
      deleteVendorProduct(id)
    );

    if (
      deleteVendorProduct.fulfilled.match(
        result
      )
    ) {
      alert(
        "Product deleted successfully"
      );
    }
  };

  // ==================================================
  // IMAGE
  // ==================================================

  const getImage = (product) => {
    const image =
      product?.thumbnail?.url;

    if (!image) {
      return "/no-image.png";
    }

    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    return `http://localhost:5000/${image.replace(
      /\\/g,
      "/"
    )}`;
  };

  // ==================================================
  // LOADING
  // ==================================================

  if (productLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">

        <div className="flex items-center gap-3 text-gray-600">

          <Loader2
            size={24}
            className="animate-spin"
          />

          <span>
            Loading products...
          </span>

        </div>

      </div>
    );
  }

  // ==================================================
  // PAGE
  // ==================================================

  return (
    <div className="p-8">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            My Products
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your vendor products.
          </p>

        </div>

        <Link
          to="/vendor/products/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center gap-2 transition"
        >
          <Plus size={20} />

          Add Product
        </Link>

      </div>

      {/* ERROR */}

      {error && (
        <div className="bg-red-100 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* EMPTY */}

      {products.length === 0 ? (

        <div className="bg-white rounded-xl shadow p-10 text-center">

          <Package
            size={60}
            className="mx-auto text-gray-300"
          />

          <h2 className="text-xl font-bold mt-4">
            No Products Found
          </h2>

          <p className="text-gray-500 mt-2">
            Start by adding your first product.
          </p>

          <Link
            to="/vendor/products/add"
            className="inline-flex items-center gap-2 mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            <Plus size={18} />

            Add Product
          </Link>

        </div>

      ) : (

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr>

                  <th className="text-left p-4">
                    Product
                  </th>

                  <th className="text-left p-4">
                    Category
                  </th>

                  <th className="text-left p-4">
                    Price
                  </th>

                  <th className="text-left p-4">
                    Stock
                  </th>

                  <th className="text-left p-4">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {products.map(
                  (product) => (

                    <tr
                      key={product._id}
                      className="border-t hover:bg-gray-50 transition"
                    >

                      {/* PRODUCT */}

                      <td className="p-4">

                        <div className="flex items-center gap-3">

                          <img
                            src={getImage(
                              product
                            )}
                            alt={
                              product.title ||
                              "Product"
                            }
                            className="w-14 h-14 object-cover rounded-lg border"
                          />

                          <div>

                            <p className="font-semibold">
                              {product.title}
                            </p>

                            {product.sku && (
                              <p className="text-xs text-gray-500 mt-1">
                                SKU:{" "}
                                {product.sku}
                              </p>
                            )}

                          </div>

                        </div>

                      </td>

                      {/* CATEGORY */}

                      <td className="p-4">
                        {product.category
                          ?.name ||
                          product.category ||
                          "N/A"}
                      </td>

                      {/* PRICE */}

                      <td className="p-4 font-semibold">

                        ₹
                        {Number(
                          product.price || 0
                        ).toLocaleString(
                          "en-IN"
                        )}

                      </td>

                      {/* STOCK */}

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            product.stock ===
                            0
                              ? "bg-red-100 text-red-700"
                              : product.stock <=
                                5
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {product.stock}
                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td className="p-4">

                        <div className="flex gap-2">

                          {/* EDIT */}

                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/vendor/products/edit/${product._id}`
                              )
                            }
                            className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition"
                            title="Edit Product"
                          >
                            <Edit
                              size={18}
                            />
                          </button>

                          {/* DELETE */}

                          <button
                            type="button"
                            disabled={
                              deletingProductId ===
                              product._id
                            }
                            onClick={() =>
                              handleDelete(
                                product._id
                              )
                            }
                            className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete Product"
                          >

                            {deletingProductId ===
                            product._id ? (
                              <Loader2
                                size={18}
                                className="animate-spin"
                              />
                            ) : (
                              <Trash2
                                size={18}
                              />
                            )}

                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>
  );
};

export default VendorProducts;