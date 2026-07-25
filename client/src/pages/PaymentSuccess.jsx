import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">

      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center">

        <CheckCircle
          size={90}
          className="mx-auto text-green-600"
        />

        <h1 className="text-4xl font-bold mt-6 text-green-700">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mt-4 leading-7">
          Thank you for shopping with us.
          Your order has been placed successfully.
        </p>

        <div className="mt-8 space-y-4">

          <Link
            to="/my-orders"
            className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >
            View My Orders
          </Link>

          <Link
            to="/shop"
            className="block w-full border border-green-600 text-green-600 hover:bg-green-50 py-3 rounded-lg font-semibold transition"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
}

export default PaymentSuccess;