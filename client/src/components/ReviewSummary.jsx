import Rating from "./Rating";


function ReviewSummary({
    averageRating,
    totalReviews
}){


return (

<div className="bg-white border rounded-xl p-6">


<h2 className="text-xl font-bold mb-4">

Customer Reviews

</h2>



<div className="flex items-center gap-5">


<div className="text-5xl font-bold">

{averageRating}

</div>


<div>

<Rating

value={averageRating}

reviews={totalReviews}

size={22}

/>


<p className="text-gray-500 mt-2">

{totalReviews} customer ratings

</p>


</div>


</div>



</div>

)

}


export default ReviewSummary;