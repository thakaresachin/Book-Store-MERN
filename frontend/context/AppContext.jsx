// ✅ AppContext.jsx (FINAL + ADMIN FIXED + USER FIXED)
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [booksData, setBooksData] = useState([]);

  const [SearchQueary, setSearchQueary] = useState("");
  const [selectCategory, setselectCategory] = useState("");

  // CART (Local Storage)
  const [cart, setcart] = useState(() => {
    const c = localStorage.getItem("cart");
    return c ? JSON.parse(c) : [];
  });

  // SYNC CART WITH LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ====================================================================================
  // USER AUTH CHECK
  // ====================================================================================
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");

      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    }
  };

  // ====================================================================================
  // ADMIN AUTH CHECK  (IMPORTANT FIX)
  // ====================================================================================
  const fetchAdmin = async () => {
    try {
      const { data } = await axios.get("/api/admin/is-auth");
      setIsAdmin(data.success ? true : false);
    } catch {
      setIsAdmin(false);
    }
  };

  // ====================================================================================
  // Fetch Books
  // ====================================================================================
  const fetchBooks = async () => {
    try {
      const { data } = await axios.get("/api/books/getAllBooks");
      if (data.books) setBooksData(data.books);
    } catch (err) {
      toast.error("Failed to load books");
    }
  };

  // ====================================================================================
  // LOAD EVERYTHING ONCE
  // IMPORTANT: fetchAdmin MUST RUN HERE
  // ====================================================================================
 useEffect(() => {
  fetchUser();      // must run always
  if(isAdmin === null) fetchAdmin()     // must run always
  fetchBooks();     // load initial books
}, []);


  // ====================================================================================
  // CART FUNCTIONS
  // ====================================================================================
  const addtocart = (book) => {
    const found = cart.find((item) => item._id === book._id);

    if (found) {
      setcart(
        cart.map((i) =>
          i._id === book._id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setcart([...cart, { ...book, quantity: 1 }]);
    }

    toast.success("Added to cart");
  };

  const removefromcart = (book) => {
    setcart(cart.filter((i) => i._id !== book._id));
    toast.success("Removed");
  };

  const updatecartitem = (id, qty) => {
    setcart(
      cart.map((i) => (i._id === id ? { ...i, quantity: qty } : i))
    );
  };

  const cartCount = cart.reduce((a, b) => a + b.quantity, 0);
  const totalcartprice = cart.reduce(
    (a, b) => a + b.offerPrice * b.quantity,
    0
  );

  // ====================================================================================
  // VALUE EXPORT
  // ====================================================================================
  const value = {
    navigate,
    axios,
    user,
    setUser,
    isAdmin,
    setIsAdmin,
    booksData,
    SearchQueary,
    setSearchQueary,
    selectCategory,
    setselectCategory,

    // cart
    cart,
    setcart,
    cartCount,
    totalcartprice,
    addtocart,
    removefromcart,
    updatecartitem,
  };

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
