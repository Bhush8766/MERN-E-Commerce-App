import {
  Link
} from "react-router-dom";


import {
  Eye,
  XCircle,
  CalendarDays,
  CreditCard,
} from "lucide-react";


import {
  toast
} from "react-toastify";



const OrderCard = ({
  order,
  onCancel
}) => {



const statusColor=(status)=>{


switch(status){


case "Delivered":

return "bg-green-100 text-green-700";


case "Processing":

return "bg-blue-100 text-blue-700";


case "Shipped":

return "bg-purple-100 text-purple-700";


case "Cancelled":

return "bg-red-100 text-red-700";


default:

return "bg-yellow-100 text-yellow-700";


}


};



return (

<div className="
bg-white
border
rounded-xl
shadow-sm
p-6
">


{/* Header */}

<div className="
flex
justify-between
items-center
mb-5
">


<div>


<h2 className="
font-semibold
text-lg
">

Order #
{order._id.slice(-8)}

</h2>



<p className="
text-sm
text-gray-500
flex
gap-2
items-center
mt-2
">


<CalendarDays size={16}/>


{
new Date(
order.createdAt
)
.toDateString()

}


</p>


</div>




<span
className={`
px-4
py-2
rounded-full
text-sm
font-medium

${statusColor(order.orderStatus)}

`}
>

{order.orderStatus}

</span>


</div>





{/* Products */}


<div className="
space-y-3
">


{
order.products
.slice(0,3)
.map(
(item)=>(


<div
key={item._id}
className="
flex
items-center
gap-4
"
>


<img

src={
item.image ||
"/placeholder.png"
}

className="
w-16
h-16
rounded-lg
object-cover
"

/>



<div>


<h3 className="
font-medium
">

{item.name}

</h3>


<p className="
text-sm
text-gray-500
">

Qty:
{item.quantity}

</p>


</div>



</div>


))

}


</div>





{/* Footer */}

<div className="
border-t
mt-5
pt-5
flex
justify-between
items-center
">


<div>


<p className="
flex
gap-2
items-center
text-gray-600
">

<CreditCard size={18}/>


{order.paymentStatus}


</p>



<p className="
text-xl
font-bold
mt-2
">

₹{order.totalPrice}

</p>


</div>





<div className="
flex
gap-3
">


<Link

to={`/order/${order._id}`}

className="
bg-blue-600
text-white
px-5
py-2
rounded-lg
flex
items-center
gap-2
"

>

<Eye size={18}/>

View

</Link>




{
order.orderStatus==="Pending" &&

<button

onClick={()=>{

if(
window.confirm(
"Cancel this order?"
)
)

{

onCancel(order._id);

}

}}

className="
bg-red-600
text-white
px-5
py-2
rounded-lg
flex
items-center
gap-2
"

>

<XCircle size={18}/>

Cancel

</button>


}


</div>


</div>


</div>

);


};


export default OrderCard;