import {
  useEffect,
  useState,
} from "react";


import {
  useDispatch,
  useSelector,
} from "react-redux";


import {
  Link,
} from "react-router-dom";


import {
  Search,
  Eye,
  Trash2,
  PackageCheck,
} from "lucide-react";


import {
  toast,
} from "react-toastify";


import {
  getAdminOrders,
  updateOrderStatus,
  deleteOrder,
} from "../redux/orderSlice";


const OrderManagement =()=>{


const dispatch = useDispatch();



const {
  orders,
  loading,
} = useSelector(
  (state)=>state.orders
);



const [search,setSearch]
=
useState("");



const [status,setStatus]
=
useState("All");



useEffect(()=>{

dispatch(
  getAdminOrders()
);

},[dispatch]);


const handleStatusChange =
async(id,newStatus)=>{


try{


await dispatch(

updateOrderStatus({

id,

status:newStatus

})

).unwrap();



toast.success(
"Order status updated"
);



}


catch(error){


toast.error(
error || "Update failed"
);


}


};


const handleDelete =
async(id)=>{


const confirm =
window.confirm(
"Delete this order?"
);



if(!confirm)
return;



try{


await dispatch(
deleteOrder(id)
).unwrap();



toast.success(
"Order deleted"
);



}

catch(error){

toast.error(
error || "Delete failed"
);

}


};


const filteredOrders =
orders.filter((order)=>{


const matchSearch =

order._id
.toLowerCase()
.includes(
search.toLowerCase()
)

||

order.user?.name
?.toLowerCase()
.includes(
search.toLowerCase()
);



const matchStatus =

status==="All"
||
order.orderStatus===status;



return (
matchSearch &&
matchStatus
);


});


return (

<div className="
max-w-7xl
mx-auto
px-6
py-10
">


<h1 className="
text-3xl
font-bold
flex
items-center
gap-3
mb-8
">

<PackageCheck/>

Order Management

</h1>


<div className="
bg-white
border
rounded-xl
p-5
mb-6
flex
gap-4
flex-wrap
">


<div className="
flex
items-center
border
rounded-lg
px-3
flex-1
">


<Search size={20}/>


<input

value={search}

onChange={
(e)=>setSearch(e.target.value)
}

placeholder="
Search order/customer
"

className="
p-2
outline-none
w-full
"

/>


</div>




<select

value={status}

onChange={
(e)=>setStatus(e.target.value)
}

className="
border
rounded-lg
px-4
py-2
"

>


<option>
All
</option>

<option>
Pending
</option>

<option>
Processing
</option>

<option>
Shipped
</option>

<option>
Out for Delivery
</option>

<option>
Delivered
</option>

<option>
Cancelled
</option>


</select>



</div>



<div className="
bg-white
rounded-xl
border
overflow-x-auto
">


<table className="
w-full
">


<thead className="
bg-gray-100
">


<tr>


<th className="p-4 text-left">
Order
</th>


<th className="p-4">
Customer
</th>


<th className="p-4">
Amount
</th>


<th className="p-4">
Payment
</th>


<th className="p-4">
Status
</th>


<th className="p-4">
Action
</th>


</tr>


</thead>



<tbody>


{
filteredOrders.map(
(order)=>(


<tr
key={order._id}
className="
border-t
"
>


<td className="p-4">

#{order._id.slice(-8)}

</td>



<td className="p-4">

{order.user?.name}

<br/>

<span className="
text-sm
text-gray-500
">

{order.user?.email}

</span>

</td>



<td className="p-4 font-semibold">

₹{order.totalPrice}

</td>



<td className="p-4">

{order.paymentStatus}

</td>



<td className="p-4">


<select

value={
order.orderStatus
}

onChange={
(e)=>
handleStatusChange(
order._id,
e.target.value
)
}

className="
border
rounded-lg
px-3
py-2
"


>


<option>
Pending
</option>


<option>
Processing
</option>


<option>
Shipped
</option>


<option>
Out for Delivery
</option>


<option>
Delivered
</option>


<option>
Cancelled
</option>


</select>


</td>


<td className="
p-4
">


<div className="
flex
gap-2
">


<Link

to={`/order/${order._id}`}

className="
bg-blue-600
text-white
p-2
rounded-lg
"

>


<Eye size={18}/>


</Link>




<button

onClick={()=>
handleDelete(order._id)
}

className="
bg-red-600
text-white
p-2
rounded-lg
"

>


<Trash2 size={18}/>


</button>


</div>


</td>


</tr>


))

}


</tbody>


</table>


</div>


</div>


);


};


export default OrderManagement;