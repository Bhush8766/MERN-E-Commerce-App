import API from "../api/axiosInstance";


import {

setProducts,
setLoading,
setError

} from "./productSlice";



export const fetchProducts = ()=>async(dispatch)=>{


try{


dispatch(setLoading(true));



const {data}=await API.get("/products");



dispatch(
    setProducts(data.products || data)
);



dispatch(setLoading(false));


}

catch(error){


dispatch(
    setError(error.message)
);


dispatch(setLoading(false));


}


};