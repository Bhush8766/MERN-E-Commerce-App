import ReviewCard from "./ReviewCard";


function ReviewList({
    reviews,
    user,
    onDelete,
    onEdit
}){


return (

<div className="space-y-5 mt-6">


{
reviews.length === 0 ?

<p className="text-gray-500">

No reviews yet.

</p>


:

reviews.map((review)=>(


<ReviewCard

key={review._id}

review={review}

user={user}

onDelete={onDelete}

onEdit={onEdit}

/>


))

}


</div>

)

}


export default ReviewList;