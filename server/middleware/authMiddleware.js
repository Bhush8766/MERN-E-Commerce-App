const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// ======================================
// Protect Routes
// ======================================
const protect = async(req,res,next)=>{

  try {

    let token;

    if(
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ){

      token = req.headers.authorization.split(" ")[1];

    }


    if(!token){
      return res.status(401).json({
        success:false,
        message:"No token"
      });
    }


    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );


   req.user = await User.findById(decoded.id);

if(!req.user){
   return res.status(401).json({
      success:false,
      message:"User not found"
   });
}


    console.log("AUTH USER:", req.user);


    next();


  } catch(error){

    return res.status(401).json({
      success:false,
      message:"Invalid token"
    });

  }

};






// ======================================
// Admin Only
// ======================================
const admin = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Admin access only",
  });
};

// ======================================
// Vendor Only
// ======================================
const vendor = (req, res, next) => {
  if (req.user && req.user.role === "Vendor") {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Vendor access only",
  });
};

// ======================================
// Customer Only
// ======================================
const customer = (req, res, next) => {
  if (req.user && req.user.role === "Customer") {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Customer access only",
  });
};

// ======================================
// Admin OR Vendor
// ======================================
const adminOrVendor = (req, res, next) => {
  if (
    req.user &&
    (req.user.role === "Admin" || req.user.role === "Vendor")
  ) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Access denied",
  });
};

module.exports = {
  protect,
  admin,
  vendor,
  customer,
  adminOrVendor,
};