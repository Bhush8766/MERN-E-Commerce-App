import {
    useState
} from "react";


import {
    Star
} from "lucide-react";


function ReviewForm({
    onSubmit,
    loading
}) {


    const [rating, setRating] = useState(0);

    const [comment, setComment] = useState("");



    const submitHandler = (e) => {

        e.preventDefault();


        if (rating === 0) {
            alert("Please select rating");
            return;
        }


        if (!comment.trim()) {
            alert("Please write review");
            return;
        }


        onSubmit({
            rating,
            comment
        });


        setRating(0);

        setComment("");

    };



    return (

        <form

            onSubmit={submitHandler}

            className="border rounded-xl p-6 bg-white shadow-sm"

        >


            <h3 className="font-bold text-lg mb-4">

                Write a Review

            </h3>



            {/* STAR RATING */}

            <div className="flex mb-5">


                {
                    [1,2,3,4,5].map((star)=>(


                        <Star

                            key={star}


                            size={32}


                            onClick={() =>
                                setRating(star)
                            }


                            className={`
                                cursor-pointer
                                transition
                                ${
                                    star <= rating
                                    ?
                                    "text-yellow-400 fill-yellow-400"
                                    :
                                    "text-gray-300"
                                }
                            `}


                        />


                    ))
                }


            </div>





            {/* COMMENT */}

            <textarea


                value={comment}


                onChange={(e)=>
                    setComment(e.target.value)
                }


                placeholder="Write your experience..."


                className="
                    w-full
                    border
                    rounded-lg
                    p-3
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                "


                rows="4"


            />





            {/* SUBMIT BUTTON */}

            <button


                disabled={loading}


                className="
                    mt-4
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-6
                    py-3
                    rounded-lg
                    disabled:opacity-50
                "


            >


                {
                    loading
                    ?
                    "Submitting..."
                    :
                    "Submit Review"
                }


            </button>


        </form>

    );


}


export default ReviewForm;