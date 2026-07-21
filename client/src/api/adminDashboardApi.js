import axios from "./axiosInstance";


export const getDashboardStatsApi =
async()=>{


const response =
await axios.get(
"/admin/stats"
);


return response.data;


};


export const getSalesAnalyticsApi =
async()=>{


const response =
await axios.get(
"/admin/analytics"
);


return response.data;


};