import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAdminProducts,
    deleteProduct
} from "../redux/adminSlice";

function ProductList() {

    const dispatch = useDispatch();

    const { products } = useSelector(
        state => state.admin
    );

    useEffect(() => {

        dispatch(getAdminProducts());

    }, [dispatch]);

    return (

        <div>

            <h1>Manage Products</h1>

            <button>
                Add Product
            </button>

            <table>

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>Price</th>

                        <th>Stock</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        products.map(product => (

                            <tr key={product._id}>

                                <td>{product.name}</td>

                                <td>₹{product.price}</td>

                                <td>{product.stock}</td>

                                <td>

                                    <button>
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            dispatch(deleteProduct(product._id))
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    );

}

export default ProductList;