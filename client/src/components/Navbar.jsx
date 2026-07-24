import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";

import { logout } from "../redux/authSlice";



const Navbar = () => {


const dispatch = useDispatch();


const { user } = useSelector(
(state)=>state.auth
);


const { count } = useSelector(
  (state) => state.wishlist
);

const cartItems =
useSelector(
state=>state.cart.items
);



const cartCount =
cartItems.reduce(

(total,item)=>
total + item.quantity

,0);




return (

<nav className="bg-white shadow-md px-6 py-4">


<div className="max-w-7xl mx-auto flex justify-between items-center">


<Link 
to="/"
className="text-3xl font-bold text-blue-600"
>
ShopSphere
</Link>



<div className="flex items-center gap-6">


<Link to="/shop">
Shop
</Link>


<Link to="/wishlist">
<FaHeart className="text-red-500"/>
</Link>


<Link to="/cart">
<FaShoppingCart />  
{/* ({cartCount}) */}
</Link>



{
user ? (

<>

<span>
Hi {user.name}
</span>


<button
onClick={()=>dispatch(logout())}
className="text-red-500"
>
Logout
</button>


</>


):(


<>

<Link to="/login">
Login
</Link>


<Link 
to="/register"
className="bg-blue-600 text-white px-4 py-2 rounded-lg"
>
Register
</Link>


</>


)

}


</div>


</div>


</nav>

);


};


export default Navbar;