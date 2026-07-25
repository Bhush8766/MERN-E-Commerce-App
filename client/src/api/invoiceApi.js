import axiosInstance from "./axiosInstance";


export const downloadInvoiceAPI = async(id)=>{


const response =
await axiosInstance.get(

`/invoice/${id}`,

{
responseType:"blob"
}

);



return response.data;


};