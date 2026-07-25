import {
  CheckCircle,
  Package,
  ShoppingBag,
} from "lucide-react";


import {
  Link,
  useParams,
} from "react-router-dom";


import {
useDispatch,
useSelector
} from "react-redux";


import {
getOrderDetails
} from "../redux/orderSlice";


import {
    useEffect,
    useState
} from "react";


const PaymentSuccess =()=>{


const {id}=useParams();

const dispatch = useDispatch();


useEffect(()=>{

dispatch(
 getOrderDetails(id)
);

},[dispatch,id]);


return (

<div className="
min-h-screen
bg-gray-50
flex
items-center
justify-center
px-6
">


<div className="
bg-white
rounded-2xl
shadow-lg
p-10
max-w-md
w-full
text-center
">


<CheckCircle

size={80}

className="
mx-auto
text-green-600
mb-6
"

/>



<h1 className="
text-3xl
font-bold
text-gray-800
mb-3
">

Payment Successful 🎉

</h1>



<p className="
text-gray-600
mb-6
">

Your order has been placed successfully.

</p>



<div className="
bg-gray-100
rounded-xl
p-4
mb-6
">


<p className="
text-sm
text-gray-500
">

Order ID

</p>


<p className="
font-semibold
break-all
">

{id}

</p>


</div>





<div className="
space-y-3
">


<Link

to={`/order/${id}`}

className="
flex
items-center
justify-center
gap-2
bg-blue-600
text-white
py-3
rounded-xl
hover:bg-blue-700
"

>


<Package size={20}/>

View Order

</Link>





<Link

to="/shop"

className="
flex
items-center
justify-center
gap-2
border
py-3
rounded-xl
"

>


<ShoppingBag size={20}/>

Continue Shopping

</Link>



</div>


</div>


</div>


);


};


export default PaymentSuccess;