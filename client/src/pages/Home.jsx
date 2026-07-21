import { useEffect } from "react";
import { Link } from "react-router-dom";

import {useDispatch,useSelector} from "react-redux";

import {
 getProducts
} from "../redux/productSlice";



const Home=()=>{


const dispatch=useDispatch();



const {
products=[]
}=useSelector(
(state)=>state.products
);



useEffect(()=>{

dispatch(getProducts());

},[dispatch]);



return (

<div>



<section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">

<div className="max-w-7xl mx-auto px-6">


<h1 className="text-6xl font-bold">

Shop Smart.
Live Better.

</h1>


<p className="mt-6 text-xl">

Discover premium products at the best prices.

</p>



<Link

to="/shop"

className="inline-block mt-8 bg-white text-blue-600 px-8 py-3 rounded-xl font-bold"

>

Shop Now

</Link>


</div>

</section>





<section className="py-16 max-w-7xl mx-auto px-6">


<h2 className="text-4xl font-bold text-center">

Featured Products

</h2>




<div className="grid md:grid-cols-4 gap-6 mt-10">



{

products.map((product)=>(


<div

key={product._id}

className="border rounded-xl p-5 shadow"

>


<img

src={
product.thumbnail?.url ||
"https://via.placeholder.com/300"
}

className="rounded-lg"

/>



<h3 className="font-bold mt-4">

{product.title}

</h3>



<p className="text-blue-600">

₹{product.price}

</p>


</div>


))


}



</div>



</section>



</div>


);


};


export default Home;