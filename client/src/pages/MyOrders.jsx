import { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Package,
  Eye,
  XCircle,
  CalendarDays,
  CreditCard,
} from "lucide-react";

import { toast } from "react-toastify";


import {
  getMyOrders,
  cancelOrder,
} from "../redux/orderSlice";


import OrderCard from "../components/OrderCard";


const MyOrders = () => {


  const dispatch = useDispatch();

  const navigate = useNavigate();



  const {
    orders,
    loading,
    error,
  } = useSelector(
    (state)=>state.orders
  );



  useEffect(()=>{

    dispatch(getMyOrders());

  },[dispatch]);


  const handleCancelOrder = async(id)=>{

  const confirmCancel =
    window.confirm(
      "Are you sure you want to cancel this order?"
    );


  if(!confirmCancel)
    return;



  try{

    await dispatch(
      cancelOrder(id)
    ).unwrap();



    toast.success(
      "Order cancelled successfully"
    );


  }
  catch(error){

    toast.error(
      error || "Unable to cancel order"
    );

  }

};

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

<div className="max-w-6xl mx-auto px-6 py-10">


<h1 className="
text-3xl
font-bold
mb-8
flex
items-center
gap-3
">

<Package/>

My Orders

</h1>



{
loading && (

<div className="
text-center
py-20
">

Loading orders...

</div>

)
}



{
!loading &&
orders.length===0 && (

<div className="
text-center
py-20
border
rounded-xl
">

<h2 className="
text-xl
font-semibold
">

No Orders Found

</h2>


<p className="
text-gray-500
mt-2
">

Start shopping to place your first order.

</p>


<Link
to="/shop"
className="
inline-block
mt-5
bg-blue-600
text-white
px-6
py-3
rounded-lg
"
>

Shop Now

</Link>


</div>

)

}



<div className="
space-y-6
">

{
orders.map(
(order)=>(

<OrderCard

key={order._id}

order={order}

onCancel={handleCancelOrder}

/>

)

)
}

</div>


</div>

);

};


export default MyOrders;