import axiosInstance from "./axiosInstance";



// ADD REVIEW

export const addReviewAPI =
async(productId,data)=>{


const {result}=await axiosInstance.post(

`/reviews/${productId}`,

data

);


return result;

};




// GET REVIEWS

export const getReviewsAPI =
async(productId)=>{


const {data}=await axiosInstance.get(

`/reviews/${productId}`

);


return data;

};








// ==========================================
// GET PRODUCT REVIEWS
// GET /api/reviews/product/:productId
// ==========================================

export const getProductReviewsAPI = async(productId)=>{

    const {data}=await axiosInstance.get(
        `/reviews/product/${productId}`
    );

    return data;

};



// ==========================================
// CREATE REVIEW
// POST /api/reviews
// ==========================================

export const createReviewAPI = async(reviewData)=>{

    const {data}=await axiosInstance.post(
        "/reviews",
        reviewData
    );

    return data;

};



// ==========================================
// UPDATE REVIEW
// PATCH /api/reviews/:id
// ==========================================

export const updateReviewAPI = async(
    id,
    reviewData
)=>{

    const {data}=await axiosInstance.patch(
        `/reviews/${id}`,
        reviewData
    );

    return data;

};



// ==========================================
// DELETE REVIEW
// DELETE /api/reviews/:id
// ==========================================

export const deleteReviewAPI = async(id)=>{

    const {data}=await axiosInstance.delete(
        `/reviews/${id}`
    );

    return data;

};