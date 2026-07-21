import { useState } from "react";

function ProductForm() {

    const [form, setForm] = useState({

        name: "",

        price: "",

        description: "",

        image: "",

        stock: ""

    });

    const submitHandler = (e) => {

        e.preventDefault();

        // dispatch create/update product

    };

    return (

        <form onSubmit={submitHandler}>

            <input
                placeholder="Product Name"
            />

            <input
                placeholder="Price"
            />

            <textarea
                placeholder="Description"
            />

            <input
                placeholder="Image URL"
            />

            <input
                placeholder="Stock"
            />

            <button>
                Save Product
            </button>

        </form>

    );

}

export default ProductForm;
