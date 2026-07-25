import {
    useEffect,
    useState
} from "react";


import {
    useDispatch,
    useSelector
} from "react-redux";


import {
    useNavigate
} from "react-router-dom";


import {
    getAdminOrders,
    updateOrderStatus,
    deleteOrder
} from "../redux/orderSlice";





function OrderList(){


const dispatch = useDispatch();

const navigate = useNavigate();



// ==========================
// LOCAL STATE
// ==========================

const [search,setSearch] = useState("");

const [statusFilter,setStatusFilter] =
useState("All");




// ==========================
// REDUX STATE
// ==========================


const {
    orders = [],
    loading
}
=
useSelector(
state=>state.orders
);







// ==========================
// FETCH ORDERS
// ==========================


useEffect(()=>{


dispatch(
    getAdminOrders()
);


},[dispatch]);








// ==========================
// STATUS UPDATE
// ==========================


const handleStatusChange = (
    id,
    status
)=>{


dispatch(
    updateOrderStatus({
        id,
        status
    })
);


};








// ==========================
// DELETE ORDER
// ==========================


const handleDelete = (id)=>{


const confirmDelete =
window.confirm(
"Are you sure you want to delete this order?"
);



if(confirmDelete){

dispatch(
    deleteOrder(id)
);

}


};








// ==========================
// FILTER ORDERS
// ==========================


const filteredOrders =

orders.filter(order=>{


const searchValue =
search.toLowerCase();



const searchMatch =


order._id
?.toLowerCase()
.includes(searchValue)



||

order.user?.name
?.toLowerCase()
.includes(searchValue)

;



const statusMatch =


statusFilter==="All"

?

true

:

order.orderStatus===statusFilter;



return searchMatch && statusMatch;



});









return (

<div className="p-6">



<h1 className="text-3xl font-bold mb-8">

Order Management

</h1>









{/* FILTER */}

<div className="
bg-white
shadow
rounded-xl
p-5
mb-8
flex
flex-col
md:flex-row
gap-4
">



<input


type="text"


placeholder="Search Order ID or Customer"


value={search}


onChange={
e=>setSearch(e.target.value)
}


className="
border
rounded-lg
px-4
py-3
flex-1
outline-none
"

/>






<select


value={statusFilter}


onChange={
e=>setStatusFilter(e.target.value)
}


className="
border
rounded-lg
px-4
py-3
"



>


<option value="All">
All
</option>


<option value="Pending">
Pending
</option>


<option value="Processing">
Processing
</option>


<option value="Shipped">
Shipped
</option>


<option value="Delivered">
Delivered
</option>


<option value="Cancelled">
Cancelled
</option>


</select>



</div>










{/* TABLE */}



<div className="
bg-white
shadow
rounded-xl
overflow-hidden
">





{

loading

?

(

<div className="p-10 text-center">

Loading Orders...

</div>

)


:


filteredOrders.length===0


?


(

<div className="
p-10
text-center
text-gray-500
">

No Orders Found

</div>

)


:


(



<table className="w-full">



<thead className="bg-gray-100">


<tr>


<th className="p-4 text-left">

Order ID

</th>


<th className="p-4 text-left">

Customer

</th>


<th className="p-4">

Date

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

filteredOrders.map(order=>(


<tr

key={order._id}

className="
border-b
hover:bg-gray-50
"


>



<td className="p-4">

#{order._id.slice(-8)}

</td>






<td className="p-4">


<p className="font-semibold">

{
order.user?.name ||
"Customer"
}

</p>


<p className="text-sm text-gray-500">

{
order.user?.email ||
""
}

</p>


</td>








<td className="p-4 text-center">


{
new Date(
order.createdAt
)
.toLocaleDateString()
}


</td>







<td className="p-4 text-center font-semibold">


₹ {order.totalPrice || 0}


</td>







<td className="p-4 text-center">


<span className={`

px-3
py-1
rounded-full
text-sm

${
order.paymentStatus==="Paid"

?

"bg-green-100 text-green-700"

:

"bg-yellow-100 text-yellow-700"

}

`}>



{
order.paymentStatus ||
"Pending"
}



</span>


</td>









<td className="p-4 text-center">



<select


value={
order.orderStatus || "Pending"
}


onChange={
e=>
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
Delivered
</option>


<option>
Cancelled
</option>


</select>



</td>









<td className="p-4">


<div className="flex gap-2">



<button


onClick={()=>

navigate(
`/admin/orders/${order._id}`
)

}


className="
bg-blue-600
text-white
px-3
py-2
rounded-lg
"


>

View

</button>







<button


onClick={()=>handleDelete(order._id)}


className="
bg-red-500
text-white
px-3
py-2
rounded-lg
"


>

Delete

</button>



</div>


</td>






</tr>


))


}



</tbody>



</table>



)


}





</div>






</div>

);


}



export default OrderList;