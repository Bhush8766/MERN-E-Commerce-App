import {
useEffect,
useState
}
from "react";


import {
useDispatch,
useSelector
}
from "react-redux";


import {
getAdminProducts,
deleteProduct
}
from "../../redux/adminSlice";


import ProductFilters
from "./ProductFilters";


import {
Link
}
from "react-router-dom";



function ProductList(){


const dispatch=useDispatch();


const {
products,
loading
}=useSelector(
state=>state.admin
);



const [search,setSearch]=useState("");

const [stock,setStock]=useState("");




useEffect(()=>{

dispatch(
getAdminProducts()
);

},[dispatch]);






const filteredProducts =
products.filter(product=>{


const matchSearch =
product.title
.toLowerCase()
.includes(
search.toLowerCase()
);



const matchStock =
stock===""

?

true

:

stock==="available"

?

product.stock>0

:

product.stock===0;



return matchSearch && matchStock;


});







return (

<div>


<div className="
flex justify-between mb-6
">

<h1 className="
text-3xl font-bold
">

Products

</h1>


<Link

to="/admin/products/add"

className="
bg-black text-white px-4 py-2 rounded
"

>

Add Product

</Link>


</div>





<ProductFilters

search={search}

setSearch={setSearch}

stock={stock}

setStock={setStock}

/>







<table className="
w-full border
">


<thead>

<tr className="
border bg-gray-100
">


<th>
Image
</th>


<th>
Name
</th>


<th>
Price
</th>


<th>
Stock
</th>


<th>
Actions
</th>


</tr>


</thead>





<tbody>


{

filteredProducts.map(product=>(


<tr
key={product._id}
className="border"
>



<td>

<img

src={
product.thumbnail?.url
}

className="
w-16 h-16 object-cover
"

/>

</td>




<td>

{product.title}

</td>




<td>

₹ {product.price}

</td>



<td>

{
product.stock
}

</td>




<td className="
space-x-2
">


<Link

to={`/admin/products/edit/${product._id}`}

className="
bg-blue-500 text-white px-3 py-1 rounded
"

>

Edit

</Link>




<button

onClick={()=>{

dispatch(
deleteProduct(product._id)
)

}}

className="
bg-red-500 text-white px-3 py-1 rounded
"

>

Delete

</button>



</td>




</tr>


))

}


</tbody>


</table>


</div>


)


}


export default ProductList;