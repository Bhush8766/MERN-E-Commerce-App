import {
  useEffect,
} from "react";


import {
  useParams,
  Link,
} from "react-router-dom";


import {
  useDispatch,
  useSelector,
} from "react-redux";


import {
  MapPin,
  Package,
  CreditCard,
  ArrowLeft,
  XCircle,
} from "lucide-react";


import {
  toast,
} from "react-toastify";


import {
  getOrderDetails,
  cancelOrder,
} from "../redux/orderSlice";

import OrderTimeline from "../components/OrderTimeline";


import {
FileText
} from "lucide-react";


import {
downloadInvoiceAPI
} from "../api/invoiceApi";



const OrderDetails = ()=>{


const { id } = useParams();


const dispatch = useDispatch();



const {
  order,
  loading,
} = useSelector(
  (state)=>state.orders
);



useEffect(()=>{


dispatch(
  getOrderDetails(id)
);


},[
dispatch,
id
]);



const handleCancel = async()=>{


const confirm =
window.confirm(
"Cancel this order?"
);


if(!confirm)
return;



try{


await dispatch(
cancelOrder(order._id)
).unwrap();



toast.success(
"Order cancelled"
);



dispatch(
getOrderDetails(id)
);



}
catch(error){


toast.error(
error || "Cancel failed"
);


}



};


if(loading || !order){

return (

<div className="
text-center
py-20
text-xl
">

Loading order details...

</div>

)

}




const downloadInvoice = async()=>{


try{


const pdf =
await downloadInvoiceAPI(order._id);



const url =
window.URL.createObjectURL(
new Blob([pdf])
);



const link =
document.createElement("a");



link.href=url;


link.download=
`invoice-${order._id}.pdf`;



document.body.appendChild(link);


link.click();


link.remove();



}
catch(error){

toast.error(
"Invoice download failed"
);

}


};



return (

<div className="
max-w-6xl
mx-auto
px-6
py-10
">


<Link
to="/my-orders"
className="
flex
items-center
gap-2
text-blue-600
mb-6
"
>

<ArrowLeft size={18}/>

Back to Orders

</Link>



<div className="
flex
justify-between
items-center
mb-8
">


<div>


<h1 className="
text-3xl
font-bold
">

Order Details

</h1>


<p className="
text-gray-500
mt-2
">

Order #
{order._id}

</p>


</div>


<span className="
bg-blue-100
text-blue-700
px-4
py-2
rounded-full
font-medium
">

{order.orderStatus}

</span>


</div>


<div className="
bg-white
border
rounded-xl
shadow-sm
p-6
mb-6
">


<h2 className="
text-xl
font-semibold
flex
items-center
gap-2
mb-4
">

<MapPin/>

Delivery Address

</h2>



<div className="
space-y-1
text-gray-700
">


<p className="font-semibold">

{order.shippingAddress.fullName}

</p>


<p>

{order.shippingAddress.phone}

</p>


<p>

{order.shippingAddress.address}

</p>


<p>

{order.shippingAddress.city},

{order.shippingAddress.state}

</p>


<p>

{order.shippingAddress.country}

-

{order.shippingAddress.pincode}

</p>


</div>


</div>



<div className="
bg-white
border
rounded-xl
p-6
mb-6
">


<h2 className="
text-xl
font-semibold
mb-5
flex
gap-2
items-center
">

<Package/>

Order Status

</h2>



<OrderTimeline

status={
order.orderStatus
}

/>


</div>



<div className="
bg-white
border
rounded-xl
p-6
mb-6
">


<h2 className="
text-xl
font-semibold
mb-5
">

Products

</h2>



<div className="
space-y-5
">


{
order.products.map(
(item)=>(


<div

key={item._id}

className="
flex
items-center
justify-between
border-b
pb-4
"

>


<div className="
flex
gap-4
items-center
">


<img

src={
item.image ||
"/placeholder.png"
}

className="
w-20
h-20
rounded-lg
object-cover
"

/>



<div>


<h3 className="
font-semibold
">

{item.name}

</h3>


<p className="
text-gray-500
">

Quantity:
{item.quantity}

</p>


{
item.size &&

<p>

Size:
{item.size}

</p>

}



{
item.color &&

<p>

Color:
{item.color}

</p>

}


</div>


</div>



<div className="
font-bold
">

₹
{item.price}

</div>


</div>


))

}


</div>


</div>



<div className="
bg-white
border
rounded-xl
p-6
mb-6
">


<h2 className="
text-xl
font-semibold
flex
items-center
gap-2
mb-4
">

<CreditCard/>

Payment Summary

</h2>



<div className="
space-y-2
">


<p>

Method:

<span className="
font-semibold
ml-2
">

{order.paymentMethod}

</span>

</p>



<p>

Payment Status:

<span className="
font-semibold
ml-2
">

{order.paymentStatus}

</span>

</p>




<p>

Items Price:

₹{order.itemsPrice}

</p>


<p>

Shipping:

₹{order.shippingPrice}

</p>


<p>

Tax:

₹{order.taxPrice}

</p>



<hr/>


<p className="
text-xl
font-bold
">

Total:

₹{order.totalPrice}

</p>


</div>


</div>



{
order.orderStatus==="Pending" &&

<button

onClick={handleCancel}

className="
bg-red-600
text-white
px-6
py-3
rounded-lg
flex
items-center
gap-2
"

>


<XCircle/>

Cancel Order


</button>

}

</div>

);


};


export default OrderDetails;

