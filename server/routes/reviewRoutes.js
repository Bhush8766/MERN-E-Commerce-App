const express=require("express");

const router=express.Router();


const {

getProductReviews,

createReview,

updateReview,

deleteReview

}=require("../controllers/reviewController");


const {
protect
}=require("../middleware/authMiddleware");





router.get(
"/product/:productId",
getProductReviews
);



router.post(
"/",
protect,
createReview
);



router.patch(
"/:id",
protect,
updateReview
);



router.delete(
"/:id",
protect,
deleteReview
);



module.exports=router;