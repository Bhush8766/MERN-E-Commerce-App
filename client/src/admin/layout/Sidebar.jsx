import { NavLink } from "react-router-dom";


import {
    useDispatch
}
    from "react-redux";


import {
    logout
}
    from "../../redux/authSlice";


import {
    useNavigate
}
    from "react-router-dom";


function Sidebar() {
    const menuItems = [
        {
            title: "Dashboard",
            path: "/admin",
            icon: "📊",
        },
        {
            title: "Products",
            path: "/admin/products",
            icon: "📦",
        },
        {
            title: "Categories",
            path: "/admin/categories",
            icon: "📂",
        },
        {
            title: "Brands",
            path: "/admin/brands",
            icon: "🏷️",
        },
        {
            title: "Orders",
            path: "/admin/orders",
            icon: "🛒",
        },
        {
            title: "Users",
            path: "/admin/users",
            icon: "👤",
        },
    ];


    const dispatch = useDispatch();

    const navigate = useNavigate();



    const handleLogout = () => {


        dispatch(logout());


        navigate("/login");


    };


    return (
        <aside className="w-64 min-h-screen bg-gray-900 text-white">
            <div className="p-6 border-b border-gray-700">
                <h1 className="text-2xl font-bold">Admin Panel</h1>
            </div>

            <nav className="mt-5">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === "/admin"}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-6 py-3 transition ${isActive
                                ? "bg-blue-600"
                                : "hover:bg-gray-800"
                            }`
                        }
                    >
                        <span>{item.icon}</span>
                        <span>{item.title}</span>
                    </NavLink>
                ))}
            </nav>

            <button

                onClick={handleLogout}

                className="
bg-red-500
text-white
px-20
py-2
m-5
mt-5
rounded
"

            >

                Logout

            </button>

        </aside>
    );
}

export default Sidebar;