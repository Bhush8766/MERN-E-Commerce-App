import {
    useEffect
} from "react";


import {
    useDispatch,
    useSelector
} from "react-redux";


import {
    getDashboardStats,
    getSalesAnalytics
} from "../../redux/dashboardSlice";


import {
    getOrders
} from "../../redux/orderSlice";


import {
    getAdminProducts
} from "../../redux/adminSlice";


import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
PieChart,
Pie,
Cell
}
from "recharts";






function Dashboard(){


const dispatch = useDispatch();




const {
    stats
}
=
useSelector(
state=>state.dashboard
);


const {
analytics
}
=
useSelector(
state=>state.dashboard
);


const {
    adminOrders
}
=
useSelector(
state=>state.orders
);



const {
    products
}
=
useSelector(
state=>state.admin
);





useEffect(()=>{


dispatch(
getDashboardStats()
);


dispatch(
getOrders()
);


dispatch(
getAdminProducts()
);



},[dispatch]);






// ============================
// Revenue Calculation
// ============================


const revenue =
adminOrders?.reduce(

(total,order)=>

total + order.totalPrice,

0

) || 0;






// ============================
// Top Products
// ============================


const topProducts =
products
?.slice(0,5) || [];







return (

<div className="p-6">



<h1 className="text-3xl font-bold mb-8">

Admin Analytics

</h1>





{/* =====================
Revenue Cards
===================== */}



<div className="grid md:grid-cols-3 gap-6 mb-10">



<div className="bg-white shadow rounded-xl p-6">


<h3 className="text-gray-500">

Revenue

</h3>


<p className="text-3xl font-bold">

₹ {revenue}

</p>


</div>






<div className="bg-white shadow rounded-xl p-6">


<h3 className="text-gray-500">

Orders

</h3>


<p className="text-3xl font-bold">

{stats.orders || 0}

</p>


</div>







<div className="bg-white shadow rounded-xl p-6">


<h3 className="text-gray-500">

Products

</h3>


<p className="text-3xl font-bold">

{stats.products || 0}

</p>


</div>




</div>








{/* =====================
Recent Orders
===================== */}



<div className="bg-white shadow rounded-xl p-6 mb-10">


<h2 className="text-xl font-bold mb-5">

Recent Orders

</h2>




<table className="w-full">


<thead>


<tr className="border-b">


<th className="p-3 text-left">

Customer

</th>


<th className="p-3">

Amount

</th>



<th className="p-3">

Status

</th>


</tr>


</thead>





<tbody>


{
adminOrders
?.slice(0,5)
.map(order=>(


<tr
key={order._id}
className="border-b"
>


<td className="p-3">

{order.user?.name}

</td>



<td className="p-3">

₹ {order.totalPrice}

</td>



<td className="p-3">


<span className="px-3 py-1 rounded bg-gray-100">

{order.orderStatus}

</span>


</td>



</tr>


))


}



</tbody>


</table>



</div>









{/* =====================
Top Products
===================== */}



<div className="bg-white shadow rounded-xl p-6">


<h2 className="text-xl font-bold mb-5">

Top Products

</h2>



<div className="space-y-4">


{


topProducts.map(product=>(


<div

key={product._id}

className="flex justify-between border-b pb-3"

>


<span>

{product.title}

</span>



<span className="font-bold">

Stock:
{" "}
{product.stock}

</span>



</div>


))


}



</div>



</div>


{/* =====================
 SALES CHART
===================== */}


<div className="grid md:grid-cols-2 gap-6 mt-10">


<div className="bg-white shadow rounded-xl p-6">


<h2 className="text-xl font-bold mb-5">

Monthly Sales

</h2>



<ResponsiveContainer
width="100%"
height={300}
>


<BarChart
data={
analytics?.sales || []
}
>


<XAxis
dataKey="_id"
/>


<YAxis/>


<Tooltip/>


<Bar

dataKey="totalSales"

>


</Bar>


</BarChart>


</ResponsiveContainer>



</div>







{/* =====================
ORDER STATUS CHART
===================== */}



<div className="bg-white shadow rounded-xl p-6">


<h2 className="text-xl font-bold mb-5">

Order Status

</h2>



<ResponsiveContainer
width="100%"
height={300}
>


<PieChart>


<Pie

data={
analytics?.orderStatus || []
}

dataKey="count"

nameKey="_id"

outerRadius={100}

label

>


</Pie>


<Tooltip/>


</PieChart>


</ResponsiveContainer>



</div>



</div>




</div>



);


}



export default Dashboard;