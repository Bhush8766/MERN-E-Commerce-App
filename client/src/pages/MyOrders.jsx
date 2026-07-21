import React,{useEffect}
from "react";


import {
useDispatch,
useSelector
}
from "react-redux";


import {
getMyOrders
}
from "../redux/orderSlice";




function MyOrders(){


const dispatch=useDispatch();



const orders =
useSelector(
state=>state.orders.orders
);





useEffect(()=>{


dispatch(
getMyOrders()
);


},[dispatch]);






return(


<div>


<h1>
My Orders
</h1>



{

orders.map(order=>(


<div

className="order-card"

key={order._id}

>


<h3>

Order ID:
{order._id}

</h3>



<h3>

Amount:
₹ {order.totalPrice}

</h3>



<p>

Status:
{order.status}

</p>


</div>


))

}



</div>


)


}


export default MyOrders;