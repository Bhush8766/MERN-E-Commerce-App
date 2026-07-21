import React from "react";


import {
useSelector
} from "react-redux";


import ProductCard from "../components/ProductCard";



function Wishlist(){


const wishlist = useSelector(
state=>state.wishlist.items
);



return(

<div>


<h1>
My Wishlist
</h1>



<div className="product-grid">


{

wishlist.length===0 ?

<h2>
Wishlist Empty
</h2>


:


wishlist.map(product=>(


<ProductCard

key={product._id}

product={product}

/>


))


}



</div>



</div>


)

}


export default Wishlist;