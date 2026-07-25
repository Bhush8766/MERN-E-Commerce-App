import {
    useEffect,
    useMemo
} from "react";


import {
    useDispatch,
    useSelector
} from "react-redux";


import AddressPreview from "../components/checkout/AddressPreview";
import CheckoutItem from "../components/checkout/CheckoutItem";
import PriceSummary from "../components/checkout/PriceSummary";


import {
    getCart
} from "../redux/cartSlice";


import {
    getAddresses
} from "../redux/userSlice";



const Checkout = () => {



    const dispatch = useDispatch();





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
        addresses = []
    } = useSelector(
        (state) => state.users
    );







    // ==========================
    // Load Data
    // ==========================


    useEffect(() => {


        dispatch(
            getCart()
        );


        dispatch(
            getAddresses()
        );


    }, [dispatch]);









    // ==========================
    // Delivery Address
    // ==========================


    const deliveryAddress =

        addresses.find(
            (item) =>
                item.isDefault
        )

        ||

        addresses[0]

        ||

        null;









    // ==========================
    // Price Calculation
    // ==========================



    const {

        subtotal,

        shipping,

        tax,

        discount,

        total


    } = useMemo(() => {



        const subtotal =

            cartItems.reduce(

                (
                    sum,
                    item
                ) => {



                    const price =

                        item.price

                        ||

                        item.product?.price

                        ||

                        0;




                    const quantity =

                        item.quantity

                        ||

                        item.qty

                        ||

                        1;




                    return (

                        sum +

                        price *

                        quantity

                    );



                },

                0

            );







        const shipping =

            subtotal >= 500

                ?

                0

                :

                subtotal > 0

                    ?

                    50

                    :

                    0;







        const tax =

            Number(
                (
                    subtotal *

                    0.18

                )
                .toFixed(2)
            );







        const discount = 0;







        const total =

            Number(

                (

                    subtotal

                    +

                    shipping

                    +

                    tax

                    -

                    discount

                )

                .toFixed(2)

            );







        return {

            subtotal,

            shipping,

            tax,

            discount,

            total

        };





    }, [cartItems]);











    return (


        <div className="
        min-h-screen
        bg-gray-100
        py-8
        ">



            <div className="
            max-w-7xl
            mx-auto
            px-4
            ">





                <h1 className="
                text-3xl
                font-bold
                mb-6
                ">

                    Checkout

                </h1>







                {/* ADDRESS */}


                <AddressPreview

                    address={
                        deliveryAddress
                    }

                />









                <div className="
                grid
                lg:grid-cols-3
                gap-6
                mt-6
                ">








                    {/* CART ITEMS */}



                    <div className="
                    lg:col-span-2
                    ">




                        <div className="
                        bg-white
                        rounded-xl
                        shadow-lg
                        p-6
                        ">





                            <h2 className="
                            text-2xl
                            font-semibold
                            mb-6
                            ">

                                Shopping Cart

                            </h2>







                            {
                                cartItems.length === 0

                                ?

                                (

                                    <div className="
                                    text-center
                                    py-12
                                    ">


                                        <p className="
                                        text-gray-500
                                        text-lg
                                        ">

                                            Your cart is empty.

                                        </p>


                                    </div>


                                )

                                :

                                (

                                    cartItems.map(

                                        (item) => (


                                            <CheckoutItem

                                                key={
                                                    item._id
                                                }


                                                item={
                                                    item
                                                }

                                            />


                                        )

                                    )

                                )

                            }





                        </div>





                    </div>









                    {/* SUMMARY */}



                    <div>



                        <PriceSummary

                            subtotal={
                                subtotal
                            }


                            shipping={
                                shipping
                            }


                            tax={
                                tax
                            }


                            discount={
                                discount
                            }


                            total={
                                total
                            }


                        />




                    </div>








                </div>







            </div>







        </div>



    );

};



export default Checkout;