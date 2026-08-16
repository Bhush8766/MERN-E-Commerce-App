import {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  Upload,
  Loader2,
} from "lucide-react";

import {
  createVendorProduct,
} from "../redux/vendorSlice";

import {
  getCategories,
} from "../redux/categorySlice";

import {
  getBrands,
} from "../redux/brandSlice";

const AddProduct = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    creatingProduct,
    error,
  } = useSelector(
    (state) => state.vendor
  );

  const {
    categories = [],
  } = useSelector(
    (state) => state.category
  );

  const {
    brands = [],
  } = useSelector(
    (state) => state.brand
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    shortDescription: "",
    category: "",
    brand: "",
    price: "",
    stock: "",
    discountPrice: "",
    costPrice: "",
    colors: "",
    sizes: "",
    tags: "",
    shippingCharge: "",
    freeShipping: false,
    weight: "",
    warranty: "",
    returnPolicy: "",
    website: "",
  });

  const [thumbnail, setThumbnail] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  // ==================================================
  // LOAD CATEGORY + BRAND
  // ==================================================

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);

  // ==================================================
  // CLEAN PREVIEW
  // ==================================================

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // ==================================================
  // HANDLE CHANGE
  // ==================================================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // ==================================================
  // IMAGE
  // ==================================================

  const handleImageChange = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    setThumbnail(file);

    setPreview(
      URL.createObjectURL(file)
    );
  };

  // ==================================================
  // SUBMIT
  // ==================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Product title is required");
      return;
    }

    if (!formData.description.trim()) {
      alert("Product description is required");
      return;
    }

    if (!formData.category) {
      alert("Please select category");
      return;
    }

    if (!formData.brand) {
      alert("Please select brand");
      return;
    }

    if (
      formData.price === "" ||
      Number(formData.price) < 0
    ) {
      alert("Valid price is required");
      return;
    }

    if (
      formData.stock === "" ||
      Number(formData.stock) < 0
    ) {
      alert("Valid stock is required");
      return;
    }

    const data = new FormData();

    Object.entries(formData).forEach(
      ([key, value]) => {
        data.append(key, value);
      }
    );

    if (thumbnail) {
      data.append(
        "thumbnail",
        thumbnail
      );
    }

    const result = await dispatch(
      createVendorProduct(data)
    );

    if (
      createVendorProduct.fulfilled.match(
        result
      )
    ) {
      alert(
        "Product created successfully"
      );

      navigate("/vendor/products");
    }
  };

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen">

      {/* HEADER */}

      <div className="mb-8">

        <button
          type="button"
          onClick={() =>
            navigate("/vendor/products")
          }
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-3"
        >
          <ArrowLeft size={18} />

          Back to Products
        </button>

        <h1 className="text-3xl font-bold text-gray-800">
          Add Product
        </h1>

        <p className="text-gray-500 mt-1">
          Add a new product to your store.
        </p>

      </div>

      {/* ERROR */}

      {error && (
        <div className="bg-red-100 text-red-700 border border-red-200 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* BASIC */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-6">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div className="md:col-span-2">

              <label className="block font-medium mb-2">
                Product Title *
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter product title"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <div className="md:col-span-2">

              <label className="block font-medium mb-2">
                Short Description
              </label>

              <input
                type="text"
                name="shortDescription"
                value={
                  formData.shortDescription
                }
                onChange={handleChange}
                placeholder="Short product description"
                className="w-full border rounded-lg px-4 py-3"
              />

            </div>

            <div className="md:col-span-2">

              <label className="block font-medium mb-2">
                Description *
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Enter complete product description"
                className="w-full border rounded-lg px-4 py-3"
              />

            </div>

          </div>

        </div>

        {/* CATEGORY / BRAND */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-6">
            Category & Brand
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>

              <label className="block font-medium mb-2">
                Category *
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 bg-white"
              >
                <option value="">
                  Select Category
                </option>

                {categories.map(
                  (category) => (
                    <option
                      key={category._id}
                      value={category._id}
                    >
                      {category.name}
                    </option>
                  )
                )}

              </select>

            </div>

            <div>

              <label className="block font-medium mb-2">
                Brand *
              </label>

              <select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 bg-white"
              >
                <option value="">
                  Select Brand
                </option>

                {brands.map(
                  (brand) => (
                    <option
                      key={brand._id}
                      value={brand._id}
                    >
                      {brand.name}
                    </option>
                  )
                )}

              </select>

            </div>

          </div>

        </div>

        {/* PRICING */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-6">
            Pricing & Inventory
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

            <div>
              <label className="block font-medium mb-2">
                Price *
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Discount Price
              </label>

              <input
                type="number"
                name="discountPrice"
                value={
                  formData.discountPrice
                }
                onChange={handleChange}
                min="0"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Cost Price
              </label>

              <input
                type="number"
                name="costPrice"
                value={formData.costPrice}
                onChange={handleChange}
                min="0"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Stock *
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

          </div>

        </div>

        {/* OPTIONS */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-6">
            Product Options
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <div>
              <label className="block font-medium mb-2">
                Colors
              </label>

              <input
                type="text"
                name="colors"
                value={formData.colors}
                onChange={handleChange}
                placeholder="Red, Blue, Black"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Sizes
              </label>

              <input
                type="text"
                name="sizes"
                value={formData.sizes}
                onChange={handleChange}
                placeholder="S, M, L, XL"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Tags
              </label>

              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="fashion, shirt, men"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

          </div>

        </div>

        {/* SHIPPING */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-6">
            Shipping
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <div>
              <label className="block font-medium mb-2">
                Shipping Charge
              </label>

              <input
                type="number"
                name="shippingCharge"
                value={
                  formData.shippingCharge
                }
                onChange={handleChange}
                min="0"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Weight
              </label>

              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="500g"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div className="flex items-center gap-3 mt-8">

              <input
                type="checkbox"
                name="freeShipping"
                checked={
                  formData.freeShipping
                }
                onChange={handleChange}
                className="w-5 h-5"
              />

              <label className="font-medium">
                Free Shipping
              </label>

            </div>

          </div>

        </div>

        {/* IMAGE */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-6">
            Product Image
          </h2>

          <label className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500">

            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-48 h-48 object-cover rounded-lg"
              />
            ) : (
              <>
                <Upload
                  size={40}
                  className="text-gray-400"
                />

                <p className="mt-3 text-gray-500">
                  Click to upload product image
                </p>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={
                handleImageChange
              }
              className="hidden"
            />

          </label>

        </div>

        {/* ADDITIONAL */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-6">
            Additional Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <div>
              <label className="block font-medium mb-2">
                Warranty
              </label>

              <input
                type="text"
                name="warranty"
                value={formData.warranty}
                onChange={handleChange}
                placeholder="1 Year"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Return Policy
              </label>

              <input
                type="text"
                name="returnPolicy"
                value={
                  formData.returnPolicy
                }
                onChange={handleChange}
                placeholder="7 Days"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Website
              </label>

              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

          </div>

        </div>

        {/* BUTTONS */}

        <div className="flex justify-end gap-4">

          <button
            type="button"
            onClick={() =>
              navigate("/vendor/products")
            }
            className="px-6 py-3 border rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={creatingProduct}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg flex items-center gap-2 disabled:opacity-50"
          >

            {creatingProduct && (
              <Loader2
                size={18}
                className="animate-spin"
              />
            )}

            Create Product

          </button>

        </div>

      </form>
    </div>
  );
};

export default AddProduct;