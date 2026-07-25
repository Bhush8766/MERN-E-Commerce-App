import {
  Check,
  Package,
  Truck,
  Home,
  XCircle,
} from "lucide-react";


const OrderTimeline = ({
  status
}) => {


const steps = [

{
  title:"Order Placed",
  icon:<Package size={22}/>
},

{
  title:"Processing",
  icon:<Check size={22}/>
},

{
  title:"Shipped",
  icon:<Truck size={22}/>
},

{
  title:"Out for Delivery",
  icon:<Truck size={22}/>
},

{
  title:"Delivered",
  icon:<Home size={22}/>
},

];



const statusIndex = {

Pending:0,

Processing:1,

Shipped:2,

"Out for Delivery":3,

Delivered:4,

Cancelled:-1,

};



const currentStep =
statusIndex[status] ?? 0;



if(status==="Cancelled"){

return (

<div className="
flex
items-center
gap-3
text-red-600
bg-red-50
p-4
rounded-xl
">

<XCircle/>

<span className="
font-semibold
">

Order Cancelled

</span>


</div>

)

}



return (

<div className="
w-full
overflow-x-auto
">


<div className="
flex
items-center
min-w-[700px]
">


{
steps.map(
(step,index)=>(


<div
key={step.title}
className="
flex-1
flex
flex-col
items-center
relative
"
>


{/* Line */}

{
index !== steps.length-1 && (

<div
className={`
absolute
top-5
left-1/2
w-full
h-1

${
index < currentStep
?
"bg-green-500"
:
"bg-gray-200"
}

`}
/>

)

}



{/* Circle */}

<div
className={`
relative
z-10
w-10
h-10
rounded-full
flex
items-center
justify-center

${
index <= currentStep
?
"bg-green-500 text-white"
:
"bg-gray-200 text-gray-500"
}

`}
>


{step.icon}


</div>



<p
className={`
mt-3
text-sm
font-medium

${
index <= currentStep
?
"text-green-600"
:
"text-gray-500"
}

`}
>

{step.title}

</p>



</div>


))

}


</div>


</div>


);


};


export default OrderTimeline;