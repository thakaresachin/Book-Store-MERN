import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    cart = [],
    addtocart,
    removefromcart,
    updatecartitem,
    cartCount,
    totalcartprice,
    axios,
    setcart,
    user,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const totalPrice =
    totalcartprice ||
    cart.reduce(
      (sum, item) => sum + (item.offerPrice || 0) * (item.quantity || 1),
      0
    );

  const fetchAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) setAddresses(data.addresses);
    } catch (error) {}
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const placeOrder = async () => {
    if (!selectedAddress) return toast.error("Please select delivery address");

    try {
      const items = cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));

      const body = {
        items,
        address: `${selectedAddress.name}, ${selectedAddress.street}, ${selectedAddress.city}`,
      };

      const res = await axios.post("/api/order/cod", body);

      if (res.data?.success === true) {
        toast.success("Order placed successfully!");
        setcart([]);
        localStorage.removeItem("cart");
        navigate("/myorder");
        return;
      }

      toast.error(res.data?.message || "Order failed");
    } catch (error) {
      toast.error("Order failed, try again");
    }
  };

  return (
    <div className="min-h-screen px-6 py-16 relative overflow-hidden bg-[#0b0c10]">
      {/* BACKGROUND GLOWS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-20 w-[26rem] h-[26rem] bg-indigo-700/20 blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-blue-500/10 blur-[180px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-10">
        {/* LEFT SIDE */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-10">
            Your Cart{" "}
            <span className="text-indigo-400 text-lg">({cartCount})</span>
          </h1>

          {cart.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg mb-4">
                Your cart is empty — start adding some amazing books!
              </p>
              <button
                onClick={() => navigate("/books")}
                className="text-indigo-400 hover:text-indigo-300 transition font-medium"
              >
                ← Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {cart.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between 
                             bg-white/5 backdrop-blur-xl border border-white/10
                             p-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-28 rounded-lg overflow-hidden border border-white/10">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <p className="text-white font-semibold text-lg">
                        {product.title}
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <p className="text-gray-400 text-sm">Qty:</p>
                        <select
                          value={product.quantity}
                          onChange={(e) =>
                            updatecartitem(
                              product._id,
                              parseInt(e.target.value)
                            )
                          }
                          className="bg-white/10 border border-white/20 text-white 
                                     rounded px-2 py-1 outline-none"
                        >
                          {[...Array(10)].map((_, i) => (
                            <option
                              key={i}
                              value={i + 1}
                              className="text-black"
                            >
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-white font-semibold text-lg">
                      ₹ {(product.offerPrice * product.quantity).toFixed(2)}
                    </p>

                    <button
                      onClick={() => removefromcart(product)}
                      className="text-red-400 text-xl hover:scale-110 transition"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDE SUMMARY */}
        <div
          className="
          w-full max-w-sm 
          bg-white/5 backdrop-blur-xl 
          p-6 rounded-2xl border border-white/10
          shadow-[0_10px_40px_rgba(0,0,0,0.5)]
        "
        >
          <h2 className="text-2xl font-serif text-white mb-4">Order Summary</h2>

          {/* ADDRESS */}
          <p className="text-gray-300 text-sm font-medium">Delivery Address</p>

          <div className="relative mt-2">
            <p className="text-gray-400 text-sm">
              {selectedAddress
                ? `${selectedAddress.name}, ${selectedAddress.street}, ${selectedAddress.city}`
                : "No address selected"}
            </p>

            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-indigo-400 mt-2 text-sm hover:underline"
            >
              Change
            </button>

            {showAddress && (
              <div
                className="
                absolute top-12 left-0 w-full 
                bg-black/60 backdrop-blur-xl border border-white/10
                rounded-xl shadow-xl z-20 p-2
              "
              >
                {addresses.length ? (
                  addresses.map((addr) => (
                    <p
                      key={addr._id}
                      onClick={() => {
                        setSelectedAddress(addr);
                        setShowAddress(false);
                      }}
                      className="text-gray-200 p-3 hover:bg-white/10 rounded cursor-pointer"
                    >
                      {addr.name}, {addr.street}, {addr.city}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-400 p-3 text-sm">No saved address</p>
                )}

                <p
                  onClick={() => navigate("/addaddress")}
                  className="p-3 text-indigo-400 cursor-pointer hover:bg-white/10 rounded text-center"
                >
                  + Add New Address
                </p>
              </div>
            )}
          </div>

          {/* PAYMENT */}
          <p className="text-gray-300 text-sm font-medium mt-6">
            Payment Method
          </p>
          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            value={paymentOption}
            className="w-full mt-2 bg-white/10 border border-white/20 text-white rounded px-3 py-2 outline-none"
          >
            <option value="COD" className="text-black">
              Cash On Delivery
            </option>
            <option value="Online" className="text-black">
              Online Payment
            </option>
          </select>

          {/* TOTAL */}
          <p className="flex justify-between text-lg font-semibold text-white mt-6">
            <span>Total Amount:</span>
            <span>₹ {(totalPrice * 1.02).toFixed(2)}</span>
          </p>

          {/* ORDER BTN */}
          <button
            onClick={placeOrder}
            className="
              w-full mt-8 py-3 
              bg-gradient-to-r from-indigo-600 to-blue-600
              text-white font-semibold rounded-xl
              shadow-[0_10px_40px_rgba(70,70,255,0.4)]
              hover:scale-[1.02] transition
            "
          >
            {paymentOption === "COD" ? "Place Order" : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
