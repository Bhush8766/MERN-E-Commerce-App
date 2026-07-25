import {
    useEffect
} from "react";


import {
    useParams,
    useNavigate
} from "react-router-dom";


import {
    useDispatch,
    useSelector
} from "react-redux";


import {
    getOrderDetails,
    updateOrderStatus
} from "../redux/orderSlice";





function OrderDetails(){


const {
    id
}
=
useParams();



const navigate =
useNavigate();


const dispatch =
useDispatch();





const {
    order,
    loading
}
=
useSelector(
state=>state.orders
);







useEffect(()=>{


dispatch(
    getOrderDetails(id)
);


},[dispatch,id]);









const handleStatusChange=(status)=>{


dispatch(

updateOrderStatus({

id:order._id,

status

})

);


};









if(loading){


return (

<div className="p-10 text-center">

Loading Order Details...

</div>

);


}









if(!order){


return (

<div className="p-10 text-center">


<h2 className="text-xl font-bold">

Order Not Found

</h2>



<button

onClick={()=>navigate(-1)}

className="
mt-5
bg-blue-600
text-white
px-5
py-2
rounded-lg
"

>

Go Back

</button>


</div>

);


}









return (

<div className="p-6">





{/* HEADER */}

<div className="flex justify-between items-center mb-8">


<div>


<h1 className="text-3xl font-bold">

Order Details

</h1>


<p className="text-gray-500 mt-2">

Order ID:
{" "}
#{order._id}

</p>


</div>





<button


onClick={()=>navigate(-1)}


className="
bg-gray-200
px-5
py-2
rounded-lg
"


>

Back

</button>



</div>










{/* CUSTOMER + PAYMENT */}



<div className="
grid
md:grid-cols-2
gap-6
mb-8
">






<div className="
bg-white
shadow
rounded-xl
p-6
">


<h2 className="text-xl font-bold mb-4">

Customer Information

</h2>



<p>

<b>Name:</b>
{" "}
{order.user?.name}

</p>



<p>

<b>Email:</b>
{" "}
{order.user?.email}

</p>



</div>









<div className="
bg-white
shadow
rounded-xl
p-6
">


<h2 className="text-xl font-bold mb-4">

Payment Information

</h2>



<p>

<b>Method:</b>
{" "}
{order.paymentMethod}

</p>



<p>

<b>Status:</b>
{" "}
{order.paymentStatus}

</p>



<p>

<b>Total:</b>
{" "}
₹ {order.totalPrice}

</p>



</div>




</div>









{/* SHIPPING ADDRESS */}



<div className="
bg-white
shadow
rounded-xl
p-6
mb-8
">


<h2 className="text-xl font-bold mb-4">

Shipping Address

</h2>



<p>

{
order.shippingAddress?.address
}

</p>


<p>

{
order.shippingAddress?.city
}

</p>


<p>

{
order.shippingAddress?.state
}

</p>


<p>

{
order.shippingAddress?.postalCode
}

</p>


</div>









{/* ORDER STATUS */}



<div className="
bg-white
shadow
rounded-xl
p-6
mb-8
">


<h2 className="text-xl font-bold mb-5">

Order Status

</h2>




<div className="flex flex-col md:flex-row gap-4">



{

[
"Pending",
"Processing",
"Shipped",
"Delivered"
]

.map(status=>(


<button


key={status}


onClick={()=>handleStatusChange(status)}


className={`

px-5

py-3

rounded-lg

font-semibold


${
order.orderStatus===status

?

"bg-blue-600 text-white"

:

"bg-gray-100"

}


`}

>


{status}


</button>


))


}



</div>


</div>









{/* ORDER ITEMS */}




<div className="
bg-white
shadow
rounded-xl
p-6
">



<h2 className="text-xl font-bold mb-5">

Order Items

</h2>






<table className="w-full">



<thead>


<tr className="border-b">


<th className="p-3 text-left">

Product

</th>


<th>

Quantity

</th>


<th>

Price

</th>


<th>

Total

</th>


</tr>


</thead>






<tbody>




{

order.orderItems?.map(item=>(



<tr

key={item.product}


className="border-b"

>



<td className="p-3 flex items-center gap-4">



<img


src={
item.image
}

alt={
item.name
}


className="
w-16
h-16
object-cover
rounded-lg
"


/>




<div>


<p className="font-semibold">

{
item.name
}

</p>


</div>



</td>






<td className="text-center">


{
item.quantity
}


</td>






<td className="text-center">


₹ {item.price}


</td>






<td className="text-center font-bold">


₹ {item.price * item.quantity}


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



export default OrderDetails;