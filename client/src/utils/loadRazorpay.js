const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      return resolve(true);
    }

    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => resolve(true);

    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};



const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,

    amount: razorOrder.order.amount,

    currency: razorOrder.order.currency,

    order_id: razorOrder.order.id,

    name: "Your Store",

    description: "Order Payment",

    prefill: {
        name: profile.name,
        email: profile.email,
        contact: profile.phone,
    },

    handler: async (response) => {

        await verifyPaymentAPI({

            razorpay_order_id:
                response.razorpay_order_id,

            razorpay_payment_id:
                response.razorpay_payment_id,

            razorpay_signature:
                response.razorpay_signature,

            orderId: order._id,
        });

        navigate("/payment-success");
    },
};