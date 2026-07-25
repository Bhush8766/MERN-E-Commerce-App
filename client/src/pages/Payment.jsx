import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
    CreditCard,
    Wallet,
    MapPin,
    CheckCircle,
    Loader2,
} from "lucide-react";

import { toast } from "react-toastify";


import {
    createOrder,
} from "../redux/orderSlice";


import {
    getCart,
    clearCart,
} from "../redux/cartSlice";


import {
    getAddresses,
} from "../redux/userSlice";


import {
    createRazorpayOrderAPI,
    verifyPaymentAPI,
} from "../api/paymentApi";



function Payment() {


    const dispatch = useDispatch();

    const navigate = useNavigate();



    // ==========================
    // Redux States
    // ==========================



   const { 
    items = []
} = useSelector(
    (state) => state.cart
);


const cartItems = items;


    const {
        addresses = [],
    } = useSelector(
        (state) => state.users
    );



    const {
        loading: orderLoading = false,
    } = useSelector(
        (state) => state.orders
    );




    // ==========================
    // Local States
    // ==========================


    const [paymentMethod, setPaymentMethod] =
        useState("Razorpay");



    const [placingOrder, setPlacingOrder] =
        useState(false);



    const [sdkReady, setSdkReady] =
        useState(false);





    // ==========================
    // Load Cart + Address
    // ==========================


    useEffect(() => {


        dispatch(getCart());


        dispatch(getAddresses());


    }, [dispatch]);







    // ==========================
    // Razorpay SDK Loading
    // ==========================


    useEffect(() => {


        const loadRazorpay = () => {


            if (window.Razorpay) {


                setSdkReady(true);

                return;


            }




            const script =
                document.createElement("script");



            script.src =
                "https://checkout.razorpay.com/v1/checkout.js";



            script.async = true;



            script.onload = () => {


                setSdkReady(true);


            };



            script.onerror = () => {


                toast.error(
                    "Unable to load Razorpay"
                );


            };



            document.body.appendChild(script);


        };



        loadRazorpay();



    }, []);







    // ==========================
    // Selected Address
    // ==========================


    const address =
        addresses.find(
            (item) => item.isDefault
        );








    // ==========================
    // Cart Calculation
    // ==========================


    const totalItems =
        cartItems.length;




    const totalAmount =
        cartItems.reduce(
            (
                total,
                item
            ) => {


                const price =
                    item.price ||
                    item.product?.price ||
                    0;



                const qty =
                    item.quantity || 1;



                return total + (price * qty);



            },
            0
        );







    // ==========================
    // Image Helper
    // ==========================


    const getImageURL = (image) => {


        if (!image)
            return "/no-image.png";



        if (
            image.startsWith("http")
        ) {

            return image;

        }



        return `http://localhost:5000/${image.replaceAll("\\", "/")}`;


    };








    // ==========================
    // Create Order
    // ==========================


    const createNewOrder = async () => {

    if (!address) {
        toast.error("Please select delivery address");
        return null;
    }


    const orderData = {

        items: cartItems.map((item) => ({
            product:
                item.product?._id ||
                item.product,

            quantity:
                item.quantity || 1,

            price:
                item.price ||
                item.product?.price ||
                0
        })),


        shippingAddress: {

            fullName:
                address.fullName,

            phone:
                address.phone,

            address:
                address.address,

            city:
                address.city,

            state:
                address.state,

            country:
                address.country || "India",

            pincode:
                address.pincode,
        },


        paymentMethod,

        paymentStatus:"Pending",
    };


    console.log("ORDER DATA SENT:", orderData);


    try {

        const response =
            await dispatch(
                createOrder(orderData)
            )
            .unwrap();


        console.log("ORDER RESPONSE:", response);


        return response.order;


    }
    catch(error){

        console.log("ORDER ERROR:", error);

        toast.error(
            error || "Order creation failed"
        );

        return null;
    }
};







    // ==========================
    // COD Payment
    // ==========================


    const handleCODPayment = async () => {



        if (placingOrder)
            return;




        setPlacingOrder(true);




        const order =
            await createNewOrder();




        if (!order){


            setPlacingOrder(false);


            return;


        }




        dispatch(clearCart());




        toast.success(
            "Order placed successfully"
        );




        navigate(
            `/payment-success/${order._id}`
        );



    };







    // ==========================
    // Razorpay Payment
    // ==========================


    const handleRazorpayPayment = async () => {



        if (placingOrder)
            return;





        if (!sdkReady){


            toast.error(
                "Payment gateway loading..."
            );


            return;


        }






        const razorpayKey =
            import.meta.env.VITE_RAZORPAY_KEY_ID;






        if (!razorpayKey){


            toast.error(
                "Razorpay key missing"
            );


            return;


        }





        setPlacingOrder(true);




        const order =
            await createNewOrder();




        if (!order){


            setPlacingOrder(false);


            return;


        }







        try {



            const razorpayResponse =
                await createRazorpayOrderAPI(
                    order.totalPrice
                );



            const options = {


                key:
                    razorpayKey,



                amount:
                    razorpayResponse.order.amount,



                currency:
                    "INR",



                name:
                    "MERN E-Commerce",



                description:
                    "Shopping Payment",



                order_id:
                    razorpayResponse.order.id,



                handler:
                    (response)=>{


                        verifyRazorpayPayment(
                            response,
                            order._id
                        );


                    },



                prefill:{


                    name:
                        address.fullName,


                    contact:
                        address.phone,


                },



                theme:{


                    color:
                        "#2563eb"


                }


            };




            const razorpay =
                new window.Razorpay(
                    options
                );




            razorpay.on(
                "payment.failed",
                ()=>{


                    toast.error(
                        "Payment failed"
                    );



                    navigate(
                        `/payment-failed/${order._id}`
                    );



                    setPlacingOrder(false);



                }
            );



            razorpay.open();



        }
        catch(error){


            console.log(error);



            toast.error(
                "Unable to start payment"
            );



            setPlacingOrder(false);



        }



    };


    // ==========================
// Verify Razorpay Payment
// ==========================


const verifyRazorpayPayment = async (
    response,
    orderId
) => {


    try {


        const paymentData = {


            razorpay_order_id:
                response.razorpay_order_id,


            razorpay_payment_id:
                response.razorpay_payment_id,


            razorpay_signature:
                response.razorpay_signature,


            orderId,


        };





        const result =
            await verifyPaymentAPI(
                paymentData
            );






        if (result.success) {


            dispatch(clearCart());



            toast.success(
                "Payment successful"
            );



            navigate(
                `/payment-success/${orderId}`
            );


        }
        else {



            toast.error(
                "Payment verification failed"
            );



            navigate(
                `/payment-failed/${orderId}`
            );


        }





    }
    catch(error){



        console.log(error);



        toast.error(
            "Payment verification failed"
        );



        navigate(
            `/payment-failed/${orderId}`
        );



    }
    finally{


        setPlacingOrder(false);


    }



};







// ==========================
// Payment Button Handler
// ==========================


const handlePayment = () => {



    if (!address){


        toast.error(
            "Select delivery address first"
        );


        return;


    }






    if(totalItems === 0){


        toast.error(
            "Your cart is empty"
        );


        return;


    }







    if(paymentMethod === "COD"){


        handleCODPayment();


    }
    else{


        handleRazorpayPayment();


    }



};









return (

<div className="min-h-screen bg-gray-100 py-10">


<div className="max-w-7xl mx-auto px-4">



<h1 className="text-3xl font-bold mb-8">
    Checkout
</h1>





<div className="grid lg:grid-cols-3 gap-8">







{/* ==========================
LEFT SECTION
========================== */}



<div className="lg:col-span-2 space-y-6">







{/* Delivery Address */}



<div className="bg-white rounded-xl shadow p-6">


<div className="flex items-center gap-3 mb-5">


<MapPin
    className="text-blue-600"
/>



<h2 className="text-xl font-bold">
    Delivery Address
</h2>


</div>





{
address ? (



<div className="border rounded-lg p-5">



<div className="flex justify-between">


<h3 className="font-bold text-lg">

{address.fullName}

</h3>




<CheckCircle
className="text-green-600"
/>


</div>





<p className="text-gray-600 mt-3">


{address.address}


<br />


{address.city},{" "}
{address.state}



<br />


{address.country || "India"}

{" - "}

{address.pincode}



</p>





<p className="mt-2 font-medium">

Phone:
{" "}
{address.phone}

</p>






<button

onClick={() =>
navigate("/saved-addresses")
}

className="
mt-4
text-blue-600
font-semibold
"


>


Change Address


</button>




</div>



)

:

(



<div className="border rounded-lg p-5 text-center">


<p className="text-gray-500">

No delivery address selected

</p>





<button

onClick={() =>
navigate("/saved-addresses")
}

className="
mt-3
bg-blue-600
text-white
px-5
py-2
rounded-lg
"


>


Add Address


</button>



</div>



)

}





</div>









{/* ==========================
Payment Methods
========================== */}



<div className="bg-white rounded-xl shadow p-6">



<h2 className="text-xl font-bold mb-5">

Payment Method

</h2>






<div className="space-y-4">







{/* Razorpay */}



<label

className={`
flex
items-center
gap-4
border
rounded-lg
p-4
cursor-pointer

${
paymentMethod === "Razorpay"
?
"border-blue-600 bg-blue-50"
:
""
}

`}


>


<input

type="radio"

value="Razorpay"

checked={
paymentMethod === "Razorpay"
}

onChange={(e)=>
setPaymentMethod(
e.target.value
)
}

/>




<CreditCard
className="text-blue-600"
/>





<div>


<h3 className="font-semibold">

Razorpay

</h3>


<p className="text-sm text-gray-500">

UPI, Card, Net Banking

</p>


</div>



</label>







{/* COD */}



<label

className={`
flex
items-center
gap-4
border
rounded-lg
p-4
cursor-pointer

${
paymentMethod === "COD"
?
"border-blue-600 bg-blue-50"
:
""
}

`}


>


<input

type="radio"

value="COD"

checked={
paymentMethod === "COD"
}

onChange={(e)=>
setPaymentMethod(
e.target.value
)
}

/>





<Wallet
className="text-green-600"
/>





<div>


<h3 className="font-semibold">

Cash On Delivery

</h3>



<p className="text-sm text-gray-500">

Pay when your order arrives

</p>



</div>



</label>






</div>



</div>


{/* ==========================
Order Items
========================== */}


<div className="bg-white rounded-xl shadow p-6">


<h2 className="text-xl font-bold mb-5">

Order Items

</h2>





{
cartItems.map(
    (item) => (



<div

key={item._id}

className="
flex
items-center
gap-4
border-b
py-4
"


>



<img

src={
getImageURL(
item.product?.thumbnail?.url ||
item.thumbnail?.url
)
}


alt={
item.product?.title ||
item.title ||
"Product"
}


className="
w-20
h-20
object-cover
rounded-lg
"


/>






<div className="flex-1">


<h3 className="font-semibold">


{
item.product?.title ||
item.title ||
"Product"
}



</h3>





<p className="text-gray-500">


Qty:
{" "}
{item.quantity}



</p>



</div>






<p className="font-bold">


₹
{
(
item.price ||
item.product?.price ||
0
)
*
(
item.quantity || 1
)
}



</p>






</div>



    )
)

}



</div>









</div>









{/* ==========================
RIGHT SIDE SUMMARY
========================== */}



<div>



<div

className="
bg-white
rounded-xl
shadow
p-6
sticky
top-5
"


>



<h2 className="text-xl font-bold mb-6">

Order Summary

</h2>







<div className="space-y-3">





<div className="flex justify-between">


<span>
Items
</span>



<span>

{
totalItems
}

</span>



</div>








<div className="flex justify-between">


<span>

Subtotal

</span>



<span>


₹
{
totalAmount
}


</span>



</div>








<div className="flex justify-between">


<span>

Shipping

</span>




<span>

₹0

</span>




</div>







<hr />








<div

className="
flex
justify-between
text-xl
font-bold
"


>


<span>

Total

</span>





<span>

₹
{
totalAmount
}


</span>





</div>






</div>









<button



onClick={
handlePayment
}



disabled={
placingOrder ||
orderLoading
}



className="
mt-6
w-full
bg-yellow-400
hover:bg-yellow-500
text-black
font-bold
py-3
rounded-lg
flex
justify-center
items-center
gap-2
disabled:opacity-50
"



>





{
placingOrder || orderLoading ?



(


<>


<Loader2

className="
animate-spin
"

/>


Processing...


</>



)



:



(


<>


<CheckCircle />


Place Order



</>


)



}





</button>









</div>





</div>








</div>



</div>



</div>



);





}



export default Payment;