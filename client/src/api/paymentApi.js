import axiosInstance from "./axiosInstance";

export const createRazorpayOrderAPI = async (amount) => {
  const { data } = await axiosInstance.post(
    "/orders/payment/create-order",
    {
      amount,
    }
  );

  return data;
};

export const verifyPaymentAPI = async (paymentData) => {
  const { data } = await axiosInstance.post(
    "/orders/payment/verify",
    paymentData
  );

  return data;
};