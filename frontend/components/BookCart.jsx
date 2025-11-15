import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../src/assets/assets";

const BookCart = ({ book }) => {
  const { addtocart } = useContext(AppContext);

  return (
    <div className="w-full">

      {/* CARD */}
      <Link
        to={`/books/${book._id}`}
        className="
          relative block w-full 
          h-[260px] sm:h-[300px] md:h-[320px] 
          overflow-hidden
          bg-black/40 backdrop-blur-xl 
          border border-white/10 rounded-xl
          group transition-all duration-700
        "
      >
        {/* IMAGE */}
        <img
          src={book.image}
          className="
            absolute inset-0 
            w-full h-full object-cover
            group-hover:scale-110 
            duration-700
          "
        />

        {/* DARK GRADIENT */}
        <div className="
          absolute inset-0 
          bg-gradient-to-t 
          from-black/80 via-black/40 to-transparent
        "></div>

        {/* SHINE EFFECT */}
        <div className="
          absolute inset-0 opacity-0 group-hover:opacity-40
          bg-gradient-to-r from-transparent via-white/10 to-transparent
          -translate-x-full group-hover:translate-x-full
          rotate-[20deg] duration-[1200ms]
        "></div>

        {/* TEXT CONTENT */}
        <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-6 z-10">

          {/* TITLE */}
          <h2 className="
            text-xl sm:text-2xl md:text-3xl 
            font-serif text-white drop-shadow-xl
            max-w-[90%] leading-tight
          ">
            {book.title}
          </h2>

          {/* AUTHOR */}
          <p className="text-gray-300 mt-1 text-sm sm:text-base">
            by {book.author}
          </p>

          {/* PRICE */}
          <div className="flex items-center gap-3 mt-2">
            <p className="line-through text-gray-400 text-xs sm:text-sm">
              ${book.price}
            </p>
            <p className="text-white font-bold text-base sm:text-lg">
              ${book.offerPrice}
            </p>
          </div>

          {/* RATING */}
          <div className="flex items-center gap-2 mt-1">
            <img src={assets.star_icon} className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-amber-300 text-xs sm:text-sm">
              {book.rating}
            </span>
          </div>
        </div>
      </Link>

      {/* ADD TO CART BUTTON */}
      <button
        onClick={() => addtocart(book)}
        className="mt-4 w-full flex justify-end pr-1 sm:pr-4"
      >
        <div className="
          w-10 h-10 sm:w-12 sm:h-12 
          rounded-full bg-white/10 backdrop-blur-xl 
          border border-white/20 
          flex items-center justify-center
          hover:bg-white/20 hover:scale-110
          transition-all duration-300
          shadow-[0_5px_20px_rgba(255,200,50,0.4)]
          cursor-pointer
        ">
          <img src={assets.cart_icon} className="w-5 sm:w-6 opacity-90" />
        </div>
      </button>

    </div>
  );
};

export default BookCart;
