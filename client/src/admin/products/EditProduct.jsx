import {
    useEffect,
    useState
} from "react";


import {
    useDispatch,
    useSelector
} from "react-redux";


import {
    useNavigate,
    useParams
} from "react-router-dom";


import {
    getProductById,
    updateProduct
} from "../../redux/adminSlice";

import {
    getCategories
} from "../../redux/categorySlice";

import {
    getBrands
} from "../../redux/brandSlice";





function EditProduct(){


const dispatch = useDispatch();

const navigate = useNavigate();


const {id}=useParams();





const {
    selectedProduct,
    loading
}=useSelector(
    state=>state.admin
);



const {
    categories
}=useSelector(
    state=>state.category
);



const {
    brands
}=useSelector(
    state=>state.brand
);






const [form,setForm]=useState({

    title:"",
    description:"",

    price:"",
    discountPrice:"",

    stock:"",

    category:"",
    brand:"",


    thumbnail:"",

    images:[],

    variants:[
        {
            size:"",
            color:"",
            stock:""
        }
    ],


    specifications:[

        {
            key:"",
            value:""
        }

    ]

});






// ===============================
// LOAD DATA
// ===============================


useEffect(()=>{


dispatch(
    getProductById(id)
);


dispatch(
    getCategories()
);


dispatch(
    getBrands()
);


},[
dispatch,
id
]);






// ===============================
// SET PRODUCT DATA
// ===============================


useEffect(()=>{


if(selectedProduct){


setForm({


title:selectedProduct.title || "",


description:selectedProduct.description || "",


price:selectedProduct.price || "",


discountPrice:selectedProduct.discountPrice || "",


stock:selectedProduct.stock || "",


category:selectedProduct.category?._id || "",


brand:selectedProduct.brand?._id || "",



thumbnail:
selectedProduct.thumbnail?.url || "",



images:
selectedProduct.images || [],




variants:
selectedProduct.variants?.length
?
selectedProduct.variants
:
[
{
size:"",
color:"",
stock:""
}
],




specifications:
selectedProduct.specifications?.length
?
selectedProduct.specifications
:
[
{
key:"",
value:""
}
]




});


}



},[
selectedProduct
]);









const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:
e.target.value

});


};









// ===============================
// VARIANT CHANGE
// ===============================


const variantChange=(index,e)=>{


const data=[
...form.variants
];


data[index][e.target.name]
=
e.target.value;



setForm({

...form,

variants:data

});


};








const addVariant=()=>{


setForm({

...form,

variants:[

...form.variants,

{
size:"",
color:"",
stock:""
}

]

});


};









// ===============================
// SPECIFICATION
// ===============================


const specificationChange=(index,e)=>{


const data=[
...form.specifications
];


data[index][e.target.name]
=
e.target.value;



setForm({

...form,

specifications:data

});


};







const addSpecification=()=>{


setForm({

...form,


specifications:[

...form.specifications,

{
key:"",
value:""
}

]

});


};









// ===============================
// SUBMIT
// ===============================


const submitHandler=(e)=>{


e.preventDefault();


dispatch(

updateProduct({

id,

productData:form

})

)


.then(()=>{


navigate("/admin/products");


});


};








if(loading)
return <h2>Loading...</h2>;







return (

<div className="p-6">


<h1 className="text-3xl font-bold mb-6">
Edit Product
</h1>





<form
onSubmit={submitHandler}
className="space-y-5"

>





<input

name="title"

value={form.title}

onChange={handleChange}

placeholder="Product Title"

className="border p-3 w-full"

/>






<textarea

name="description"

value={form.description}

onChange={handleChange}

placeholder="Description"

className="border p-3 w-full"

/>







<input

name="price"

value={form.price}

onChange={handleChange}

placeholder="Price"

className="border p-3 w-full"

/>







<input

name="discountPrice"

value={form.discountPrice}

onChange={handleChange}

placeholder="Discount Price"

className="border p-3 w-full"

/>






<input

name="stock"

value={form.stock}

onChange={handleChange}

placeholder="Stock"

className="border p-3 w-full"

/>









<select

name="category"

value={form.category}

onChange={handleChange}

className="border p-3 w-full"

>


<option>
Select Category
</option>


{
categories.map(cat=>(

<option
key={cat._id}
value={cat._id}
>

{cat.name}

</option>

))

}


</select>









<select

name="brand"

value={form.brand}

onChange={handleChange}

className="border p-3 w-full"

>


<option>
Select Brand
</option>


{
brands.map(brand=>(

<option

key={brand._id}

value={brand._id}

>

{brand.name}

</option>

))

}


</select>









<input

name="thumbnail"

value={form.thumbnail}

onChange={handleChange}

placeholder="Thumbnail URL"

className="border p-3 w-full"

/>








<h2 className="text-xl font-bold">
Variants
</h2>




{
form.variants.map(
(variant,index)=>(


<div
key={index}
className="flex gap-3"
>


<input

name="size"

value={variant.size}

onChange={(e)=>
variantChange(index,e)
}

placeholder="Size"

className="border p-2"

/>



<input

name="color"

value={variant.color}

onChange={(e)=>
variantChange(index,e)
}

placeholder="Color"

className="border p-2"

/>



<input

name="stock"

value={variant.stock}

onChange={(e)=>
variantChange(index,e)
}

placeholder="Stock"

className="border p-2"

/>


</div>


))


}




<button

type="button"

onClick={addVariant}

className="bg-gray-500 text-white px-4 py-2"

>

Add Variant

</button>









<h2 className="text-xl font-bold">
Specifications
</h2>





{
form.specifications.map(
(spec,index)=>(


<div
key={index}
className="flex gap-3"
>


<input

name="key"

value={spec.key}

onChange={(e)=>
specificationChange(index,e)
}

placeholder="Key"

className="border p-2"

/>



<input

name="value"

value={spec.value}

onChange={(e)=>
specificationChange(index,e)
}

placeholder="Value"

className="border p-2"

/>



</div>


))


}




<button

type="button"

onClick={addSpecification}

className="bg-gray-500 text-white px-4 py-2"

>

Add Specification

</button>







<button

className="bg-blue-600 text-white px-6 py-3 rounded"

>

Update Product

</button>





</form>



</div>

);


}



export default EditProduct;