import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/productSlice";


function Shop(){

    console.log("Shop component rendered");

const dispatch = useDispatch();


const {products,loading}=useSelector(
(state)=>state.products
);


console.log("Redux Products:", products);


useEffect(()=>{

dispatch(getProducts());

},[dispatch]);



if(loading){

return <h1>Loading...</h1>;

}



return (

<div className="grid grid-cols-4 gap-5 p-6">


{
products.map((product)=>(


<div 
key={product._id}
className="border rounded-lg p-4 shadow"
>


<img

src={
product.thumbnail?.url ||
"https://via.placeholder.com/300"
}

alt={product.title}

className="h-40 w-full object-cover"

/>



<h2 className="font-bold mt-3">

{product.title}

</h2>



<p className="text-gray-600">

₹ {product.price}

</p>



<p className="text-green-600">

Stock: {product.stock}

</p>


</div>


))

}


</div>

)


}


export default Shop;