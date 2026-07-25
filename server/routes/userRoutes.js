const express = require("express");

const router = express.Router();


const {

  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  blockUser,
  unblockUser,
  updateUserRole,

  getUserProfile,
  updateUserProfile,
  changePassword,


  // Address Controllers

  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress


} = require("../controllers/userController");



const { protect } = require("../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");




// =====================================================
// Logged In User Routes
// =====================================================


// Get My Profile

router.get(
"/profile",
protect,
getUserProfile
);



// Update My Profile

router.put(
"/profile",
protect,
updateUserProfile
);




// Change Password

router.put(
"/change-password",
protect,
changePassword
);






// =====================================================
// SAVED ADDRESS ROUTES
// =====================================================



// Get All Addresses

router.get(
"/addresses",
protect,
getAddresses
);




// Add Address

router.post(
"/addresses",
protect,
addAddress
);




// Update Address

router.put(
"/addresses/:id",
protect,
updateAddress
);




// Delete Address

router.delete(
"/addresses/:id",
protect,
deleteAddress
);




// Set Default Address

router.put(
"/addresses/default/:id",
protect,
setDefaultAddress
);







// =====================================================
// User Management Routes
// =====================================================


// Get All Users

router.get(
"/",
protect,
getAllUsers
);




// Get Single User

router.get(
"/:id",
protect,
getUserById
);








// =====================================================
// ADMIN ROUTES
// =====================================================


// Update User

router.put(
"/:id",
protect,
authorize("Admin"),
updateUser
);




// Delete User

router.delete(
"/:id",
protect,
authorize("Admin"),
deleteUser
);




// Block User

router.patch(
"/block/:id",
protect,
authorize("Admin"),
blockUser
);




// Unblock User

router.patch(
"/unblock/:id",
protect,
authorize("Admin"),
unblockUser
);




// Update Role

router.patch(
"/role/:id",
protect,
authorize("Admin"),
updateUserRole
);



module.exports = router;