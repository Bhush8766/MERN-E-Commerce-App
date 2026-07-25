const ProductFilter = ({
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  sort,
  setSort,
  categories,
  brands,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  resetFilters,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-5">

      <h2 className="text-2xl font-bold">
        Filters
      </h2>

      {/* Search */}
      <div>
        <label className="font-medium block mb-2">
          Search
        </label>

        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Category */}
      <div>
        <label className="font-medium block mb-2">
          Category
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded-lg px-4 py-3"
        >
          <option value="">All Categories</option>

          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Brand */}
      <div>
        <label className="font-medium block mb-2">
          Brand
        </label>

        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full border rounded-lg px-4 py-3"
        >
          <option value="">All Brands</option>

          {brands.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div>
        <label className="font-medium block mb-2">
          Price Range
        </label>

        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      {/* Sort */}
      <div>
        <label className="font-medium block mb-2">
          Sort
        </label>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full border rounded-lg px-4 py-3"
        >
          <option value="">Newest</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
        </select>
      </div>

      <button
        onClick={resetFilters}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition"
      >
        Clear Filters
      </button>

    </div>
  );
};

export default ProductFilter;