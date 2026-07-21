import React from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
    addToWishlist,
    removeFromWishlist
} from "../redux/wishlistSlice";

import {
addToCart
} from "../redux/cartSlice";


function ProductCard({product}){


const dispatch = useDispatch();

const cartHandler=()=>{


dispatch(
addToCart(product)
);


};


const wishlist = useSelector(
    state=>state.wishlist.items
);



const isWishlist = wishlist.some(
    item=>item._id === product._id
);



const wishlistHandler=()=>{


    if(isWishlist){

        dispatch(
            removeFromWishlist(product._id)
        );

    }
    else{

        dispatch(
            addToWishlist(product)
        );

    }

};



return(

<div className="product-card">


<div className="wishlist-btn"
onClick={wishlistHandler}
>

{
isWishlist ? "❤️" : "🤍"
}

</div>



<img

src={product.image}

alt={product.name}

/>


<h3>
{product.name}
</h3>


<p>
₹ {product.price}
</p>



<Link 
to={`/product/${product._id}`}
>

<button>
View Product
</button>

</Link>

<button
onClick={cartHandler}
>

Add To Cart

</button>



</div>

)

}


export default ProductCard;