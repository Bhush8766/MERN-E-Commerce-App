import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminOrders } from "../redux/adminSlice";

function OrderList() {

    const dispatch = useDispatch();

    const { orders } = useSelector(
        state => state.admin
    );

    useEffect(() => {

        dispatch(getAdminOrders());

    }, [dispatch]);

    return (

        <div>

            <h1>Orders</h1>

            {
                orders.map(order => (

                    <div
                        key={order._id}
                        className="order-card"
                    >

                        <h3>{order._id}</h3>

                        <p>User: {order.user?.name}</p>

                        <p>Total: ₹{order.totalPrice}</p>

                        <p>Status: {order.status}</p>

                    </div>

                ))
            }

        </div>

    );

}

export default OrderList;