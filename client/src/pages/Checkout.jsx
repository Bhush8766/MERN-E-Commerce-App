import React,{useState}
from "react";


import {
useDispatch,
useSelector
}
from "react-redux";


import {
createOrder
}
from "../redux/orderSlice";


import {
useNavigate
}
from "react-router-dom";




function Checkout(){


const dispatch=useDispatch();

const navigate=useNavigate();



const cart =
useSelector(
state=>state.cart.items
);




const [address,setAddress]=useState({

city:"",
street:"",
phone:"",
pincode:""

});





const total =
cart.reduce(

(sum,item)=>
sum + item.price * item.quantity

,0);







const submitHandler=(e)=>{


e.preventDefault();



const orderData={


orderItems:cart,


shippingAddress:address,


totalPrice:total


};



dispatch(
createOrder(orderData)
);



navigate("/orders");


};






return(


<div className="checkout">


<h1>
Checkout
</h1>



<form onSubmit={submitHandler}>


<input

placeholder="Street"

onChange={
e=>setAddress({
...address,
street:e.target.value
})
}

/>



<input

placeholder="City"

onChange={
e=>setAddress({
...address,
city:e.target.value
})
}

/>




<input

placeholder="Phone"

onChange={
e=>setAddress({
...address,
phone:e.target.value
})
}

/>




<input

placeholder="Pincode"

onChange={
e=>setAddress({
...address,
pincode:e.target.value
})
}

/>



<h2>

Total ₹ {total}

</h2>



<button>

Place Order

</button>


</form>


</div>


)


}



export default Checkout;