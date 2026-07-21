import React,{useEffect}
from "react";


import {
useDispatch,
useSelector
}
from "react-redux";


import {
getProfile
}
from "../redux/authSlice";



function Profile(){


const dispatch=useDispatch();


const {

user

}=useSelector(
state=>state.auth
);



useEffect(()=>{


dispatch(getProfile());


},[dispatch]);




return(

<div className="profile">


<h1>
My Profile
</h1>


{

user &&

<>

<h2>
{user.name}
</h2>


<p>
{user.email}
</p>


<p>
Role : {user.role}
</p>


</>

}


</div>

)


}



export default Profile;