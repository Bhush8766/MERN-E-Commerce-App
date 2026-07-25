import { CheckCircle, Home, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const AddressCard = ({
  address,
  selected,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-xl border-2 p-6 bg-white shadow-md transition-all duration-200
      ${
        selected
          ? "border-yellow-500 shadow-xl"
          : "border-gray-200 hover:border-yellow-300"
      }`}
    >
      {/* Header */}

      <div className="flex justify-between items-start">

        <div className="flex items-center gap-3">

          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
            ${
              selected
                ? "border-yellow-500 bg-yellow-500"
                : "border-gray-400"
            }`}
          >
            {selected && (
              <CheckCircle
                size={16}
                className="text-white"
              />
            )}
          </div>

          <div>

            <h2 className="text-lg font-bold">
              {address.fullName}
            </h2>

            <p className="text-gray-500">
              {address.phone}
            </p>

          </div>

        </div>

        {address.isDefault && (
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
            Default
          </span>
        )}

      </div>

      {/* Address */}

      <div className="flex gap-3 mt-5">

        <Home
          size={20}
          className="text-gray-500 mt-1"
        />

        <div className="text-gray-700 leading-7">

          <p>{address.address}</p>

          <p>
            {address.city}, {address.state}
          </p>

          <p>{address.pincode}</p>

        </div>

      </div>

      {/* Selected */}

      {selected && (
        <div className="mt-5 rounded-lg bg-yellow-100 text-yellow-800 px-4 py-2 text-sm font-semibold">
          ✓ Selected for this order
        </div>
      )}

      {/* Actions */}

      <div className="mt-6 flex flex-wrap gap-3">

        <Link
          to="/saved-addresses"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200"
        >
          <Pencil size={18} />
          Edit
        </Link>

        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(address._id);
            }}
            className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200"
          >
            <Trash2 size={18} />
            Delete
          </button>
        )}

      </div>

    </div>
  );
};

export default AddressCard;