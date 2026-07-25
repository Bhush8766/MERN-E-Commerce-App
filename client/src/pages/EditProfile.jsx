import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { User, Mail, Phone, Camera } from "lucide-react";

function EditProfile() {
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: null,
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        avatar: null,
      });

      setPreview(user.avatar?.url || "");
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData({
      ...formData,
      avatar: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Profile Data", formData);

    // TODO:
    // dispatch(updateProfile(formData));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">
          Edit Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div className="flex flex-col items-center">

            <div className="relative">

              <img
                src={
                  preview ||
                  "https://ui-avatars.com/api/?name=User"
                }
                alt="Avatar"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
              />

              <label
                className="absolute bottom-0 right-0 bg-blue-600 p-3 rounded-full text-white cursor-pointer"
              >
                <Camera size={18} />

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImage}
                />
              </label>

            </div>

          </div>

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
              />

            </div>

          </div>

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
              />

            </div>

          </div>

          <div>

            <label className="font-medium">
              Phone
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            Save Changes
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditProfile;