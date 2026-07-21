import {
    createSlice,
    createAsyncThunk
}
from "@reduxjs/toolkit";


import {

    loginUserApi,
    registerUserApi,
    getProfileApi,
    logoutApi

}
from "../api/authApi";



// ==========================
// REGISTER USER
// ==========================

export const registerUser = createAsyncThunk(

"auth/register",

async(data,{rejectWithValue})=>{


try{

const response =
await registerUserApi(data);


return response;


}
catch(error){

return rejectWithValue(

error.response?.data?.message ||
"Registration Failed"

);

}


}

);





// ==========================
// LOGIN USER
// ==========================

export const loginUser = createAsyncThunk(

"auth/login",

async(data,{rejectWithValue})=>{


try{


const response =
await loginUserApi(data);



localStorage.setItem(
"token",
response.token
);



return response;


}
catch(error){


return rejectWithValue(

error.response?.data?.message ||
"Login Failed"

);


}


}

);





// ==========================
// GET PROFILE
// ==========================

export const getProfile = createAsyncThunk(

"auth/profile",

async(_,
{rejectWithValue})=>{


try{


const response =
await getProfileApi();


return response;


}
catch(error){


localStorage.removeItem("token");


return rejectWithValue(

error.response?.data?.message ||
"Profile Fetch Failed"

);


}


}

);





// ==========================
// LOGOUT API
// ==========================

export const logout = createAsyncThunk(

"auth/logout",

async()=>{


try{

await logoutApi();


}
catch(error){


console.log(error);


}



localStorage.removeItem(
"token"
);



}

);







const authSlice=createSlice({

name:"auth",


initialState:{


user:null,


token:
localStorage.getItem("token"),



loading:false,


initialized:false,


error:null


},





reducers:{



clearError:(state)=>{

state.error=null;

},



},





extraReducers:(builder)=>{


builder



// ==========================
// REGISTER
// ==========================


.addCase(
registerUser.pending,

(state)=>{

state.loading=true;

}
)



.addCase(
registerUser.fulfilled,

(state,action)=>{


state.loading=false;


state.user =
action.payload.user;


}
)



.addCase(
registerUser.rejected,

(state,action)=>{


state.loading=false;

state.error =
action.payload;


}
)






// ==========================
// LOGIN
// ==========================


.addCase(
loginUser.pending,

(state)=>{

state.loading=true;

}
)



.addCase(
loginUser.fulfilled,

(state,action)=>{


state.loading=false;


state.user =
action.payload.user;



state.token =
action.payload.token;



}
)



.addCase(
loginUser.rejected,

(state,action)=>{


state.loading=false;


state.error =
action.payload;


}
)






// ==========================
// PROFILE
// ==========================


.addCase(
getProfile.pending,

(state)=>{


state.loading=true;


}
)



.addCase(
getProfile.fulfilled,

(state,action)=>{


state.loading=false;


state.user =
action.payload.user;


state.initialized=true;


}
)



.addCase(
getProfile.rejected,

(state,action)=>{


state.loading=false;


state.initialized=true;


state.error =
action.payload;



}
)







// ==========================
// LOGOUT
// ==========================


.addCase(
logout.fulfilled,

(state)=>{


state.user=null;


state.token=null;


state.initialized=true;


}

);



}


});




export const {

clearError

}
=
authSlice.actions;



export default authSlice.reducer;