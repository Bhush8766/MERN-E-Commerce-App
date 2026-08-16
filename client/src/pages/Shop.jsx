import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "../redux/productSlice";

import ProductCard from "../components/ProductCard";
import ProductFilter from "../components/ProductFilter";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";


const Shop = () => {    
  const dispatch = useDispatch();

  const { products, loading } = useSelector(
    (state) => state.product
  );    
    
  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 9;



    // ============================
  // Fetch Products
  // ============================

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // ============================
  // Reset Pagination When Filters Change
  // ============================

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    category,
    brand,
    sort,
    minPrice,
    maxPrice,
  ]);

  // ============================
  // Categories
  // ============================

  const categories = useMemo(() => {
    return [
      ...new Set(
        products
          .map((item) => item.category?.name)
          .filter(Boolean)
      ),
    ];
  }, [products]);

  // ============================
  // Brands
  // ============================

  const brands = useMemo(() => {
    return [
      ...new Set(
        products
          .map((item) => item.brand?.name)
          .filter(Boolean)
      ),
    ];
  }, [products]);

  // ============================
  // Filter Products
  // ============================

  let filteredProducts = products.filter((product) => {
    const matchSearch = product.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory = category
      ? product.category?.name === category
      : true;

    const matchBrand = brand
      ? product.brand?.name === brand
      : true;

    const matchMinPrice =
      minPrice === ""
        ? true
        : product.price >= Number(minPrice);

    const matchMaxPrice =
      maxPrice === ""
        ? true
        : product.price <= Number(maxPrice);

    return (
      matchSearch &&
      matchCategory &&
      matchBrand &&
      matchMinPrice &&
      matchMaxPrice
    );
  });

  // ============================
  // Sorting
  // ============================

  switch (sort) {
    case "low":
      filteredProducts.sort(
        (a, b) => a.price - b.price
      );
      break;

    case "high":
      filteredProducts.sort(
        (a, b) => b.price - a.price
      );
      break;

    case "az":
      filteredProducts.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      break;

    case "za":
      filteredProducts.sort((a, b) =>
        b.title.localeCompare(a.title)
      );
      break;

    default:
      break;
  }

  // ============================
  // Pagination
  // ============================

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const indexOfLastProduct =
    currentPage * productsPerPage;

  const indexOfFirstProduct =
    indexOfLastProduct - productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );



    // ============================
// Reset All Filters
// ============================

const resetFilters = () => {
  setSearch("");
  setCategory("");
  setBrand("");
  setSort("");
  setMinPrice("");
  setMaxPrice("");
  setCurrentPage(1);
};


      return (
    <div className="bg-gray-100 min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold">
            Shop Products
          </h1>

          <p className="mt-3 text-blue-100">
            Discover amazing products at the best prices.
          </p>

        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid lg:grid-cols-4 gap-8">

          {/* Sidebar */}
          <div>

            <ProductFilter
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              brand={brand}
              setBrand={setBrand}
              sort={sort}
              setSort={setSort}
              categories={categories}
              brands={brands}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              resetFilters={resetFilters}
            />

          </div>

          {/* Product Section */}
          <div className="lg:col-span-3">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

              <h2 className="text-3xl font-bold">
                Products ({filteredProducts.length})
              </h2>

            </div>

            {/* Active Filters */}

            <div className="flex flex-wrap gap-2 mb-6">

              {search && (
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  Search : {search}
                </span>
              )}

              {category && (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  {category}
                </span>
              )}

              {brand && (
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                  {brand}
                </span>
              )}

              {minPrice && (
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                  Min ₹{minPrice}
                </span>
              )}

              {maxPrice && (
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                  Max ₹{maxPrice}
                </span>
              )}

            </div>

            {/* Loading */}

            {loading ? (

              <Loader />

            ) : filteredProducts.length === 0 ? (

              <div className="bg-white rounded-xl shadow p-12 text-center">

                <h2 className="text-2xl font-bold">
                  No Products Found
                </h2>

                <p className="text-gray-500 mt-3">
                  Try changing your filters.
                </p>

                <button
                  onClick={resetFilters}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                >
                  Clear Filters
                </button>

              </div>

            ) : (

              <>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">

                  {currentProducts.map((product) => (

                    <ProductCard
                      key={product._id}
                      product={product}
                    />

                  ))}

                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />

              </>

            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Shop;