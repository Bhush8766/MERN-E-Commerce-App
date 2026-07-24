import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getSingleProduct, getProducts } from "../redux/productSlice";

import { addToCart } from "../redux/cartSlice";
import { addWishlist } from "../redux/wishlistSlice";

import ProductCard from "../components/ProductCard";



const ProductDetails = () => {


  const { id } = useParams();

  const dispatch = useDispatch();



  const [quantity,setQuantity] = useState(1);




const {
  selectedProduct,
  products,
  loading,
} = useSelector((state) => state.product);

const product = selectedProduct;






  useEffect(()=>{


   dispatch(getSingleProduct(id));

    dispatch(getProducts());


  },[dispatch,id]);








  if(!product)
  {

    return (

      <div className="text-center py-20 text-xl">

        Loading Product...

      </div>

    );

  }








  const image = product.thumbnail?.url

  ?

  `http://localhost:5000/${product.thumbnail.url.replace(/\\/g,"/")}`

  :

  "/no-image.png";








  return (



<div className="bg-gray-50 min-h-screen">





<div className="max-w-7xl mx-auto px-6 py-12">





{/* PRODUCT MAIN SECTION */}



<div className="bg-white rounded-3xl shadow p-8 grid md:grid-cols-2 gap-10">






{/* IMAGE */}



<div>


<img

src={image}

alt={product.title}

className="w-full h-[500px] object-cover rounded-2xl"

/>


</div>







{/* DETAILS */}



<div>



<h1 className="text-4xl font-bold">

{product.title}

</h1>





<div className="flex gap-3 mt-4">


<span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">

{product.category?.name || "Category"}

</span>



<span className="bg-gray-100 px-4 py-2 rounded-full">

{product.brand?.name || "Brand"}

</span>



</div>








<h2 className="text-4xl font-bold text-blue-600 mt-8">

₹{product.price}

</h2>






<p className="text-green-600 font-bold mt-3">

✓ In Stock

</p>









<p className="mt-6 text-gray-600 leading-7">


{product.description || 

"Premium quality product with amazing features."}


</p>









{/* QUANTITY */}


<div className="flex items-center gap-5 mt-8">


<button

onClick={()=>setQuantity(
Math.max(1,quantity-1)
)}

className="border px-4 py-2 rounded-lg"

>

-

</button>




<span className="text-xl font-bold">

{quantity}

</span>





<button

onClick={()=>setQuantity(quantity+1)}

className="border px-4 py-2 rounded-lg"

>

+

</button>



</div>









{/* ACTION BUTTONS */}



<div className="flex gap-4 mt-8">





<button


onClick={()=>{


dispatch(

addToCart({

...product,

quantity

})

)


}}



className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700"

>


🛒 Add To Cart


</button>








<button


onClick={()=>dispatch(addWishlist(product._id))}



className="px-6 border rounded-xl text-2xl hover:bg-red-50"


>

❤️


</button>




</div>







</div>





</div>









{/* RELATED PRODUCTS */}



<section className="mt-16">


<h2 className="text-4xl font-bold">

Related Products

</h2>




<div className="grid md:grid-cols-4 gap-8 mt-8">



{

products

.filter(
(item)=>item._id !== product._id
)

.slice(0,4)

.map((item)=>(


<ProductCard

key={item._id}

product={item}

/>


))


}



</div>



</section>







</div>



</div>



  );

};



export default ProductDetails;