const express=require("express");

const router=express.Router();


const {
getDashboardStats,
getSalesAnalytics,
}
=
require("../controllers/adminController");


const {
protect
}
=
require("../middleware/authMiddleware");


const authorize =
require("../middleware/roleMiddleware");



router.get(

"/stats",

protect,

authorize("Admin"),

getDashboardStats

);


router.get(

"/analytics",

protect,

authorize("Admin"),

getSalesAnalytics

);


module.exports=router;