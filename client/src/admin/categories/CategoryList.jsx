import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
    getCategories,
    deleteCategory,
} from "../../redux/categorySlice";

const CategoryList = () => {
    const dispatch = useDispatch();

    const {
        categories,
        loading,
        error,
    } = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const deleteHandler = (id) => {
        const confirmDelete = window.confirm(
            "Delete this category?"
        );

        if (!confirmDelete) return;

        dispatch(deleteCategory(id));
    };

    return (
        <div className="bg-white rounded-xl shadow p-6">

            {/* Header */}

            <div className="flex justify-between items-center mb-6">

                <div>
                    <h2 className="text-2xl font-bold">
                        Category Management
                    </h2>

                    <p className="text-gray-500">
                        Total Categories : {categories.length}
                    </p>
                </div>

                <Link
                    to="/admin/categories/add"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                    + Add Category
                </Link>

            </div>

            {/* Loading */}

            {loading && (
                <div className="text-center py-10">
                    Loading...
                </div>
            )}

            {/* Error */}

            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-5">
                    {error}
                </div>
            )}

            {/* Table */}

            {!loading && (

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b bg-gray-100">

                                <th className="p-3 text-left">
                                    Image
                                </th>

                                <th className="p-3 text-left">
                                    Name
                                </th>

                                <th className="p-3 text-left">
                                    Description
                                </th>

                                <th className="p-3 text-left">
                                    Products
                                </th>

                                <th className="p-3 text-center">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {categories.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="text-center py-8 text-gray-500"
                                    >
                                        No Categories Found
                                    </td>

                                </tr>

                            ) : (

                                categories.map((category) => (

                                    <tr
                                        key={category._id}
                                        className="border-b hover:bg-gray-50"
                                    >

                                        <td className="p-3">

                                            <img
                                                src={
                                                    category.image?.url ||
                                                    "https://via.placeholder.com/60"
                                                }
                                                alt={category.name}
                                                className="w-14 h-14 rounded object-cover"
                                            />

                                        </td>

                                        <td className="p-3 font-semibold">
                                            {category.name}
                                        </td>

                                        <td className="p-3">
                                            {category.description}
                                        </td>

                                        <td className="p-3">
                                            {category.productCount || 0}
                                        </td>

                                        <td className="p-3">

                                            <div className="flex justify-center gap-2">

                                                <Link
                                                    to={`/admin/categories/edit/${category._id}`}
                                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    onClick={() =>
                                                        deleteHandler(category._id)
                                                    }
                                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
};

export default CategoryList;