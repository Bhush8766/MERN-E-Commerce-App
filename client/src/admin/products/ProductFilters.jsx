function ProductFilters({
search,
setSearch,
stock,
setStock
}){


return(

<div className="
flex gap-4 mb-5
">


<input

className="
border p-2 rounded
"

placeholder="Search Product"

value={search}

onChange={
e=>setSearch(e.target.value)
}

/>



<select

className="
border p-2 rounded
"

value={stock}

onChange={
e=>setStock(e.target.value)
}

>


<option value="">
All Stock
</option>


<option value="available">
Available
</option>


<option value="out">
Out Of Stock
</option>


</select>


</div>

)

}


export default ProductFilters;