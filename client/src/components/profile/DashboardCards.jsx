import {
  Package,
  Clock3,
  Truck,
  CheckCircle,
  Heart,
  IndianRupee,
} from "lucide-react";

function DashboardCards({
  orders = [],
  wishlist = [],
}) {
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "Pending"
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.orderStatus === "Shipped"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "Delivered"
  ).length;

  const totalSpent = orders
    .filter(
      (order) =>
        order.orderStatus !== "Cancelled"
    )
    .reduce(
      (total, order) => total + (order.totalPrice || 0),
      0
    );

  const cards = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: Package,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Pending",
      value: pendingOrders,
      icon: Clock3,
      bg: "bg-yellow-100",
      color: "text-yellow-600",
    },
    {
      title: "Shipped",
      value: shippedOrders,
      icon: Truck,
      bg: "bg-indigo-100",
      color: "text-indigo-600",
    },
    {
      title: "Delivered",
      value: deliveredOrders,
      icon: CheckCircle,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Wishlist",
      value: wishlist.length,
      icon: Heart,
      bg: "bg-pink-100",
      color: "text-pink-600",
    },
    {
      title: "Total Spent",
      value: `₹${totalSpent.toLocaleString()}`,
      icon: IndianRupee,
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">

      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
          >
            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500 text-sm">
                  {card.title}
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {card.value}
                </h3>

              </div>

              <div
                className={`${card.bg} p-4 rounded-full`}
              >
                <Icon
                  size={30}
                  className={card.color}
                />
              </div>

            </div>

          </div>
        );
      })}

    </div>
  );
}

export default DashboardCards;