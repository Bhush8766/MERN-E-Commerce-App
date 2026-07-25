import {
    useNavigate
} from "react-router-dom";


import {
    ShoppingBag
} from "lucide-react";



const PriceSummary = ({

    subtotal = 0,

    shipping = 0,

    tax = 0,

    discount = 0,

    total = 0,

    itemCount = 0


}) => {



    const navigate =
        useNavigate();






    return (



<div className="
bg-white
rounded-xl
shadow-lg
p-6
sticky
top-24
">







<h2 className="
text-2xl
font-bold
mb-6
">

Order Summary

</h2>







<div className="
space-y-4
">








<div className="
flex
justify-between
">


<span>

Items

</span>


<span>

{itemCount}

</span>


</div>









<div className="
flex
justify-between
">


<span>

Subtotal

</span>



<span>

₹{subtotal.toFixed(2)}

</span>



</div>








<div className="
flex
justify-between
">


<span>

Shipping

</span>



<span>


{
shipping === 0

?

"FREE"

:

`₹${shipping.toFixed(2)}`

}


</span>



</div>








<div className="
flex
justify-between
">


<span>

GST (18%)

</span>



<span>

₹{tax.toFixed(2)}

</span>


</div>








<div className="
flex
justify-between
text-green-600
">


<span>

Discount

</span>



<span>

-₹{discount.toFixed(2)}

</span>



</div>






</div>








<hr className="
my-5
"/>








<div className="
flex
justify-between
text-2xl
font-bold
">


<span>

Total

</span>



<span>

₹{total.toFixed(2)}

</span>


</div>









{
shipping === 0 &&


<div className="
mt-4
text-green-600
text-sm
font-medium
">

🎉 You qualify for FREE shipping.

</div>


}









<button


onClick={()=>navigate("/payment")}



className="
w-full
mt-8
bg-yellow-400
hover:bg-yellow-500
py-4
rounded-lg
font-bold
text-lg
transition
flex
items-center
justify-center
gap-2
"


>


<ShoppingBag size={20}/>


Proceed To Payment


</button>







</div>



    );

};



export default PriceSummary;