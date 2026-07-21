import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { getOrderById, cancelOrder } from "../redux/orderSlice";

function OrderDetails() {
    const { id } = useParams();

    const dispatch = useDispatch();

    const {
        selectedOrder,
        loading,
        error,
    } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(getOrderById(id));
    }, [dispatch, id]);

    if (loading) {
        return (
            <div className="container mx-auto py-10">
                Loading Order...
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto py-10 text-red-600">
                {error}
            </div>
        );
    }

    if (!selectedOrder) {
        return (
            <div className="container mx-auto py-10">
                Order Not Found
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">

            <h1 className="text-3xl font-bold mb-6">
                Order Details
            </h1>

            {/* Shipping */}

            <div className="bg-white rounded shadow p-5 mb-6">

                <h2 className="font-semibold text-xl mb-3">
                    Shipping Address
                </h2>

                <p>{selectedOrder.shippingAddress.fullName}</p>

                <p>{selectedOrder.shippingAddress.phone}</p>

                <p>{selectedOrder.shippingAddress.address}</p>

                <p>
                    {selectedOrder.shippingAddress.city},
                    {" "}
                    {selectedOrder.shippingAddress.state}
                </p>

                <p>
                    {selectedOrder.shippingAddress.country}
                </p>

                <p>
                    {selectedOrder.shippingAddress.pincode}
                </p>

            </div>

            {/* Payment */}

            <div className="bg-white rounded shadow p-5 mb-6">

                <h2 className="font-semibold text-xl mb-3">
                    Payment
                </h2>

                <p>
                    Method :
                    {" "}
                    {selectedOrder.paymentMethod}
                </p>

                <p>
                    Payment Status :
                    {" "}
                    {selectedOrder.paymentStatus}
                </p>

                <p>
                    Order Status :
                    {" "}
                    {selectedOrder.orderStatus}
                </p>

            </div>

            {/* Products */}

            <div className="bg-white rounded shadow p-5 mb-6">

                <h2 className="text-xl font-semibold mb-4">
                    Ordered Products
                </h2>

                <div className="overflow-x-auto">

                    <table className="min-w-full border">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="border p-2">Image</th>

                                <th className="border p-2">Product</th>

                                <th className="border p-2">Price</th>

                                <th className="border p-2">Qty</th>

                                <th className="border p-2">Subtotal</th>

                            </tr>

                        </thead>

                        <tbody>

                            {selectedOrder.products.map((item) => (

                                <tr key={item.product?._id || item.name}>

                                    <td className="border p-2">

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />

                                    </td>

                                    <td className="border p-2">

                                        {item.name}

                                        {item.color && (
                                            <div className="text-sm text-gray-500">
                                                Color : {item.color}
                                            </div>
                                        )}

                                        {item.size && (
                                            <div className="text-sm text-gray-500">
                                                Size : {item.size}
                                            </div>
                                        )}

                                    </td>

                                    <td className="border p-2">
                                        ₹{item.price}
                                    </td>

                                    <td className="border p-2">
                                        {item.quantity}
                                    </td>

                                    <td className="border p-2">
                                        ₹{item.subtotal}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* Order Summary */}

            <div className="bg-white rounded shadow p-5 mb-6">

                <h2 className="text-xl font-semibold mb-4">
                    Order Summary
                </h2>

                <div className="space-y-2">

                    <div className="flex justify-between">

                        <span>Items</span>

                        <span>{selectedOrder.totalItems}</span>

                    </div>

                    <div className="flex justify-between">

                        <span>Items Price</span>

                        <span>₹{selectedOrder.itemsPrice}</span>

                    </div>

                    <div className="flex justify-between">

                        <span>Shipping</span>

                        <span>₹{selectedOrder.shippingPrice}</span>

                    </div>

                    <div className="flex justify-between">

                        <span>Tax</span>

                        <span>₹{selectedOrder.taxPrice}</span>

                    </div>

                    {selectedOrder.couponDiscount > 0 && (

                        <div className="flex justify-between text-green-600">

                            <span>Coupon Discount</span>

                            <span>- ₹{selectedOrder.couponDiscount}</span>

                        </div>

                    )}

                    <hr />

                    <div className="flex justify-between text-xl font-bold">

                        <span>Total</span>

                        <span>₹{selectedOrder.totalPrice}</span>

                    </div>

                </div>

            </div>

            {/* Buttons */}

            <div className="flex gap-3">

                <Link
                    to="/orders"
                    className="bg-gray-700 text-white px-5 py-2 rounded"
                >
                    Back
                </Link>

                {selectedOrder.canCancel && (

                    <button
                        onClick={() => dispatch(cancelOrder(selectedOrder._id))}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded"
                    >
                        Cancel Order
                    </button>

                )}

            </div>

        </div>
    );
}

export default OrderDetails;