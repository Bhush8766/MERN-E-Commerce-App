import { Star } from "lucide-react";


function Rating({
    value = 0,
    reviews = 0,
    size = 18
}) {


return (

<div className="flex items-center gap-2">


<div className="flex">

{
[1,2,3,4,5].map((star)=>(

<Star

key={star}

size={size}

className={

star <= Math.round(value)

?
"text-yellow-400 fill-yellow-400"
:
"text-gray-300"

}

/>

))
}


</div>



{
reviews > 0 && (

<span className="text-sm text-gray-500">

({reviews} reviews)

</span>

)
}



</div>

)

}


export default Rating;