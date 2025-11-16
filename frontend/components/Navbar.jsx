import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const Navbar = () => {
  const { navigate, user, setUser, cartCount } = useContext(AppContext);
  const [openMenu, setOpenMenu] = useState(false);

  const logout = () => {
    setUser(null);
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <>
      <nav
        className="
          sticky top-0 left-0 w-full z-[9999]
          bg-[#0b0c10]/80 backdrop-blur-2xl
          border-b border-white/10
          shadow-[0_4px_25px_rgba(0,0,0,0.5)]
          px-4 md:px-10 lg:px-20
          py-4 flex items-center justify-between
        "
      >
        {/* BRAND NAME ONLY (PREMIUM) */}
        <div onClick={() => navigate("/")} className="cursor-pointer select-none">
          <h1
            className="
              text-3xl md:text-4xl font-bold font-serif
              bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400
              bg-clip-text text-transparent
              tracking-wide
              drop-shadow-[0_0_20px_rgba(99,102,241,0.35)]
              hover:scale-105 transition duration-300
            "
          >
            BookVerse
          </h1>
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-10">
          <button
            onClick={() => navigate("/")}
            className="text-white hover:text-indigo-300 transition text-sm"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/books")}
            className="text-white hover:text-indigo-300 transition text-sm"
          >
            Books
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5 md:gap-6">

          {/* CART */}
          <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
            <FaShoppingCart className="text-xl md:text-2xl text-white hover:text-indigo-300 transition" />
            {cartCount > 0 && (
              <span
                className="
                  absolute -top-2 -right-2 bg-indigo-600 
                  text-white text-xs px-2 py-[2px] rounded-full font-bold
                "
              >
                {cartCount}
              </span>
            )}
          </div>

          {/* LOGIN / LOGOUT (DESKTOP) */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <button
                  onClick={() => navigate("/myorder")}
                  className="px-4 py-2 border border-white/10 rounded-full text-white hover:bg-white/10 transition text-sm"
                >
                  My Orders
                </button>

                <button
                  onClick={logout}
                  className="
                    px-5 py-2 rounded-full 
                    bg-gradient-to-r from-purple-600 to-indigo-600
                    text-white shadow-[0_0_15px_rgba(99,102,241,0.6)]
                    hover:scale-105 transition text-sm
                  "
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="
                  px-6 py-2 rounded-full 
                  bg-gradient-to-r from-purple-600 to-indigo-600
                  text-white shadow-[0_0_12px_rgba(99,102,241,0.7)]
                  hover:scale-105 transition text-sm
                "
              >
                Login
              </button>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setOpenMenu(!openMenu)}
          >
            {openMenu ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU SLIDE */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-[#0b0c10]/95 backdrop-blur-xl border-l border-white/10 shadow-xl transition-transform duration-300 z-[9998] ${
          openMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col gap-6">

          <button
            onClick={() => {
              navigate("/");
              setOpenMenu(false);
            }}
            className="text-white text-lg hover:text-indigo-300"
          >
            Home
          </button>

          <button
            onClick={() => {
              navigate("/books");
              setOpenMenu(false);
            }}
            className="text-white text-lg hover:text-indigo-300"
          >
            Books
          </button>

          {user ? (
            <>
              <button
                onClick={() => {
                  navigate("/myorder");
                  setOpenMenu(false);
                }}
                className="text-white text-lg hover:text-indigo-300"
              >
                My Orders
              </button>

              <button
                onClick={() => {
                  logout();
                  setOpenMenu(false);
                }}
                className="
                  mt-2 px-5 py-2 rounded-full text-lg 
                  bg-gradient-to-r from-purple-600 to-indigo-600 text-white
                "
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setOpenMenu(false);
              }}
              className="
                mt-4 px-6 py-2 rounded-full text-lg
                bg-gradient-to-r from-purple-600 to-indigo-600
                text-white
              "
            >
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
