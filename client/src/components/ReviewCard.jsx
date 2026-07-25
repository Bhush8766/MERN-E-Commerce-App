import {
    User,
    Trash2,
    Edit
} from "lucide-react";

import Rating from "./Rating";


function ReviewCard({
    review,
    user,
    onDelete,
    onEdit
}) {


return (

<div className="border rounded-xl p-5 bg-white shadow-sm">


<div className="flex justify-between">


<div className="flex gap-3">


<div className="bg-gray-100 rounded-full p-3">

<User/>

</div>


<div>

<h3 className="font-semibold">

{review.name}

</h3>


<Rating
value={review.rating}
/>


</div>


</div>



{
user?._id === review.user &&

<div className="flex gap-3">


<button
onClick={()=>onEdit(review)}
>

<Edit
size={18}
/>

</button>


<button
onClick={()=>onDelete(review._id)}
>

<Trash2
size={18}
/>

</button>


</div>

}


</div>



<p className="mt-4 text-gray-700">

{review.comment}

</p>



<div className="mt-3 text-sm text-gray-400">

{
new Date(review.createdAt)
.toLocaleDateString()
}

</div>



{
review.isVerifiedPurchase &&

<span className="inline-block mt-3 text-green-600 text-sm">

✔ Verified Purchase

</span>

}


</div>

)

}


export default ReviewCard;