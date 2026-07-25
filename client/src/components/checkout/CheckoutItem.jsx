import { Package } from "lucide-react";


const CheckoutItem = ({ item }) => {



    const product =
        item?.product || item;





    const image =

        product?.thumbnail?.url

            ?

            product.thumbnail.url.startsWith("http")

                ?

                product.thumbnail.url

                :

                `http://localhost:5000/${product.thumbnail.url.replace(/\\/g, "/")}`


            :

            "/no-image.png";







    const title =
        product?.title ||
        "Product";





    const quantity =
        item?.quantity ||
        item?.qty ||
        1;





    const price =

        item?.price

        ||

        product?.price

        ||

        0;






    const total =
        price * quantity;






    return (


<div className="
flex
flex-col
md:flex-row
gap-5
py-5
border-b
last:border-b-0
">







{/* Product Image */}


<div className="
w-full
md:w-36
h-36
bg-gray-100
rounded-xl
overflow-hidden
flex
items-center
justify-center
">


<img

src={image}

alt={title}

className="
w-full
h-full
object-contain
p-2
"

/>


</div>









{/* Product Details */}


<div className="flex-1">





<h3 className="
text-lg
font-semibold
text-gray-800
">

{title}

</h3>








{
(product?.brand || product?.category)
&&

(

<p className="
text-sm
text-gray-500
mt-1
">


{
product?.brand?.name ||
product?.brand ||
""
}



{
product?.brand &&
product?.category
&&
" • "
}




{
product?.category?.name ||
product?.category ||
""
}


</p>


)

}








{
product?.shortDescription &&


<p className="
text-sm
text-gray-600
mt-2
line-clamp-2
">

{product.shortDescription}

</p>


}









<div className="
flex
flex-wrap
gap-8
mt-4
">





<div>

<p className="
text-xs
uppercase
text-gray-500
">

Price

</p>


<p className="
font-semibold
text-lg
">

₹{price.toLocaleString()}

</p>


</div>







<div>


<p className="
text-xs
uppercase
text-gray-500
">

Quantity

</p>


<p className="
font-semibold
">

{quantity}

</p>


</div>








<div>


<p className="
text-xs
uppercase
text-gray-500
">

Total

</p>


<p className="
font-bold
text-green-600
">

₹{total.toLocaleString()}

</p>


</div>





</div>









<div className="
mt-5
flex
items-center
gap-2
">


<Package

size={18}

className="text-green-600"

/>



<span className="
text-sm
text-green-700
font-medium
">

In Stock

</span>


</div>






</div>






</div>


    );

};



export default CheckoutItem;