import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/orders",
});


// Add Token Automatically

API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});



// ==========================================
// CREATE ORDER
// POST /api/orders/create
// ==========================================

export const createOrderApi = async (data) => {

  const response = await API.post(
    "/create",
    data
  );

  return response.data;

};




// ==========================================
// GET MY ORDERS
// GET /api/orders/my-orders
// ==========================================

export const getMyOrdersApi = async () => {

  const response = await API.get(
    "/my-orders"
  );

  return response.data;

};




// ==========================================
// GET SINGLE ORDER
// GET /api/orders/:id
// ==========================================

export const getOrderByIdApi = async (id) => {

  const response = await API.get(
    `/${id}`
  );

  return response.data;

};


export const getOrderDetailsAPI = async (id) => {
  const { data } = await axiosInstance.get(`/orders/${id}`);
  return data;
};

// ==========================================
// CANCEL ORDER
// PATCH /api/orders/cancel/:id
// ==========================================

export const cancelOrderApi = async (id) => {

  const response = await API.patch(
    `/cancel/${id}`
  );

  return response.data;

};





// ======================================
// ADMIN GET ALL ORDERS
// ======================================

export const getAdminOrdersApi = async () => {

    const response = await axios.get(
        "/orders"
    );

    return response.data;

};



// ======================================
// UPDATE ORDER STATUS
// ======================================

export const updateOrderStatusApi = async (
    id,
    status
) => {

    const response = await axios.patch(
        `/orders/status/${id}`,
        {
            status,
        }
    );


    return response.data;

};



// ======================================
// DELETE ORDER
// ======================================

export const deleteOrderApi = async (
    id
) => {

    const response = await axios.delete(
        `/orders/${id}`
    );


    return response.data;

};
