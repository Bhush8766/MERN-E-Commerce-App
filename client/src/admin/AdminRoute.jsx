import {
Navigate
}
from "react-router-dom";


import {
useSelector
}
from "react-redux";



function AdminRoute({children}){


const {

user,
token,
initialized

}
=
useSelector(
state=>state.auth
);





if(!token){

return <Navigate to="/login"/>

}




if(!initialized){

return (

<div className="p-5">

Loading...

</div>

)

}





if(!user){

return <Navigate to="/login"/>

}




if(user.role !== "Admin"){


return <Navigate to="/" />;


}



return children;


}



export default AdminRoute;