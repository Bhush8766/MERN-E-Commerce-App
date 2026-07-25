import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import {
  ShoppingCart,
  Heart,
  Star,
  Truck,
  ShieldCheck,
  Minus,
  Plus,
} from "lucide-react";

import { getSingleProduct } from "../redux/productSlice";
import { addToCart } from "../redux/cartSlice";
import { addWishlist } from "../redux/wishlistSlice";

import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";


const ProductDetails = () => {

  const { id } = useParams();

  const dispatch = useDispatch();


  const {
  singleProduct,
  loading,
  products
} = useSelector(
  (state)=>state.product
);

  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);



  // Fetch Product
  useEffect(() => {

    if(id){
      dispatch(getSingleProduct(id));
    }

  },[dispatch,id]);



  // Set Main Image
 useEffect(()=>{

if(singleProduct){

const image =
singleProduct?.thumbnail?.url;


if(image && image.trim() !== ""){

setSelectedImage(
`http://localhost:5000/${image.replaceAll("\\","/")}`
);

}
else{

setSelectedImage("/no-image.png");

}

}

},[singleProduct]);



  if(loading || !singleProduct){

    return <Loader/>;

  }



 const productImages = [

  singleProduct?.thumbnail?.url,

  ...(singleProduct?.images || [])
    .map(img => img.url)

]

.filter(
 img => img && img.trim() !== ""
)

.map(
 img =>
 `http://localhost:5000/${img.replaceAll("\\","/")}`
);



  const discountPrice =
    singleProduct.price -
    (
      singleProduct.price *
      (singleProduct.discount || 0)
    ) /
    100;



  const increaseQty = ()=>{

    if(quantity < singleProduct.stock){

      setQuantity(quantity+1);

    }

  };



  const decreaseQty = ()=>{

    if(quantity>1){

      setQuantity(quantity-1);

    }

  };



  const handleCart = ()=>{

    dispatch(
      addToCart({

        productId:singleProduct._id,

        quantity

      })
    );

  };



  const handleWishlist = ()=>{

    dispatch(
      addToWishlist(
        singleProduct._id
      )
    );

  };



  return (

<div className="bg-gray-100 min-h-screen py-10">


<div className="max-w-7xl mx-auto px-5">


{/* Product Main Section */}

<div className="bg-white rounded-xl shadow p-6 grid grid-cols-1 lg:grid-cols-2 gap-10">



{/* IMAGE SECTION */}

<div>


<div className="h-[450px] flex items-center justify-center">

<img

src={
selectedImage || "/no-image.png"
}

alt={singleProduct.title}

className="max-h-full object-contain"

/>
</div>



<div className="flex gap-4 mt-5 overflow-x-auto">


{
productImages.map((img,index)=>(


<img

key={index}

src={img}

onClick={()=>setSelectedImage(img)}

className={`w-20 h-20 object-cover rounded-lg border cursor-pointer
${
selectedImage===img
?
"border-blue-600"
:
""
}
`}

/>


))

}


</div>


</div>





{/* PRODUCT INFO */}


<div>


<h1 className="text-3xl font-bold text-gray-800">

{singleProduct.title}

</h1>



<div className="flex items-center gap-3 mt-3">


<div className="flex text-yellow-500">

{

[1,2,3,4,5].map(

star=>

<Star

key={star}

size={20}

fill="currentColor"

/>

)

}

</div>


<span className="text-gray-500">

(120 Reviews)

</span>


</div>




<div className="mt-6">


<span className="text-4xl font-bold text-blue-600">

₹{Math.round(discountPrice)}

</span>



{

singleProduct.discount > 0 &&

<span className="ml-4 text-xl line-through text-gray-400">

₹{singleProduct.price}

</span>

}



</div>





<div className="mt-5">


<p className="text-gray-600">

{singleProduct.shortDescription}

</p>


</div>





{/* Stock */}


<div className="mt-5">


{

singleProduct.stock > 0 ?


<p className="text-green-600 font-semibold">

✔ In Stock ({singleProduct.stock})

</p>


:


<p className="text-red-600 font-semibold">

Out Of Stock

</p>


}


</div>





{/* Quantity */}


<div className="flex items-center gap-4 mt-7">


<button

onClick={decreaseQty}

className="p-2 border rounded"

>

<Minus size={18}/>

</button>



<span className="text-xl font-bold">

{quantity}

</span>



<button

onClick={increaseQty}

className="p-2 border rounded"

>

<Plus size={18}/>

</button>


</div>





{/* Buttons */}


<div className="flex gap-4 mt-8">


<button

onClick={handleCart}

className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex justify-center items-center gap-2"

>


<ShoppingCart/>

Add To Cart


</button>




<button

onClick={handleWishlist}

className="px-5 border rounded-lg hover:bg-red-50"

>

<Heart className="text-red-500"/>

</button>



</div>





{/* Benefits */}


<div className="grid grid-cols-3 gap-4 mt-10">


<div className="text-center">

<Truck className="mx-auto text-blue-600"/>

<p className="text-sm">

Free Delivery

</p>

</div>



<div className="text-center">

<ShieldCheck className="mx-auto text-green-600"/>

<p className="text-sm">

Secure Payment

</p>

</div>



<div className="text-center">

<Heart className="mx-auto text-red-500"/>

<p className="text-sm">

Wishlist

</p>

</div>


</div>



</div>


</div>







{/* Description */}


<div className="bg-white rounded-xl shadow p-6 mt-8">


<h2 className="text-2xl font-bold mb-4">

Product Description

</h2>


<p className="text-gray-600 leading-7">

{singleProduct.description}

</p>


</div>







{/* Related Products */}


<div className="mt-10">


<h2 className="text-2xl font-bold mb-5">

Related Products

</h2>



<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">


{

products

?.filter(
item=>item._id!==singleProduct._id
)

.slice(0,4)

.map(product=>(


<ProductCard

key={product._id}

product={product}

/>


))


}


</div>


</div>



</div>


</div>

  );

};


export default ProductDetails;