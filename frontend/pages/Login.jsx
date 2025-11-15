import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { setUser, navigate, axios } = useContext(AppContext);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/user/login", formData);

      if (data.message === "Login successful") {
        setUser(true);
        toast.success("Logged in successfully!");
        navigate("/");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error("Login failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-[#0b0c10] relative px-4 overflow-hidden">

      {/* BACKGROUND GLOWS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-16 w-96 h-96 bg-indigo-600/20 blur-[140px]"></div>
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-blue-500/15 blur-[160px]"></div>
      </div>

      {/* LOGIN CARD */}
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-sm px-8 py-10
                   bg-white/5 backdrop-blur-xl 
                   border border-white/10 rounded-2xl
                   shadow-[0_10px_40px_rgba(0,0,0,0.6)]
                   text-gray-300"
      >
        <h2 className="text-4xl font-serif text-white text-center mb-8 tracking-wide">
          Welcome Back
        </h2>

        {/* Email */}
        <div className="mb-6">
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 
                       rounded-xl text-white placeholder-gray-400 
                       focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-8">
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 
                       rounded-xl text-white placeholder-gray-400
                       focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold text-white
                     bg-gradient-to-r from-indigo-600 to-blue-600
                     shadow-[0_10px_40px_rgba(50,70,255,0.5)]
                     hover:scale-[1.03] transition-all duration-300"
        >
          Log In
        </button>

        {/* Signup Link */}
        <p className="text-center mt-6 text-sm text-gray-300">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-indigo-400 hover:text-indigo-300 underline"
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
