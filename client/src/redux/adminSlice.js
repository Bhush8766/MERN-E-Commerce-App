import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";


import {

    getAdminProductsApi,
    createProductApi,
    updateProductApi,
    deleteProductApi,

    getAdminOrdersApi,
    getCategoriesApi,
    getBrandsApi,

    getProductByIdApi,

    getAdminOrderApi,
    updateOrderStatusApi,

    updateStockApi

} from "../api/adminApi";




// =======================================
// GET PRODUCTS
// =======================================

export const getAdminProducts =
createAsyncThunk(

"admin/getProducts",

async(_, {rejectWithValue})=>{

try{

return await getAdminProductsApi();

}
catch(error){

return rejectWithValue(
error.response?.data?.message ||
"Failed to fetch products"
);

}

}

);





// =======================================
// CREATE PRODUCT
// =======================================

export const createProduct =
createAsyncThunk(

"admin/createProduct",

async(data,{rejectWithValue})=>{

try{

return await createProductApi(data);

}
catch(error){

return rejectWithValue(
error.response?.data?.message ||
"Failed to create product"
);

}

}

);






// =======================================
// UPDATE PRODUCT
// =======================================

export const updateProduct =
createAsyncThunk(

"admin/updateProduct",

async(
{id,productData},
{rejectWithValue}
)=>{

try{

return await updateProductApi(
id,
productData
);

}
catch(error){

return rejectWithValue(
error.response?.data?.message ||
"Failed to update product"
);

}

}

);






// =======================================
// DELETE PRODUCT
// =======================================

export const deleteProduct =
createAsyncThunk(

"admin/deleteProduct",

async(id,{rejectWithValue})=>{

try{

await deleteProductApi(id);

return id;

}
catch(error){

return rejectWithValue(
error.response?.data?.message ||
"Failed to delete product"
);

}

}

);






// =======================================
// GET ORDERS
// =======================================

export const getAdminOrders =
createAsyncThunk(

"admin/getOrders",

async(_,{rejectWithValue})=>{

try{

return await getAdminOrdersApi();

}
catch(error){

return rejectWithValue(
error.response?.data?.message ||
"Failed to fetch orders"
);

}

}

);





// =======================================
// GET ORDER BY ID
// =======================================

export const getAdminOrder =
createAsyncThunk(

"admin/getOrder",

async(id,{rejectWithValue})=>{

try{

return await getAdminOrderApi(id);

}
catch(error){

return rejectWithValue(
error.response?.data?.message ||
"Order not found"
);

}

}

);







// =======================================
// UPDATE ORDER STATUS
// =======================================

export const updateOrderStatus =
createAsyncThunk(

"admin/updateOrderStatus",

async(
{id,status},
{rejectWithValue}
)=>{

try{

return await updateOrderStatusApi(
id,
status
);

}
catch(error){

return rejectWithValue(
error.response?.data?.message ||
"Unable to update order"
);

}

}

);







// =======================================
// STOCK UPDATE
// =======================================

export const updateStock =
createAsyncThunk(

"admin/updateStock",

async(
{id,stock},
{rejectWithValue}
)=>{

try{

return await updateStockApi(
id,
stock
);

}
catch(error){

return rejectWithValue(
error.response?.data?.message ||
"Stock update failed"
);

}

}

);







// =======================================
// CATEGORY
// =======================================

export const getCategories =
createAsyncThunk(

"admin/getCategories",

async(_,{rejectWithValue})=>{

try{

return await getCategoriesApi();

}
catch(error){

return rejectWithValue(
error.response?.data?.message ||
"Category fetch failed"
);

}

}

);






// =======================================
// BRAND
// =======================================

export const getBrands =
createAsyncThunk(

"admin/getBrands",

async(_,{rejectWithValue})=>{

try{

return await getBrandsApi();

}
catch(error){

return rejectWithValue(
error.response?.data?.message ||
"Brand fetch failed"
);

}

}

);







// =======================================
// PRODUCT BY ID
// =======================================

export const getProductById =
createAsyncThunk(

"admin/getProductById",

async(id,{rejectWithValue})=>{

try{

return await getProductByIdApi(id);

}
catch(error){

return rejectWithValue(
error.response?.data?.message ||
"Product fetch failed"
);

}

}

);









const adminSlice=createSlice({

name:"admin",


initialState:{


products:[],

categories:[],

brands:[],

orders:[],


selectedProduct:null,

selectedOrder:null,


loading:false,

error:null


},




reducers:{


clearAdminError:(state)=>{

state.error=null;

},



clearSelectedProduct:(state)=>{

state.selectedProduct=null;

},



clearSelectedOrder:(state)=>{

state.selectedOrder=null;

}


},





extraReducers:(builder)=>{


builder



// PRODUCTS

.addCase(
getAdminProducts.fulfilled,

(state,action)=>{

state.loading=false;

state.products =
action.payload.products || [];

}

)





.addCase(
createProduct.fulfilled,

(state,action)=>{

state.loading=false;


if(action.payload.product){

state.products.unshift(
action.payload.product
);

}


}

)





.addCase(
updateProduct.fulfilled,

(state,action)=>{


state.loading=false;


const updated =
action.payload.product;


if(updated){

state.products =
state.products.map(item=>

item._id===updated._id
?
updated
:
item

);

}


}

)






.addCase(
deleteProduct.fulfilled,

(state,action)=>{

state.loading=false;


state.products =
state.products.filter(

item=>item._id!==action.payload

);


}

)







// ORDERS

.addCase(
getAdminOrders.fulfilled,

(state,action)=>{

state.loading=false;


state.orders =
action.payload.orders || [];

}

)





.addCase(
getAdminOrder.fulfilled,

(state,action)=>{

state.loading=false;


state.selectedOrder =
action.payload.order;

}

)






.addCase(
updateOrderStatus.fulfilled,

(state,action)=>{

state.loading=false;


const updated =
action.payload.order;


state.selectedOrder =
updated;



state.orders =
state.orders.map(order=>

order._id===updated._id
?
updated
:
order

);


}

)







// STOCK

.addCase(
updateStock.fulfilled,

(state,action)=>{


state.loading=false;


const updated =
action.payload.product;


if(updated){

state.products =
state.products.map(product=>

product._id===updated._id
?
updated
:
product

);

}


}

)







// CATEGORY

.addCase(
getCategories.fulfilled,

(state, action)=>{


state.loading=false;


console.log(
"REDUX CATEGORY PAYLOAD",
action.payload
);


state.categories =
action.payload?.categories || [];


}
)





// BRAND

.addCase(
getBrands.fulfilled,

(state, action)=>{


state.loading=false;


console.log(
"REDUX BRAND PAYLOAD",
action.payload
);



state.brands =
action.payload?.brands || [];


}
)





// PRODUCT DETAILS

.addCase(
getProductById.fulfilled,

(state,action)=>{

state.loading=false;

state.selectedProduct =
action.payload.product;

}

)








// COMMON PENDING

.addMatcher(

(action)=>
action.type.startsWith("admin/")
&&
action.type.endsWith("/pending"),


(state)=>{

state.loading=true;

state.error=null;

}


)






// COMMON ERROR

.addMatcher(

(action)=>
action.type.startsWith("admin/")
&&
action.type.endsWith("/rejected"),


(state,action)=>{

state.loading=false;

state.error =
action.payload;

}

);



}


});




export const {

clearAdminError,

clearSelectedProduct,

clearSelectedOrder

}=adminSlice.actions;




export default adminSlice.reducer;