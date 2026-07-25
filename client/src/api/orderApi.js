import axiosInstance from "./axiosInstance";

// ==========================================
// CREATE ORDER
// POST /api/orders/create
// ==========================================

export const createOrderAPI = (data)=>{

    return axiosInstance.post(
        "/orders/create",
        data
    );

};
// ==========================================
// GET MY ORDERS
// GET /api/orders/my-orders
// ==========================================
export const getMyOrdersApi = async () => {
  const { data } = await axiosInstance.get(
    "/orders/my-orders"
  );

  return data;
};

// ==========================================
// GET SINGLE ORDER
// GET /api/orders/:id
// ==========================================
export const getOrderDetailsAPI = async (id) => {
  const { data } = await axiosInstance.get(
    `/orders/${id}`
  );

  return data;
};

// ==========================================
// CANCEL ORDER
// PATCH /api/orders/cancel/:id
// ==========================================
export const cancelOrderApi = async (id) => {
  const { data } = await axiosInstance.patch(
    `/orders/cancel/${id}`
  );

  return data;
};

// ==========================================
// ADMIN - GET ALL ORDERS
// GET /api/orders
// ==========================================
export const getAdminOrdersApi = async () => {
  const { data } = await axiosInstance.get(
    "/orders"
  );

  return data;
};

// ==========================================
// ADMIN - UPDATE ORDER STATUS
// PATCH /api/orders/status/:id
// ==========================================
export const updateOrderStatusApi = async (
  id,
  status
) => {
  const { data } = await axiosInstance.patch(
    `/orders/status/${id}`,
    {
      status,
    }
  );

  return data;
};

// ==========================================
// ADMIN - DELETE ORDER
// DELETE /api/orders/:id
// ==========================================
export const deleteOrderApi = async (id) => {
  const { data } = await axiosInstance.delete(
    `/orders/${id}`
  );

  return data;
};