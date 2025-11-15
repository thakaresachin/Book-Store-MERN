import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../src/assets/assets";
import toast from "react-hot-toast";

const Adminlayout = () => {
  const { setIsAdmin, navigate, axios } = useContext(AppContext);

  const [mobileMenu, setMobileMenu] = useState(false);

  const sidebarLinks = [
    { name: "All Books", path: "/admin", icon: assets.list_icon },
    { name: "Add Books", path: "/admin/add-product", icon: assets.add_icon },
    { name: "Orders", path: "/admin/orders", icon: assets.order_icon },
  ];

  const logout = () => {
    try {
      axios.post("/api/admin/logout").then((response) => {
        if (response.data.message === "Admin logout successful") {
          setIsAdmin(false);
          navigate("/admin/login");
          toast.success("Logged out successfully");
        }
      });
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white flex flex-col">

      {/* 🔥 TOP NAVBAR */}
      <div
        className="
          fixed top-0 left-0 w-full z-40 
          backdrop-blur-xl bg-white/5 border-b border-white/10
          shadow-[0_4px_25px_rgba(0,0,0,0.45)]
          flex items-center justify-between px-6 sm:px-8 py-4
        "
      >
        {/* TITLE */}
        <div className="flex items-center gap-3">
          <p className="text-lg sm:text-xl font-semibold tracking-wide">
            Admin Dashboard
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5 text-gray-300">

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="sm:hidden text-white text-xl"
          >
            {mobileMenu ? "✕" : "☰"}
          </button>

          {/* DESKTOP PROFILE */}
          <div className="hidden sm:flex items-center gap-5">
            <p className="whitespace-nowrap">Hi, Admin 👋</p>
            <button
              onClick={logout}
              className="
                px-5 py-1.5 rounded-full 
                bg-white/10 border border-white/20 
                hover:bg-white/20 transition shadow-lg text-sm
              "
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* 🔥 MOBILE DROPDOWN MENU */}
      {mobileMenu && (
        <div className="sm:hidden w-full mt-[70px] bg-white/5 border-b border-white/10 backdrop-blur-xl px-6 py-4">
          <div className="flex flex-col gap-4">

            {sidebarLinks.map((item, i) => (
              <NavLink
                key={i}
                to={item.path}
                end={item.path === "/admin"}
                onClick={() => setMobileMenu(false)}
                className={({ isActive }) =>
                  `
                    flex items-center gap-3 px-4 py-3 rounded-xl
                    text-sm font-medium transition-all
                    ${isActive
                      ? "bg-gradient-to-r from-indigo-500/30 to-blue-500/30 text-indigo-200 shadow-md"
                      : "text-gray-300 hover:bg-white/10"
                    }
                  `
                }
              >
                <img src={item.icon} className="w-5 h-5 opacity-90" />
                {item.name}
              </NavLink>
            ))}

            <button
              onClick={logout}
              className="
                px-5 py-2 mt-2 rounded-xl 
                bg-white/10 border border-white/20 
                hover:bg-white/20 transition shadow-lg text-sm
              "
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* 🔥 DESKTOP HORIZONTAL NAV */}
      <div
        className="
          hidden sm:flex
          mt-[80px]
          w-full 
          border-b border-white/10 
          bg-white/5 backdrop-blur-xl 
          gap-6 sm:gap-8 px-6 sm:px-10 py-3 
          overflow-x-auto scrollbar-hide
          shadow-[0_2px_20px_rgba(0,0,0,0.3)]
        "
      >
        {sidebarLinks.map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `
                flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium 
                transition-all duration-300 cursor-pointer whitespace-nowrap
                ${isActive
                  ? "bg-gradient-to-r from-indigo-500/30 to-blue-500/30 text-indigo-200 shadow-md"
                  : "text-gray-300 hover:bg-white/10"
                }
              `
            }
          >
            <img src={item.icon} className="w-5 h-5 opacity-90" />
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div className="flex-1 px-6 sm:px-10 py-10 mt-[10px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Adminlayout;
