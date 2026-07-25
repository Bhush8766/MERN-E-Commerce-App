import axiosInstance from "./axiosInstance";




// =====================================================
// PROFILE
// =====================================================


// Get Profile

export const getProfileApi = ()=>{

return axiosInstance.get(
"/users/profile"
);

};





// Update Profile

export const updateProfileApi=(data)=>{

return axiosInstance.put(
"/users/profile",
data
);

};









// =====================================================
// PASSWORD
// =====================================================


export const changePasswordApi=(data)=>{

return axiosInstance.put(
"/users/change-password",
data
);

};










// =====================================================
// ADMIN USERS
// =====================================================


// Get Users

export const getUsersApi=()=>{

return axiosInstance.get(
"/users"
);

};




// Update Role

export const updateUserRoleApi=(id,role)=>{

return axiosInstance.patch(

`/users/role/${id}`,

{
role
}

);

};




// Delete User

export const deleteUserApi=(id)=>{

return axiosInstance.delete(

`/users/${id}`

);

};









// =====================================================
// SAVED ADDRESS API
// =====================================================


// Get Saved Addresses

export const getAddressesApi=()=>{

return axiosInstance.get(

"/users/addresses"

);

};







// Add New Address

export const addAddressApi=(data)=>{


return axiosInstance.post(

"/users/addresses",

data

);


};








// Update Address

export const updateAddressApi=(id,data)=>{


return axiosInstance.put(

`/users/addresses/${id}`,

data

);


};








// Delete Address

export const deleteAddressApi=(id)=>{


return axiosInstance.delete(

`/users/addresses/${id}`

);


};









// Set Default Address

export const setDefaultAddressApi=(id)=>{


return axiosInstance.put(

`/users/addresses/default/${id}`

);


};