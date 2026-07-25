const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");


// =====================================================
// Get Logged In User Profile
// =====================================================

exports.getUserProfile = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user.id)
    .select("-password");


  if (!user) {

    return res.status(404).json({
      success:false,
      message:"User not found"
    });

  }


  res.status(200).json({

    success:true,
    user

  });


});





// =====================================================
// Change Password
// =====================================================

exports.changePassword = async(req,res)=>{

try{


const {
oldPassword,
newPassword
}=req.body;



if(!oldPassword || !newPassword){

return res.status(400).json({

success:false,
message:"Old password and new password are required"

});

}



const user = await User.findById(req.user.id)
.select("+password");



const isMatch = await user.comparePassword(oldPassword);



if(!isMatch){

return res.status(400).json({

success:false,
message:"Old password incorrect"

});

}



user.password = newPassword;


await user.save();



res.json({

success:true,
message:"Password changed successfully"

});



}
catch(error){

res.status(500).json({

success:false,
message:error.message

});

}


};







// =====================================================
// Update Logged In User Profile
// =====================================================


exports.updateUserProfile = asyncHandler(async(req,res)=>{


const {
name,
email,
phone
}=req.body;



const user = await User.findById(req.user.id);



if(!user){

return res.status(404).json({

success:false,
message:"User not found"

});

}



user.name = name || user.name;

user.email = email || user.email;

user.phone = phone || user.phone;



await user.save();



res.status(200).json({

success:true,

message:"Profile updated successfully",

user

});


});








// =====================================================
// SAVED ADDRESS SECTION
// =====================================================



// ===============================
// Get All Addresses
// ===============================

exports.getAddresses = asyncHandler(async(req,res)=>{


const user = await User.findById(req.user.id);



if(!user){

return res.status(404).json({

success:false,
message:"User not found"

});

}



res.status(200).json({

success:true,

addresses:user.addresses || []

});


});







// ===============================
// Add New Address
// ===============================


exports.addAddress = asyncHandler(async(req,res)=>{


const user = await User.findById(req.user.id);



if(!user){

return res.status(404).json({

success:false,
message:"User not found"

});

}



const address = req.body;



// first address automatically default

if(user.addresses.length === 0){

address.isDefault = true;

}
else{

address.isDefault = false;

}



user.addresses.push(address);



await user.save();



res.status(201).json({

success:true,

message:"Address added successfully",

addresses:user.addresses

});


});







// ===============================
// Update Address
// ===============================


exports.updateAddress = asyncHandler(async(req,res)=>{


const user = await User.findById(req.user.id);



const address = user.addresses.id(req.params.id);



if(!address){

return res.status(404).json({

success:false,

message:"Address not found"

});

}



Object.assign(address,req.body);



await user.save();



res.status(200).json({

success:true,

message:"Address updated successfully",

addresses:user.addresses

});


});








// ===============================
// Delete Address
// ===============================


exports.deleteAddress = asyncHandler(async(req,res)=>{


const user = await User.findById(req.user.id);



user.addresses =
user.addresses.filter(
(address)=>
address._id.toString() !== req.params.id
);



await user.save();



res.status(200).json({

success:true,

message:"Address deleted successfully",

addresses:user.addresses

});


});








// ===============================
// Set Default Address
// ===============================


exports.setDefaultAddress = asyncHandler(async(req,res)=>{


const user = await User.findById(req.user.id);



user.addresses.forEach((address)=>{


address.isDefault =
address._id.toString() === req.params.id;


});



await user.save();



res.status(200).json({

success:true,

message:"Default address updated",

addresses:user.addresses

});


});










// =====================================================
// Admin Section
// =====================================================


// ===============================
// Get All Users
// ===============================


exports.getAllUsers = asyncHandler(async(req,res)=>{


const users = await User.find()
.select("-password");



res.status(200).json({

success:true,

users

});


});








// ===============================
// Get User By ID
// ===============================


exports.getUserById = asyncHandler(async(req,res)=>{


const user = await User.findById(req.params.id)
.select("-password");



if(!user){

return res.status(404).json({

success:false,
message:"User not found"

});

}



res.status(200).json({

success:true,

user

});


});








// ===============================
// Update User
// ===============================


exports.updateUser = asyncHandler(async(req,res)=>{


const user = await User.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true,
runValidators:true
}

);



if(!user){

return res.status(404).json({

success:false,
message:"User not found"

});

}



res.status(200).json({

success:true,

message:"User updated successfully",

user

});


});









// ===============================
// Delete User
// ===============================


exports.deleteUser = asyncHandler(async(req,res)=>{


const user = await User.findById(req.params.id);



if(!user){

return res.status(404).json({

success:false,
message:"User not found"

});

}



await user.deleteOne();



res.status(200).json({

success:true,

message:"User deleted successfully"

});


});









// ===============================
// Block User
// ===============================


exports.blockUser = asyncHandler(async(req,res)=>{


const user = await User.findById(req.params.id);



if(!user){

return res.status(404).json({

success:false,
message:"User not found"

});

}



user.isBlocked=true;


await user.save();



res.status(200).json({

success:true,

message:"User blocked successfully"

});


});









// ===============================
// Unblock User
// ===============================


exports.unblockUser = asyncHandler(async(req,res)=>{


const user = await User.findById(req.params.id);



if(!user){

return res.status(404).json({

success:false,
message:"User not found"

});

}



user.isBlocked=false;


await user.save();



res.status(200).json({

success:true,

message:"User unblocked successfully"

});


});









// ===============================
// Update User Role
// ===============================


exports.updateUserRole = asyncHandler(async(req,res)=>{


const {
role
}=req.body;



const user = await User.findById(req.params.id);



if(!user){

return res.status(404).json({

success:false,

message:"User not found"

});

}



user.role=role;



await user.save();



res.status(200).json({

success:true,

message:"Role updated successfully",

user

});


});