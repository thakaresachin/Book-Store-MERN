import { Routes, Route } from "react-router-dom";
import "./App.css";

import AddAddress from "../pages/AddAddress";
import Books from "../pages/Books";
import BooksDetail from "../pages/BooksDetail";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import MyOrders from "../pages/MyOrders";
import Signup from "../pages/Signup";
import Home from "../pages/Home";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Adminlayout from "../pages/admin/Adminlayout";
import Productlist from "../pages/admin/Productlist";
import Addproduct from "../pages/admin/Addproduct";
import Orders from "../pages/admin/Orders";
import Adminlogin from "../pages/admin/Adminlogin";

import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const { isAdmin } = useContext(AppContext);

  return (
    <>
      <Toaster />

      {/* GLOBAL THEME BACKGROUND */}
      <div className="min-h-screen w-full 
        bg-[#0b0c10] 
        bg-gradient-to-br from-[#0b0c10] via-[#11131b] to-[#0f1118]
        text-white
        relative overflow-hidden">

        {/* SOFT NEON GLOWS */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -left-20 w-96 h-96 bg-indigo-700/15 blur-[140px]"></div>
          <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-blue-500/10 blur-[170px]"></div>
        </div>

        {/* USER NAVBAR (HIDE IF ADMIN) */}
        {isAdmin !== true && <Navbar />}

        <div className="relative z-10 px-6 md:px-16 lg:px-24 xl:px-32 py-6">
          <Routes>

            {/* USER ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/addaddress" element={<AddAddress />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<BooksDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myorder" element={<MyOrders />} />
            <Route path="/signup" element={<Signup />} />

            {/* ADMIN ROUTES */}
            {isAdmin === true ? (
              <Route path="/admin" element={<Adminlayout />}>
                <Route index element={<Productlist />} />
                <Route path="add-product" element={<Addproduct />} />
                <Route path="orders" element={<Orders />} />
              </Route>
            ) : (
              <Route path="/admin/*" element={<Adminlogin />} />
            )}

          </Routes>
        </div>

        {/* USER FOOTER (HIDE IF ADMIN) */}
        {isAdmin !== true && (
          <div className="relative z-10">
            <Footer />
          </div>
        )}

      </div>
    </>
  );
}

export default App;
