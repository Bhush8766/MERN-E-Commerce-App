import {
useState
} from "react";


import {
useDispatch,
useSelector
} from "react-redux";


import {
changePassword
} from "../redux/userSlice";



function ChangePassword(){


const dispatch=useDispatch();



const {
loading,
success,
error
}=useSelector(
state=>state.users
);


 const [formData,setFormData] = useState({
    currentPassword:"",
    newPassword:"",
    confirmPassword:""
  });



  const {
    currentPassword,
    newPassword,
    confirmPassword
  } = formData;



  const handleChange = (e)=>{

    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });

  };



  const submitHandler = (e)=>{

    e.preventDefault();


    if(newPassword !== confirmPassword){

      alert("Passwords do not match");
      return;

    }


    dispatch(
      changePassword({
        currentPassword,
        newPassword
      })
    );

  };







return (

<div className="
max-w-md
mx-auto
mt-10
bg-white
shadow
rounded-xl
p-6
">


<h1 className="
text-2xl
font-bold
mb-6
">

Change Password

</h1>



<form
onSubmit={submitHandler}
className="space-y-4"
>



<input

type="password"

name="currentPassword"

placeholder="Current Password"

value={currentPassword}
        onChange={handleChange}

className="
border
w-full
p-3
rounded-lg
"

/>



<input

type="password"

name="newPassword"

placeholder="New Password"

value={newPassword}
        onChange={handleChange}

className="
border
w-full
p-3
rounded-lg
"

/>



<input

type="password"

name="confirmPassword"

placeholder="Confirm Password"

onChange={handleChange}

className="
border
w-full
p-3
rounded-lg
"

/>



<button

disabled={loading}

className="
bg-blue-600
text-white
w-full
py-3
rounded-lg
"

>

{
loading
?
"Updating..."
:
"Change Password"
}

</button>



</form>





{
success &&

<p className="text-green-600 mt-4">

Password changed successfully

</p>

}



{
error &&

<p className="text-red-600 mt-4">

{error}

</p>

}



</div>

);


}


export default ChangePassword;