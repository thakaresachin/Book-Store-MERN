import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";

const Adminlogin = () => {
  const { setIsAdmin, navigate, axios } = useContext(AppContext);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/admin/login", formData);

      if (data.message === "Admin login successful") {
        setIsAdmin(true);
        toast.success("Admin logged in successfully");
        navigate("/admin");
      } else {
        toast.error("Invalid admin credentials");
      }
    } catch (error) {
      toast.error("Admin login failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-[#0a0a0d] overflow-hidden">

      {/* Floating Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-20 w-[400px] h-[400px] bg-indigo-600/20 blur-[140px]"></div>
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-blue-500/20 blur-[160px] animate-pulse"></div>
      </div>

      {/* Floating Shapes */}
      <div className="absolute w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-300/30 backdrop-blur-xl top-28 left-8 animate-[float_6s_ease-in-out_infinite]"></div>
      <div className="absolute w-14 h-14 bg-white/10 rotate-45 border border-white/20 bottom-20 right-20 animate-[float_7s_ease-in-out_infinite]"></div>

      {/* ADMIN FORM */}
      <form
        onSubmit={handleSubmit}
        className="relative bg-white/10 backdrop-blur-xl border border-white/20 text-gray-300 w-full max-w-sm p-8 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.4)]"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-white drop-shadow-xl">
          Admin Login 🔐
        </h2>

        {/* Email */}
        <div className="flex items-center mb-4 border border-white/20 bg-white/5 rounded-lg px-3">
          <input
            className="w-full outline-none bg-transparent text-white py-2.5 pl-2"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Admin Email"
            required
          />
        </div>

        {/* Password */}
        <div className="flex items-center mb-6 border border-white/20 bg-white/5 rounded-lg px-3">
          <input
            className="w-full outline-none bg-transparent text-white py-2.5 pl-2"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:scale-105 transition py-3 rounded-lg text-white font-semibold shadow-[0_0_20px_rgba(99,102,241,0.6)]"
        >
          Log In as Admin
        </button>
      </form>

      {/* Animations */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-18px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </div>
  );
};

export default Adminlogin;
