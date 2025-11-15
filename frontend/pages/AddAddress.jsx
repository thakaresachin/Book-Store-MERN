import React, { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";

const AddAddress = () => {
  const { axios, navigate, user } = useContext(AppContext);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !address.name ||
      !address.phone ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.pincode
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const { data } = await axios.post("/api/address/add", { address });

      if (data.success) {
        toast.success("Address added successfully!");
        navigate("/cart");
      } else {
        toast.error("Failed to add address");
      }
    } catch (error) {
      toast.error("Failed to add address");
    }
  };

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  return (
    <div
      className="
      min-h-screen flex items-center justify-center px-6 
      bg-[#0b0c10] 
      bg-gradient-to-br from-[#0b0c10] via-[#11131b] to-[#0f1118]
      relative overflow-hidden
    "
    >
      {/* BACKGROUND GLOWS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-10 w-96 h-96 bg-indigo-600/20 blur-[150px]"></div>
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-blue-500/10 blur-[170px]"></div>
      </div>

      {/* FORM CARD */}
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-lg 
          relative z-10
          bg-white/5 backdrop-blur-xl 
          rounded-2xl border border-white/10 
          shadow-[0_8px_40px_rgba(0,0,0,0.6)]
          p-8
          text-gray-200
        "
      >
        <h2 className="text-3xl font-serif text-white text-center mb-8 drop-shadow-xl">
          Add New Address
        </h2>

        <div className="space-y-5">

          {/* Name */}
          <div>
            <label className="text-sm text-gray-300">Full Name</label>
            <input
              name="name"
              value={address.name}
              onChange={handleChange}
              className="
                w-full mt-2 py-3 px-4 rounded-xl bg-white/10 border border-white/20 
                outline-none focus:border-indigo-500 placeholder-gray-400
              "
              type="text"
              placeholder="Enter your full name"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-300">Phone Number</label>
            <input
              name="phone"
              value={address.phone}
              onChange={handleChange}
              className="
                w-full mt-2 py-3 px-4 rounded-xl bg-white/10 border border-white/20 
                outline-none focus:border-indigo-500 placeholder-gray-400
              "
              type="tel"
              placeholder="Enter phone number"
            />
          </div>

          {/* Street */}
          <div>
            <label className="text-sm text-gray-300">Street / Area</label>
            <input
              name="street"
              value={address.street}
              onChange={handleChange}
              className="
                w-full mt-2 py-3 px-4 rounded-xl bg-white/10 border border-white/20 
                outline-none focus:border-indigo-500 placeholder-gray-400
              "
              type="text"
              placeholder="Enter street or area"
            />
          </div>

          {/* City + State */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-sm text-gray-300">City</label>
              <input
                name="city"
                value={address.city}
                onChange={handleChange}
                className="
                  w-full mt-2 py-3 px-4 rounded-xl bg-white/10 border border-white/20 
                  outline-none focus:border-indigo-500 placeholder-gray-400
                "
                type="text"
                placeholder="Enter city"
              />
            </div>

            <div className="w-1/2">
              <label className="text-sm text-gray-300">State</label>
              <input
                name="state"
                value={address.state}
                onChange={handleChange}
                className="
                  w-full mt-2 py-3 px-4 rounded-xl bg-white/10 border border-white/20 
                  outline-none focus:border-indigo-500 placeholder-gray-400
                "
                type="text"
                placeholder="Enter state"
              />
            </div>
          </div>

          {/* Pincode */}
          <div>
            <label className="text-sm text-gray-300">Pincode</label>
            <input
              name="pincode"
              value={address.pincode}
              onChange={handleChange}
              className="
                w-full mt-2 py-3 px-4 rounded-xl bg-white/10 border border-white/20 
                outline-none focus:border-indigo-500 placeholder-gray-400
              "
              type="text"
              placeholder="Enter pincode"
            />
          </div>

        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="
            w-full mt-8 py-3.5 rounded-xl 
            bg-gradient-to-r from-indigo-600 to-blue-600 
            text-white font-semibold tracking-wide
            shadow-[0_8px_30px_rgba(50,70,255,0.4)]
            hover:scale-[1.02] transition-all
          "
        >
          Add Address
        </button>
      </form>
    </div>
  );
};

export default AddAddress;
