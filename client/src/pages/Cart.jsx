import React from "react";

import {Link} from "react-router-dom";


import {
useSelector,
useDispatch
} from "react-redux";


import {

increaseQuantity,
decreaseQuantity,
removeFromCart

} from "../redux/cartSlice";




function Cart(){



const dispatch=useDispatch();



const cart =
useSelector(
state=>state.cart.items
);



const total = cart.reduce(

(acc,item)=>

acc + item.price * item.quantity

,0);



return(


<div className="cart-page">


<h1>
Shopping Cart
</h1>



{

cart.length===0 ?

<h2>
Cart Empty
</h2>



:


cart.map(item=>(



<div className="cart-item"
key={item._id}
>



<img

src={item.image}

width="100"

/>



<h3>
{item.name}
</h3>



<p>
₹ {item.price}
</p>



<button

onClick={()=>

dispatch(
decreaseQuantity(item._id)

)}

>

-

</button>



<span>

{item.quantity}

</span>



<button

onClick={()=>

dispatch(
increaseQuantity(item._id)

)}

>

+

</button>




<button

onClick={()=>


dispatch(
removeFromCart(item._id)

)


}

>

Remove

</button>



</div>


))


}



<h2>

Total :

₹ {total}

</h2>


<Link to="/checkout">

<button>

Proceed To Checkout

</button>

</Link>



</div>


)


}



export default Cart;