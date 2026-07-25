import { useState } from "react";
import {
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Star,
} from "lucide-react";

function SavedAddresses() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      fullName: "John Doe",
      phone: "9876543210",
      address: "221B Baker Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      isDefault: true,
    },
  ]);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      fullName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });

    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setAddresses(
        addresses.map((item) =>
          item.id === editingId
            ? { ...item, ...form }
            : item
        )
      );
    } else {
      setAddresses([
        ...addresses,
        {
          id: Date.now(),
          ...form,
          isDefault: false,
        },
      ]);
    }

    resetForm();
  };

  const handleEdit = (address) => {
    setEditingId(address.id);

    setForm({
      fullName: address.fullName,
      phone: address.phone,
      address: address.address,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
    });
  };

  const handleDelete = (id) => {
    setAddresses(
      addresses.filter((item) => item.id !== id)
    );
  };

  const handleDefault = (id) => {
    setAddresses(
      addresses.map((item) => ({
        ...item,
        isDefault: item.id === id,
      }))
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-6xl mx-auto px-4">

        <h1 className="text-3xl font-bold mb-8">
          Saved Addresses
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Address Form */}

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">

              {editingId
                ? "Edit Address"
                : "Add New Address"}

            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />

              <textarea
                name="address"
                placeholder="Street Address"
                value={form.address}
                onChange={handleChange}
                rows={3}
                className="w-full border rounded-lg p-3"
                required
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={form.pincode}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex justify-center items-center gap-2"
              >
                <Plus size={20} />

                {editingId
                  ? "Update Address"
                  : "Add Address"}
              </button>

            </form>

          </div>

          {/* Address List */}

          <div className="space-y-5">

            {addresses.length === 0 ? (

              <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

                <MapPin
                  size={60}
                  className="mx-auto text-gray-300"
                />

                <h2 className="text-xl font-semibold mt-4">
                  No Saved Addresses
                </h2>

              </div>

            ) : (

              addresses.map((address) => (

                <div
                  key={address.id}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >

                  <div className="flex justify-between items-start">

                    <div>

                      <h3 className="text-xl font-bold">
                        {address.fullName}
                      </h3>

                      <p className="text-gray-500">
                        {address.phone}
                      </p>

                    </div>

                    {address.isDefault && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Default
                      </span>
                    )}

                  </div>

                  <p className="mt-4 text-gray-700 leading-7">
                    {address.address},
                    <br />
                    {address.city}, {address.state}
                    <br />
                    {address.pincode}
                  </p>

                  <div className="flex gap-3 mt-6 flex-wrap">

                    <button
                      onClick={() =>
                        handleEdit(address)
                      }
                      className="flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
                    >
                      <Pencil size={18} />
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(address.id)
                      }
                      className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>

                    {!address.isDefault && (
                      <button
                        onClick={() =>
                          handleDefault(address.id)
                        }
                        className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg"
                      >
                        <Star size={18} />
                        Set Default
                      </button>
                    )}

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default SavedAddresses;