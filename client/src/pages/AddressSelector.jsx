import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MapPin, Plus } from "lucide-react";

import { getAddresses } from "../redux/userSlice";
import AddressCard from "../components/checkout/AddressCard";
import { selectAddress } from "../redux/checkoutSlice";

const AddressSelector = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        addresses = [],
        loading,
    } = useSelector((state) => state.users);

    const [selectedId, setSelectedId] = useState("");

    useEffect(() => {
        dispatch(getAddresses());
    }, [dispatch]);

    useEffect(() => {
        if (addresses.length > 0) {
            const defaultAddress =
                addresses.find((item) => item.isDefault) ||
                addresses[0];

            setSelectedId(defaultAddress._id);
        }
    }, [addresses]);

    const continueCheckout = () => {
  if (!selectedId) return;

  const address = addresses.find(
    (item) => item._id === selectedId
  );

  dispatch(selectAddress(address));

  navigate("/checkout");
};

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <h2 className="text-xl font-semibold">
                    Loading addresses...
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10">

            <div className="max-w-6xl mx-auto px-4">

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-3xl font-bold">
                            Select Delivery Address
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Choose the address for this order.
                        </p>

                    </div>

                    <Link
                        to="/saved-addresses"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center gap-2"
                    >
                        <Plus size={18} />
                        Add Address
                    </Link>

                </div>

                {addresses.length === 0 ? (

                    <div className="bg-white rounded-xl shadow-lg p-12 text-center">

                        <MapPin
                            className="mx-auto text-gray-300"
                            size={60}
                        />

                        <h2 className="text-2xl font-semibold mt-6">
                            No Saved Addresses
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Add your first delivery address.
                        </p>

                        <Link
                            to="/saved-addresses"
                            className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                        >
                            Add Address
                        </Link>

                    </div>

                ) : (

                    <>
                        <div className="grid lg:grid-cols-2 gap-6">

                            {addresses.map((address) => (

                                <AddressCard
                                    key={address._id}
                                    address={address}
                                    selected={selectedId === address._id}
                                    onSelect={() => setSelectedId(address._id)}
                                />

                            ))}

                        </div>

                        <div className="mt-10 flex justify-end">

                            <button
                                onClick={continueCheckout}
                                disabled={!selectedId}
                                className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-black font-semibold px-10 py-4 rounded-lg transition"
                            >
                                Continue to Checkout
                            </button>

                        </div>
                    </>

                )}

            </div>

        </div>
    );
};

export default AddressSelector;