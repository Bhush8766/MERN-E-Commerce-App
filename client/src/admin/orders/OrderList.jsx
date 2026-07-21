import {
useEffect
}
from "react";


import {
useDispatch,
useSelector
}
from "react-redux";


import {
getOrders,
updateOrderStatus,
deleteOrder
}
from "../../redux/orderSlice";




const statusList=[

"Pending",
"Confirmed",
"Processing",
"Shipped",
"Out for Delivery",
"Delivered",
"Cancelled",
"Returned"

];



function OrderList(){


const dispatch = useDispatch();



const {
adminOrders,
loading
}
=
useSelector(
state=>state.orders
);



useEffect(()=>{


dispatch(getOrders());


},[dispatch]);






const changeStatus=(id,status)=>{


dispatch(

updateOrderStatus({

id,
status

})

);


};





const removeOrder=(id)=>{


const confirmDelete =
window.confirm(
"Delete this order?"
);


if(confirmDelete){

dispatch(
deleteOrder(id)
);

}


};






return (

<div className="p-6">


<h1 className="text-3xl font-bold mb-6">

Order Management

</h1>



{
loading &&

<p>
Loading Orders...
</p>

}




<div className="overflow-x-auto">


<table className="w-full border">


<thead>


<tr className="bg-gray-100">


<th className="p-3 border">
Order ID
</th>


<th className="p-3 border">
Customer
</th>


<th className="p-3 border">
Items
</th>


<th className="p-3 border">
Amount
</th>


<th className="p-3 border">
Payment
</th>


<th className="p-3 border">
Status
</th>


<th className="p-3 border">
Action
</th>


</tr>


</thead>





<tbody>


{
adminOrders?.map(order=>(


<tr key={order._id}>


<td className="border p-3">

{order._id.slice(-8)}

</td>




<td className="border p-3">


{
order.user?.name
}


<br/>


{
order.user?.email
}


</td>




<td className="border p-3">

{
order.totalItems
}

</td>




<td className="border p-3">

₹ {order.totalPrice}

</td>




<td className="border p-3">

{order.paymentMethod}

<br/>

{order.paymentStatus}

</td>





<td className="border p-3">


<select

value={
order.orderStatus
}

onChange={(e)=>

changeStatus(

order._id,
e.target.value

)

}


className="border p-2"


>


{

statusList.map(status=>(

<option

key={status}

value={status}

>

{status}

</option>


))

}


</select>


</td>





<td className="border p-3">


<button

onClick={()=>removeOrder(order._id)}

className="bg-red-500 text-white px-4 py-2 rounded"

>

Delete

</button>


</td>



</tr>


))

}



</tbody>


</table>


</div>


</div>

);


}


export default OrderList;