import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyOrders = () => {
  const { axios } = useContext(AppContext);

  const [orders, setOrders] = useState([]);
  const boxIcon =
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");

      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error("Failed to load orders");
      }
    } catch (error) {
      toast.error("Error loading orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div
      className="
        min-h-screen py-16 px-6 
        bg-[#0b0c10] 
        text-white
        relative overflow-hidden
      "
    >
      {/* BACKGROUND GLOWS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-600/20 blur-[140px]"></div>
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-blue-500/10 blur-[170px]"></div>
      </div>

      {/* PAGE TITLE */}
      <h2 className="text-4xl md:text-5xl font-serif mb-10 relative z-10">
        My Orders
      </h2>

      {/* EMPTY ORDER STATE */}
      {orders.length === 0 ? (
        <p className="text-gray-400 text-lg mt-10 relative z-10">
          No orders found.
        </p>
      ) : (
        <div className="space-y-8 relative z-10">
          {orders.map((order) => (
            <div
              key={order._id}
              className="
                bg-white/5 backdrop-blur-xl 
                border border-white/10 
                shadow-[0_10px_40px_rgba(0,0,0,0.6)]
                rounded-2xl p-6 
                grid md:grid-cols-[2fr_1fr_1fr_1fr] 
                gap-6 md:items-center
                hover:scale-[1.01] transition-all duration-300
              "
            >
              {/* PRODUCT ITEMS */}
              <div className="flex gap-5">
                <img
                  className="w-12 h-12 object-cover opacity-80"
                  src={boxIcon}
                  alt="boxIcon"
                />

                <div className="space-y-1">
                  {order.items.map((item) => (
                    <p key={item._id} className="font-medium text-gray-200">
                      {item.product.title}{" "}
                      {item.quantity > 1 && (
                        <span className="text-indigo-400">× {item.quantity}</span>
                      )}
                    </p>
                  ))}
                </div>
              </div>

              {/* ADDRESS */}
              <div className="text-sm text-gray-300">
                <p className="font-medium">{order.address}</p>
              </div>

              {/* PRICE */}
              <p className="font-semibold text-lg text-indigo-300">
                ₹ {order.amount}
              </p>

              {/* META INFO */}
              <div className="text-sm space-y-1 text-gray-300">
                <p>
                  <span className="text-gray-400">Method:</span> {order.paymentType}
                </p>
                <p>
                  <span className="text-gray-400">Date:</span>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <span className="text-gray-400">Payment:</span>{" "}
                  {order.isPaid ? (
                    <span className="text-green-400">Paid</span>
                  ) : (
                    <span className="text-red-400">Pending</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
