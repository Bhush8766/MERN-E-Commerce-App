import { useState, useEffect } from "react";

function BrandForm({
  initialData = {},
  onSubmit,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    country: "",
    logo: null,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        website: initialData.website || "",
        country: initialData.country || "",
        logo: null,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "logo") {
      setFormData((prev) => ({
        ...prev,
        logo: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("website", formData.website);
    data.append("country", formData.country);

    if (formData.logo) {
      data.append("logo", formData.logo);
    }

    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow space-y-5"
    >
      <div>
        <label className="block mb-1 font-semibold">
          Brand Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          placeholder="Apple"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">
          Description
        </label>

        <textarea
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">
          Website
        </label>

        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          placeholder="https://apple.com"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">
          Country
        </label>

        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          placeholder="USA"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">
          Logo
        </label>

        <input
          type="file"
          name="logo"
          accept="image/*"
          onChange={handleChange}
          className="w-full"
        />

        {initialData?.logo?.url && (
          <img
            src={initialData.logo.url}
            alt="Brand"
            className="w-24 h-24 mt-3 object-cover rounded"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
      >
        {loading ? "Saving..." : "Save Brand"}
      </button>
    </form>
  );
}

export default BrandForm;