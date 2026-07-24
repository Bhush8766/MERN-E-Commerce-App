import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "../redux/productSlice";

import ProductCard from "../components/ProductCard";



const Shop = () => {


  const dispatch = useDispatch();
       

   
const products = useSelector(
  (state) => state.product.products
);




  const [search,setSearch] = useState("");

  const [category,setCategory] = useState("");

  const [brand,setBrand] = useState("");

  const [sort,setSort] = useState("");





  useEffect(()=>{


    dispatch(getProducts());


  },[dispatch]);






  // UNIQUE CATEGORIES

  const categories = [

    ...new Set(
      products.map(
        item => item.category?.name
      )
    )

  ];




  // UNIQUE BRANDS


  const brands = [

    ...new Set(
      products.map(
        item => item.brand?.name
      )
    )

  ];







  // FILTER LOGIC


  let filteredProducts = products.filter((product)=>{


    const matchSearch = product.title
    ?.toLowerCase()
    .includes(
      search.toLowerCase()
    );



    const matchCategory = category
    ?
    product.category?.name === category
    :
    true;




    const matchBrand = brand
    ?
    product.brand?.name === brand
    :
    true;




    return (

      matchSearch &&
      matchCategory &&
      matchBrand

    );


  });







  // SORT PRICE


  if(sort==="low")
  {

    filteredProducts.sort(
      (a,b)=>a.price-b.price
    );

  }



  if(sort==="high")
  {

    filteredProducts.sort(
      (a,b)=>b.price-a.price
    );

  }






  return (


<div className="bg-gray-50 min-h-screen">





{/* HEADER */}


<section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">


<div className="max-w-7xl mx-auto px-6">


<h1 className="text-5xl font-bold">

Shop Products

</h1>


<p className="mt-3 text-blue-100">

Find the perfect products for you

</p>


</div>


</section>








<div className="max-w-7xl mx-auto px-6 py-10">






{/* FILTER AREA */}



<div className="bg-white rounded-2xl shadow p-6 grid md:grid-cols-4 gap-5">





{/* SEARCH */}


<input

type="text"

placeholder="Search products..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="border rounded-xl px-4 py-3"

/>







{/* CATEGORY */}


<select

value={category}

onChange={(e)=>setCategory(e.target.value)}

className="border rounded-xl px-4 py-3"

>


<option value="">

All Categories

</option>



{
categories.map((cat,index)=>(

<option

key={index}

value={cat}

>

{cat}

</option>

))
}



</select>








{/* BRAND */}



<select

value={brand}

onChange={(e)=>setBrand(e.target.value)}

className="border rounded-xl px-4 py-3"

>


<option value="">

All Brands

</option>



{
brands.map((brand,index)=>(

<option

key={index}

value={brand}

>

{brand}

</option>


))
}



</select>








{/* PRICE SORT */}



<select

value={sort}

onChange={(e)=>setSort(e.target.value)}

className="border rounded-xl px-4 py-3"

>


<option value="">

Sort Price

</option>


<option value="low">

Low To High

</option>


<option value="high">

High To Low

</option>



</select>





</div>









{/* PRODUCT COUNT */}


<h2 className="text-3xl font-bold mt-12">


Products ({filteredProducts.length})


</h2>








{/* PRODUCTS GRID */}



<div className="grid md:grid-cols-4 gap-8 mt-8">



{

filteredProducts.length > 0 ?


filteredProducts.map((product)=>(


<ProductCard

key={product._id}

product={product}

/>


))


:


<p className="col-span-4 text-center text-gray-500 text-xl">

No Products Found

</p>



}



</div>





</div>



</div>


  );

};



export default Shop;