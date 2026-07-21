import { Link } from "react-router-dom";

function Dashboard() {

    return (

        <div className="admin-dashboard">

            <h1>Admin Dashboard</h1>

            <div className="admin-menu">

                <Link to="/admin/products">
                    Products
                </Link>

                <Link to="/admin/orders">
                    Orders
                </Link>

            </div>

        </div>

    );

}

export default Dashboard;