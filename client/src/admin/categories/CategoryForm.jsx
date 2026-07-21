import { useState, useEffect } from "react";

const CategoryForm = ({
  initialData = {},
  onSubmit,
  loading,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
      setPreview(initialData.image?.url || "");
    }
  }, [initialData]);

  const imageHandler = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white rounded-xl shadow p-6 space-y-6"
    >
      <div>
        <label className="block mb-2 font-semibold">
          Category Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg p-3"
          placeholder="Enter category name"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">
          Description
        </label>

        <textarea
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-lg p-3"
          placeholder="Category description"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">
          Category Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={imageHandler}
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-4 h-32 w-32 object-cover rounded-lg border"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
      >
        {loading ? "Saving..." : "Save Category"}
      </button>
    </form>
  );
};

export default CategoryForm;