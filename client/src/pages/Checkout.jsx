import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createOrder } from "../redux/orderSlice";

import loadRazorpay from "../utils/loadRazorpay";
import {
  createRazorpayOrderAPI,
  verifyPaymentAPI,
} from "../api/paymentApi";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items } = useSelector((state) => state.cart);

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
  });

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

    const handlePlaceOrder = async () => {
    // Basic Validation
    if (
      !address.fullName ||
      !address.phone ||
      !address.address ||
      !address.city ||
      !address.state ||
      !address.country ||
      !address.pincode
    ) {
      alert("Please fill all shipping details.");
      return;
    }

    // Create Order
    const orderData = {
      shippingAddress: address,
      paymentMethod,
    };

    const result = await dispatch(createOrder(orderData));

    if (!createOrder.fulfilled.match(result)) {
      alert("Failed to place order.");
      return;
    }

    const createdOrder = result.payload.order;

    // ============================
    // Cash On Delivery
    // ============================
    if (paymentMethod === "COD") {
      navigate("/payment-success");
      return;
    }

    // ============================
    // Razorpay Payment
    // ============================

    const loaded = await loadRazorpay();

    if (!loaded) {
      alert("Unable to load Razorpay.");
      return;
    }

    try {
      // Create Razorpay Order
      const razorpayOrder = await createRazorpayOrderAPI(
        createdOrder.totalPrice
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,

        amount: razorpayOrder.order.amount,

        currency: razorpayOrder.order.currency,

        name: "MERN E-Commerce",

        description: "Secure Payment",

        order_id: razorpayOrder.order.id,

        prefill: {
          name: address.fullName,
          contact: address.phone,
        },

        theme: {
          color: "#2563eb",
        },

        modal: {
          ondismiss: function () {
            navigate("/payment-failed");
          },
        },

        handler: async function (response) {
          try {
            await verifyPaymentAPI({
              razorpay_order_id:
                response.razorpay_order_id,

              razorpay_payment_id:
                response.razorpay_payment_id,

              razorpay_signature:
                response.razorpay_signature,

              orderId: createdOrder._id,
            });

            navigate("/payment-success");
          } catch (error) {
            console.error(error);
            navigate("/payment-failed");
          }
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.open();

    } catch (error) {
      console.error(error);
      alert("Unable to initiate payment.");
    }
  };


    return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4">

        {/* ================= Shipping Address ================= */}

        <div className="md:col-span-2 bg-white rounded-xl shadow p-6">

          <h2 className="text-3xl font-bold mb-6">
            Shipping Address
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              name="fullName"
              value={address.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="text"
              name="phone"
              value={address.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="text"
              name="address"
              value={address.address}
              onChange={handleChange}
              placeholder="Street Address"
              className="border rounded-lg p-3 md:col-span-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              placeholder="City"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleChange}
              placeholder="State"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="text"
              name="country"
              value={address.country}
              onChange={handleChange}
              placeholder="Country"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="text"
              name="pincode"
              value={address.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

        </div>

        {/* ================= Order Summary ================= */}

        <div className="bg-white rounded-xl shadow p-6 h-fit">

          <h2 className="text-2xl font-bold mb-5">
            Order Summary
          </h2>

          <div className="space-y-4">

            {items.length === 0 ? (

              <p className="text-gray-500">
                Your cart is empty.
              </p>

            ) : (

              items.map((item) => (

                <div
                  key={item._id}
                  className="flex justify-between border-b pb-3"
                >
                  <div>

                    <p className="font-semibold">
                      {item.title}
                    </p>

                    <p className="text-sm text-gray-500">
                      Qty : {item.quantity}
                    </p>

                  </div>

                  <p className="font-semibold">
                    ₹{item.price * item.quantity}
                  </p>

                </div>

              ))

            )}

          </div>

          <div className="border-t mt-6 pt-5">

            <div className="flex justify-between text-xl font-bold">

              <span>Total</span>

              <span className="text-blue-600">
                ₹{totalPrice}
              </span>

            </div>

          </div>

          {/* ================= Payment Method ================= */}

          <div className="mt-8">

            <h3 className="text-xl font-bold mb-4">
              Payment Method
            </h3>

            <div className="space-y-3">

              <label className="flex items-center gap-3 cursor-pointer">

                <input
                  type="radio"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />

                Cash On Delivery

              </label>

              <label className="flex items-center gap-3 cursor-pointer">

                <input
                  type="radio"
                  value="Razorpay"
                  checked={paymentMethod === "Razorpay"}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />

                Pay Online (Razorpay)

              </label>

            </div>

          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={items.length === 0}
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:bg-gray-400"
          >
            {paymentMethod === "COD"
              ? "Place Order"
              : "Proceed To Payment"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default Checkout;