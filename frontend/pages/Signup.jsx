import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Signup = () => {
  const { navigate, axios } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/user/signup", formData);

      if (data.message) {
        toast.success("Account created successfully!");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Failed to create account");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-[#0b0c10] relative overflow-hidden px-4">

      {/* BACKGROUND GLOWS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600/20 blur-[140px]"></div>
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-indigo-500/15 blur-[170px]"></div>
      </div>

      {/* SIGNUP CARD */}
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-sm px-8 py-10
                   bg-white/5 backdrop-blur-xl 
                   border border-white/10 rounded-2xl
                   shadow-[0_10px_40px_rgba(0,0,0,0.6)]
                   text-gray-300"
      >
        <h2 className="text-4xl font-serif text-white text-center mb-8 tracking-wide">
          Create Account ✨
        </h2>

        {/* Name */}
        <div className="mb-5">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 
                       rounded-xl text-white placeholder-gray-400 
                       focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 
                       rounded-xl text-white placeholder-gray-400 
                       focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-7">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 
                       rounded-xl text-white placeholder-gray-400 
                       focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold text-white
                     bg-gradient-to-r from-indigo-600 to-blue-600
                     shadow-[0_10px_40px_rgba(50,70,255,0.5)]
                     hover:scale-[1.03] transition-all duration-300"
        >
          Sign Up
        </button>

        {/* Login Link */}
        <p className="text-center mt-6 text-sm text-gray-300">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
          >
            Log In
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
