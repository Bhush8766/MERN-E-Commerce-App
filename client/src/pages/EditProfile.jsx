import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User, Mail, Phone, Camera } from "lucide-react";

import {
  getProfile,
  updateProfile,
  clearUserState,
} from "../redux/userSlice";

function EditProfile() {
  const dispatch = useDispatch();

  const {
    profile,
    loading,
    success,
    error,
  } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [preview, setPreview] = useState("");

  // Load profile from backend
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  // Fill form when profile is loaded
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
      });

      setPreview(profile.avatar?.url || "");
    }
  }, [profile]);

  // Show success message
  useEffect(() => {
    if (success) {
      alert("Profile updated successfully.");
      dispatch(clearUserState());
    }
  }, [success, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Preview only.
    // Avatar upload will be connected later when backend supports it.
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateProfile(formData));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">
          Edit Profile
        </h1>

        {error && (
          <div className="mb-6 bg-red-100 text-red-600 p-3 rounded-lg">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Avatar */}

          <div className="flex flex-col items-center">

            <div className="relative">

              <img
                src={
                  preview ||
                  "https://ui-avatars.com/api/?name=User"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-600"
              />

              <label className="absolute bottom-0 right-0 bg-blue-600 p-3 rounded-full text-white cursor-pointer">

                <Camera size={18} />

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImage}
                />

              </label>

            </div>

          </div>

          {/* Name */}

          <div>

            <label className="font-medium">
              Full Name
            </label>

            <div className="relative mt-2">

              <User
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg py-3 pl-11 pr-4"
                required
              />

            </div>

          </div>

          {/* Email */}

          <div>

            <label className="font-medium">
              Email
            </label>

            <div className="relative mt-2">

              <Mail
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg py-3 pl-11 pr-4"
                required
              />

            </div>

          </div>

          {/* Phone */}

          <div>

            <label className="font-medium">
              Phone Number
            </label>

            <div className="relative mt-2">

              <Phone
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-lg py-3 pl-11 pr-4"
              />

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:bg-gray-400"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditProfile;