import {
  XCircle,
  RotateCcw,
  ShoppingCart,
} from "lucide-react";


import {
Link,
useParams
} from "react-router-dom";



const PaymentFailed =()=>{


const {id}=useParams();



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
shadow-lg
rounded-2xl
p-10
max-w-md
w-full
text-center
">



<XCircle

size={80}

className="
mx-auto
text-red-600
mb-6
"

/>



<h1 className="
text-3xl
font-bold
mb-3
">

Payment Failed ❌

</h1>




<p className="
text-gray-600
mb-6
">

Your payment could not be completed.

Please try again.

</p>




<div className="
space-y-3
">


<Link

to="/checkout"

className="
flex
justify-center
items-center
gap-2
bg-blue-600
text-white
py-3
rounded-xl
"

>


<RotateCcw size={20}/>

Retry Payment

</Link>




<Link

to="/cart"

className="
flex
justify-center
items-center
gap-2
border
py-3
rounded-xl
"

>


<ShoppingCart size={20}/>

Go To Cart


</Link>



</div>



</div>


</div>


);


};



export default PaymentFailed;