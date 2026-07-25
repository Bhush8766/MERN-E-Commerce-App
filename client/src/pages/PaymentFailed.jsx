import { Link } from "react-router-dom";
import { XCircle, RotateCcw, ShoppingCart } from "lucide-react";

function PaymentFailed() {
  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center px-4">

      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center">

        <XCircle
          size={90}
          className="mx-auto text-red-600"
        />

        <h1 className="text-4xl font-bold mt-6 text-red-600">
          Payment Failed
        </h1>

        <p className="text-gray-600 mt-4 leading-7">
          Unfortunately, we couldn't complete your payment.
          Please try again or choose another payment method.
        </p>

        <div className="mt-8 space-y-4">

          <Link
            to="/checkout"
            className="w-full flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
          >
            <RotateCcw size={20} />
            Retry Payment
          </Link>

          <Link
            to="/cart"
            className="w-full flex justify-center items-center gap-2 border border-red-600 text-red-600 hover:bg-red-50 py-3 rounded-lg font-semibold transition"
          >
            <ShoppingCart size={20} />
            Back to Cart
          </Link>

        </div>

      </div>

    </div>
  );
}

export default PaymentFailed;