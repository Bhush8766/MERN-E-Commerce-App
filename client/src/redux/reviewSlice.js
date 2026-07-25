import {
    createSlice,
    createAsyncThunk
}
from "@reduxjs/toolkit";


import {

getProductReviewsAPI,

createReviewAPI,

updateReviewAPI,

deleteReviewAPI

}
from "../api/reviewApi";



// ==========================================
// GET REVIEWS
// ==========================================

export const getProductReviews =
createAsyncThunk(

"reviews/getProductReviews",

async(productId,{rejectWithValue})=>{


try{


return await getProductReviewsAPI(productId);


}
catch(error){


return rejectWithValue(

error.response?.data?.message ||
"Failed to load reviews"

);


}


}

);




// ==========================================
// ADD REVIEW
// ==========================================

export const createReview =
createAsyncThunk(

"reviews/createReview",

async(reviewData,{rejectWithValue})=>{


try{


return await createReviewAPI(reviewData);


}
catch(error){


return rejectWithValue(

error.response?.data?.message ||
"Failed to add review"

);


}


}

);




// ==========================================
// UPDATE REVIEW
// ==========================================


export const updateReview =
createAsyncThunk(

"reviews/updateReview",

async(
{
id,
reviewData
},
{rejectWithValue}
)=>{


try{


return await updateReviewAPI(
id,
reviewData
);


}
catch(error){


return rejectWithValue(

error.response?.data?.message ||
"Failed to update review"

);


}


}

);




// ==========================================
// DELETE REVIEW
// ==========================================

export const deleteReview =
createAsyncThunk(

"reviews/deleteReview",

async(id,{rejectWithValue})=>{


try{


return {
data:await deleteReviewAPI(id),
id
};


}
catch(error){


return rejectWithValue(

error.response?.data?.message ||
"Failed to delete review"

);


}


}

);





const initialState={


reviews:[],

averageRating:0,

totalReviews:0,

loading:false,

error:null


};





const reviewSlice=createSlice({


name:"reviews",


initialState,


reducers:{


clearReviewError:(state)=>{

state.error=null;

}


},



extraReducers:(builder)=>{


builder



// GET REVIEWS

.addCase(
getProductReviews.pending,
(state)=>{

state.loading=true;

})


.addCase(
getProductReviews.fulfilled,
(state,action)=>{


state.loading=false;


state.reviews =
action.payload.reviews || [];


state.averageRating =
action.payload.averageRating || 0;


state.totalReviews =
action.payload.totalReviews || 0;


})


.addCase(
getProductReviews.rejected,
(state,action)=>{


state.loading=false;

state.error=action.payload;


})




// CREATE REVIEW


.addCase(
createReview.fulfilled,
(state,action)=>{


state.reviews.unshift(
action.payload.review
);


state.totalReviews +=1;


})




// UPDATE REVIEW


.addCase(
updateReview.fulfilled,
(state,action)=>{


state.reviews =
state.reviews.map(
(review)=>

review._id ===
action.payload.review._id

?

action.payload.review

:

review

);


})





// DELETE REVIEW


.addCase(
deleteReview.fulfilled,
(state,action)=>{


state.reviews =
state.reviews.filter(

(review)=>

review._id !== action.payload.id

);


state.totalReviews -=1;


});


}


});



export const {
clearReviewError

}
=
reviewSlice.actions;


export default reviewSlice.reducer;