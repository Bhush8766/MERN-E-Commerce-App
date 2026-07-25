import axiosInstance from "./axiosInstance";

export const createRazorpayOrderAPI = async (amount) => {
  const { data } = await axiosInstance.post(
    "/payment/create-order",
    { amount }
  );

  return data;
};

export const verifyPaymentAPI = async (paymentData) => {
  const { data } = await axiosInstance.post(
    "/payment/verify",
    paymentData
  );

  return data;
};

export const cashOnDeliveryAPI = async (orderId) => {
  const { data } = await axiosInstance.post(
    "/payment/cod",
    { orderId }
  );

  return data;
};