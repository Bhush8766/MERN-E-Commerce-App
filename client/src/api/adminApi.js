import axios from "axios";

const API_URL = "http://localhost:5000/api";



const authHeader = {

    headers:{
        Authorization:
        `Bearer ${localStorage.getItem("token")}`
    }

};




// GET PRODUCTS

export const getAdminProductsApi = async()=>{

    const {data}=await axios.get(
        `${API_URL}/products`
    );

    return data;

};




// CREATE PRODUCT

export const createProductApi = async(productData)=>{


    const {data}=await axios.post(

        `${API_URL}/products`,

        productData,

        {

            headers:{

                Authorization:
                `Bearer ${localStorage.getItem("token")}`,

                "Content-Type":
                "multipart/form-data"

            }

        }

    );


    return data;

};





// UPDATE PRODUCT

export const updateProductApi = async(
id,
productData
)=>{


const {data}=await axios.put(

`${API_URL}/products/${id}`,

productData,

authHeader

);


return data;


};





// DELETE PRODUCT

export const deleteProductApi = async(id)=>{


const {data}=await axios.delete(

`${API_URL}/products/${id}`,

authHeader

);


return data;


};






// GET PRODUCT BY ID

export const getProductByIdApi = async(id)=>{


const {data}=await axios.get(

`${API_URL}/products/${id}`

);


return data;


};






// ORDERS


export const getAdminOrdersApi=async()=>{


const {data}=await axios.get(

`${API_URL}/orders`,

authHeader

);


return data;


};






export const getAdminOrderApi=async(id)=>{


const {data}=await axios.get(

`${API_URL}/orders/${id}`,

authHeader

);


return data;


};






export const updateOrderStatusApi=async(
id,
status
)=>{


const {data}=await axios.patch(

`${API_URL}/orders/status/${id}`,

{
status
},

authHeader

);


return data;


};






// STOCK


export const updateStockApi=async(
id,
stock
)=>{


const {data}=await axios.patch(

`${API_URL}/products/${id}/stock`,

{
stock
},

authHeader

);


return data;


};







// CATEGORY


export const getCategoriesApi=async()=>{


const {data}=await axios.get(

`${API_URL}/categories`

);


return data;


};







// BRAND


export const getBrandsApi=async()=>{


const {data}=await axios.get(

`${API_URL}/brands`

);


return data;


};