const asyncHandler = require("express-async-handler");

const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const Category = require("../models/categoryModel");
const Brand = require("../models/brandModel");


// ======================================
// ADMIN DASHBOARD STATS
// ======================================

exports.getDashboardStats = asyncHandler(
async(req,res)=>{


const products =
await Product.countDocuments();


const orders =
await Order.countDocuments();


const categories =
await Category.countDocuments();


const brands =
await Brand.countDocuments();



const lowStock =
await Product.countDocuments({

stock:{
$lte:5
}

});



const outOfStock =
await Product.countDocuments({

stock:0

});




res.status(200).json({

success:true,

stats:{


products,

orders,

categories,

brands,

lowStock,

outOfStock


}


});


}

);




// ======================================
// SALES ANALYTICS
// ======================================

exports.getSalesAnalytics = asyncHandler(
async(req,res)=>{


const sales = await Order.aggregate([

{
$group:{
_id:{
$month:"$createdAt"
},

totalSales:{
$sum:"$totalPrice"
},

totalOrders:{
$sum:1
}

}

},

{
$sort:{
"_id":1
}

}

]);




const orderStatus =
await Order.aggregate([


{
$group:{

_id:"$orderStatus",

count:{
$sum:1
}

}

}


]);





res.status(200).json({

success:true,

sales,

orderStatus


});


}

);