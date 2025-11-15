import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Orders = () => {
  const { axios } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/admin");
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.log("Failed to fetch admin orders", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6 md:p-10">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-serif text-white mb-10 drop-shadow-xl">
        📦 All Orders
      </h1>

      <div className="grid gap-8">
        {orders.map((order, index) => (
          <div
            key={index}
            className="
              bg-white/5 backdrop-blur-2xl border border-white/10 
              rounded-2xl p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.45)]
              hover:shadow-[0_20px_60px_rgba(0,0,0,0.55)] 
              transition-all duration-500 group
            "
          >
            {/* TOP SECTION */}
            <div className="flex items-center gap-6">
              {/* Image */}
              <div className="w-20 h-24 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                <img
                  src={`http://localhost:3000/uploads/${order.items[0].product.image}`}
                  alt="book"
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                />
              </div>

              {/* Title + User */}
              <div className="flex-1">
                <p className="text-xl font-semibold text-white drop-shadow-md">
                  {order.items[0].product.title}
                </p>
                {order.items[0].quantity > 1 && (
                  <p className="text-indigo-300 font-medium">
                    x{order.items[0].quantity}
                  </p>
                )}

                <p className="text-gray-300 text-sm mt-1">
                  👤 {order.userId?.name} ({order.userId?.email})
                </p>
              </div>

              {/* AMOUNT */}
              <p className="text-2xl font-semibold text-indigo-300 drop-shadow-md">
                ₹ {order.amount}
              </p>
            </div>

            {/* DIVIDER */}
            <div className="border-b border-white/10 my-6"></div>

            {/* BOTTOM DETAILS */}
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              
              {/* ADDRESS */}
              <div>
                <p className="text-gray-400 uppercase tracking-wide text-xs mb-1">
                  Delivery Address
                </p>
                <p className="text-gray-200">{order.address}</p>
              </div>

              {/* DATE */}
              <div>
                <p className="text-gray-400 uppercase tracking-wide text-xs mb-1">
                  Date
                </p>
                <p className="text-gray-200">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* PAYMENT STATUS */}
              <div>
                <p className="text-gray-400 uppercase tracking-wide text-xs mb-1">
                  Payment
                </p>
                <p
                  className={`font-semibold ${
                    order.isPaid ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Pending"}
                </p>

                <p className="text-gray-400 mt-2 text-sm">
                  Method:{" "}
                  <span className="text-indigo-300 font-medium">
                    {order.paymentType}
                  </span>
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
