import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New Password and Confirm Password do not match.");
      return;
    }

    console.log("Password Data:", formData);

    // TODO:
    // dispatch(changePassword(formData));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">
          Change Password
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Current Password */}

          <div>

            <label className="font-medium">
              Current Password
            </label>

            <div className="relative mt-2">

              <Lock
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />

              <input
                type={showCurrent ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                className="w-full border rounded-lg py-3 pl-11 pr-12"
              />

              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showCurrent ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          {/* New Password */}

          <div>

            <label className="font-medium">
              New Password
            </label>

            <div className="relative mt-2">

              <Lock
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />

              <input
                type={showNew ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full border rounded-lg py-3 pl-11 pr-12"
              />

              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showNew ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          {/* Confirm Password */}

          <div>

            <label className="font-medium">
              Confirm Password
            </label>

            <div className="relative mt-2">

              <Lock
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />

              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full border rounded-lg py-3 pl-11 pr-12"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showConfirm ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          {/* Password Requirements */}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">

            <h3 className="font-semibold text-blue-700 mb-2">
              Password Requirements
            </h3>

            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Minimum 8 characters</li>
              <li>At least one uppercase letter</li>
              <li>At least one lowercase letter</li>
              <li>At least one number</li>
              <li>At least one special character</li>
            </ul>

          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Update Password
          </button>

        </form>

      </div>

    </div>
  );
}

export default ChangePassword;