const asyncHandler =
require("express-async-handler");


const Review =
require("../models/reviewModel");


const Product =
require("../models/productModel");


const Order =
require("../models/orderModel");



// ==========================================
// GET PRODUCT REVIEWS
// GET /api/reviews/product/:productId
// ==========================================

exports.getProductReviews =
asyncHandler(async(req,res)=>{


const reviews =
await Review.find({

product:req.params.productId

})
.populate(
"user",
"name"
)
.sort({
createdAt:-1
});



const product =
await Product.findById(
req.params.productId
);



res.status(200).json({

success:true,

reviews,

averageRating:
product.rating,

totalReviews:
product.numReviews


});


});





// ==========================================
// CREATE REVIEW
// POST /api/reviews
// ==========================================

exports.createReview =
asyncHandler(async(req,res)=>{


const {
productId,
rating,
comment
}=req.body;



const existingReview =
await Review.findOne({

product:productId,

user:req.user.id

});



if(existingReview){

return res.status(400).json({

success:false,

message:
"You already reviewed this product"

});

}





let verified=false;



const order =
await Order.findOne({

user:req.user.id,

"products.product":productId,

orderStatus:"Delivered"

});



if(order){

verified=true;

}




const review =
await Review.create({

user:req.user.id,

product:productId,

name:req.user.name,

rating,

comment,

isVerifiedPurchase:
verified

});





await updateProductRating(
productId
);



res.status(201).json({

success:true,

review

});


});






// ==========================================
// UPDATE REVIEW
// PATCH /api/reviews/:id
// ==========================================

exports.updateReview =
asyncHandler(async(req,res)=>{


const review =
await Review.findById(
req.params.id
);



if(!review){

return res.status(404).json({

success:false,

message:"Review not found"

});

}



if(
review.user.toString()
!== req.user.id
){

return res.status(403).json({

success:false,

message:"Not allowed"

});

}




review.rating =
req.body.rating || review.rating;


review.comment =
req.body.comment || review.comment;



await review.save();



await updateProductRating(
review.product
);



res.status(200).json({

success:true,

review

});


});







// ==========================================
// DELETE REVIEW
// DELETE /api/reviews/:id
// ==========================================

exports.deleteReview =
asyncHandler(async(req,res)=>{


const review =
await Review.findById(
req.params.id
);



if(!review){

return res.status(404).json({

success:false,

message:"Review not found"

});

}



if(
review.user.toString()
!== req.user.id
){

return res.status(403).json({

success:false,

message:"Not allowed"

});

}



await review.deleteOne();



await updateProductRating(
review.product
);



res.status(200).json({

success:true,

message:
"Review deleted"

});


});







// ==========================================
// UPDATE PRODUCT RATING HELPER
// ==========================================

async function updateProductRating(productId){


const reviews =
await Review.find({

product:productId

});



const total =
reviews.length;



const avg =
total===0
?
0
:
reviews.reduce(

(sum,item)=>

sum + item.rating,

0

)/total;



await Product.findByIdAndUpdate(

productId,

{

rating:
avg.toFixed(1),

numReviews:
total

}

);


}