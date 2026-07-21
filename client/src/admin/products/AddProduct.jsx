import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createProduct,
  getCategories,
  getBrands,
} from "../../redux/adminSlice";

import { useNavigate } from "react-router-dom";


function AddProduct() {


  const dispatch = useDispatch();

  const navigate = useNavigate();


  const {
    categories = [],
    brands = [],
    loading,
    error

  } = useSelector(
    (state)=>state.admin
  );



  const [thumbnail,setThumbnail] =
  useState(null);



  const [formData,setFormData] = useState({

    title:"",
    description:"",
    shortDescription:"",
    category:"",
    brand:"",
    price:"",
    discountPrice:"",
    stock:"",

  });



  useEffect(()=>{


    dispatch(getCategories());

    dispatch(getBrands());


  },[dispatch]);




  // Debug

 useEffect(()=>{

console.log(
"Category API DATA",
categories
);

console.log(
"Brand API DATA",
brands
);


},[categories,brands]);




  const changeHandler=(e)=>{


    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value,

    });


  };






  const submitHandler=async(e)=>{


    e.preventDefault();



    const data=new FormData();



    Object.keys(formData).forEach(
      (key)=>{

        data.append(
          key,
          formData[key]
        );

      }
    );



    if(thumbnail){

      data.append(
        "thumbnail",
        thumbnail
      );

    }




    const result =
    await dispatch(
      createProduct(data)
    );



    if(
      createProduct.fulfilled.match(result)
    ){

      navigate(
        "/admin/products"
      );

    }



  };





  return (


<div className="bg-white p-6 rounded shadow">


<h1 className="text-3xl font-bold mb-8">
Add Product
</h1>



{
error &&
<div className="text-red-600 mb-3">
{error}
</div>
}




<form
onSubmit={submitHandler}
className="space-y-5"
>



<div>

<label className="font-semibold">
Product Title
</label>


<input

type="text"

name="title"

value={formData.title}

onChange={changeHandler}

className="w-full border rounded p-3 mt-2"

required

/>

</div>





<div>

<label className="font-semibold">
Description
</label>


<textarea

rows="5"

name="description"

value={formData.description}

onChange={changeHandler}

className="w-full border rounded p-3 mt-2"

required

/>


</div>





<div>

<label>
Short Description
</label>


<textarea

rows="2"

name="shortDescription"

value={formData.shortDescription}

onChange={changeHandler}

className="w-full border rounded p-3 mt-2"

/>


</div>





<div className="grid md:grid-cols-2 gap-5">



<div>


<label>
Category
</label>



<select

name="category"

value={formData.category}

onChange={changeHandler}

className="w-full border rounded p-3 mt-2"

required

>


<option value="">
Select Category
</option>



{
categories?.map((cat)=>(
<option
key={cat._id}
value={cat._id}
>
{cat.name}
</option>
))
}



</select>



</div>






<div>


<label>
Brand
</label>



<select

name="brand"

value={formData.brand}

onChange={changeHandler}

className="w-full border rounded p-3 mt-2"

required

>


<option value="">
Select Brand
</option>



{
brands?.map((brand)=>(
<option
key={brand._id}
value={brand._id}
>
{brand.name}
</option>
))
}


</select>



</div>



</div>






<div className="grid md:grid-cols-3 gap-5">


<div>

<label>
Price
</label>


<input

type="number"

name="price"

value={formData.price}

onChange={changeHandler}

className="w-full border rounded p-3 mt-2"

required

/>

</div>




<div>

<label>
Discount Price
</label>


<input

type="number"

name="discountPrice"

value={formData.discountPrice}

onChange={changeHandler}

className="w-full border rounded p-3 mt-2"

/>


</div>




<div>

<label>
Stock
</label>


<input

type="number"

name="stock"

value={formData.stock}

onChange={changeHandler}

className="w-full border rounded p-3 mt-2"

required

/>

</div>



</div>







<div>

<label>
Thumbnail
</label>


<input

type="file"

accept="image/*"

onChange={
(e)=>
setThumbnail(
e.target.files[0]
)
}

/>


</div>





<button

disabled={loading}

className="bg-blue-600 text-white px-8 py-3 rounded"

>


{
loading
?
"Creating..."
:
"Create Product"
}



</button>




</form>


</div>


  );

}


export default AddProduct;