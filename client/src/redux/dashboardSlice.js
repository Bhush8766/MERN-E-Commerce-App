import {
createSlice,
createAsyncThunk
}
from "@reduxjs/toolkit";


import {
getDashboardStatsApi,
getSalesAnalyticsApi
}
from "../api/adminDashboardApi";






export const getDashboardStats =
createAsyncThunk(

"dashboard/stats",

async(_,
{rejectWithValue})=>{


try{


return await getDashboardStatsApi();


}
catch(error){


return rejectWithValue(

error.response?.data?.message ||
"Failed"

);


}


}

);





export const getSalesAnalytics =
createAsyncThunk(

"dashboard/analytics",

async(_,
{rejectWithValue})=>{


try{


return await getSalesAnalyticsApi();


}
catch(error){

return rejectWithValue(

error.response?.data?.message ||
"Analytics failed"

);

}


}

);







const dashboardSlice=createSlice({

name:"dashboard",


initialState:{


stats:{},

loading:false,

error:null,

analytics:null,

},



reducers:{},


extraReducers:(builder)=>{


builder


.addCase(
getDashboardStats.pending,

(state)=>{

state.loading=true;

}

)


.addCase(

getSalesAnalytics.fulfilled,

(state,action)=>{


state.analytics =
action.payload;


}

)




.addCase(
getDashboardStats.fulfilled,

(state,action)=>{


state.loading=false;


state.stats =
action.payload.stats;


}

)



.addCase(
getDashboardStats.rejected,

(state,action)=>{

state.loading=false;

state.error =
action.payload;


}

);



}


});



export default dashboardSlice.reducer;