import React,{useEffect}
from "react";


import {
useParams
}
from "react-router-dom";


import {
useDispatch,
useSelector
}
from "react-redux";


import {
getSingleProduct
}
from "../redux/productSlice";


import {
addToCart
}
from "../redux/cartSlice";




function ProductDetails(){


const {id}=useParams();


const dispatch=useDispatch();



const {

selectedProduct

}=useSelector(

state=>state.products

);



useEffect(()=>{


dispatch(
getSingleProduct(id)
);


},[dispatch,id]);





if(!selectedProduct)

return <h2>
Loading Product...
</h2>;




const product=selectedProduct;



return(


<div className="product-details">



<div className="gallery">


<img

src={product.image}

alt={product.name}

/>


</div>





<div className="details">


<h1>

{product.name}

</h1>



<h2>

₹ {product.price}

</h2>



<p>

{product.description}

</p>



<h3>

⭐ {product.rating || 4.5}

</h3>



<button

onClick={()=>


dispatch(
addToCart(product)
)


}

>

Add To Cart

</button>


<div className="reviews">


<h2>
Customer Reviews
</h2>


<div className="review">

⭐ ⭐ ⭐ ⭐ ⭐

<p>
Excellent Product Quality
</p>

</div>



<div className="review">

⭐ ⭐ ⭐ ⭐

<p>
Good value for money
</p>

</div>


</div>


</div>




</div>


)

}



export default ProductDetails;