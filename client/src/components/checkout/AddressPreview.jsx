import { MapPin, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const AddressPreview = ({ address }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6">

            <div className="flex justify-between items-start">

                <div className="flex gap-4">

                    <div className="bg-yellow-100 p-3 rounded-full h-fit">

                        <MapPin className="text-yellow-600" size={24} />

                    </div>

                    <div>

                        <h2 className="text-xl font-semibold">
                            Delivery Address
                        </h2>

                        {!address ? (

                            <div className="mt-3">

                                <p className="text-gray-500">
                                    No saved address found.
                                </p>

                                <Link
                                    to="/addresses"
                                    className="inline-block mt-3 text-blue-600 font-medium hover:underline"
                                >
                                    Add Address
                                </Link>

                            </div>

                        ) : (

                            <div className="mt-3 space-y-1">

                                <h3 className="font-bold text-lg">
                                    {address.fullName}
                                </h3>

                                <p>{address.phone}</p>

                                <p>{address.address}</p>

                                <p>
                                    {address.city}, {address.state}
                                </p>

                                <p>{address.pincode}</p>

                            </div>

                        )}

                    </div>

                </div>

                <Link
                    to="/checkout/address"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
                >
                    Change
                </Link>

            </div>

        </div>
    );
};

export default AddressPreview;