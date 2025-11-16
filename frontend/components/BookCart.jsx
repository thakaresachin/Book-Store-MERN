import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../src/assets/assets";

const BookCart = ({ book }) => {
  const { addtocart } = useContext(AppContext);

  return (
    <div className="w-full">

      {/* CARD */}
      <div className="relative group">

        <Link
          to={`/books/${book._id}`}
          className="
            block w-full
            h-[260px] sm:h-[300px] md:h-[320px]
            rounded-xl overflow-hidden
            bg-black/20 border border-white/10
            backdrop-blur-xl 
            relative
          "
        >
          {/* IMAGE */}
          <img
            src={book.image}
            className="
              w-full h-full object-cover
              duration-700 group-hover:scale-110
            "
          />

          {/* ⭐ RATING (Normal State) */}
          <div
            className="
              absolute top-3 left-3 z-10
              bg-black/40 backdrop-blur-xl
              px-2 py-1 rounded-md
              text-amber-300 text-xs sm:text-sm
              flex items-center gap-1
            "
          >
            <img src={assets.star_icon} className="w-3 h-3" />
            {book.rating}
          </div>

          {/* HOVER OVERLAY — TRANSPARENT */}
          <div
            className="
              absolute inset-0 
              bg-black/60 backdrop-blur-md
              opacity-0 group-hover:opacity-100
              transition-all duration-500
              p-4 sm:p-6
              flex flex-col justify-end
            "
          >
            {/* TITLE */}
            <h2
              className="
                text-xl sm:text-2xl font-serif 
                text-white mb-1
              "
            >
              {book.title}
            </h2>

            {/* AUTHOR */}
            <p className="text-gray-300 text-sm mb-2">
              by {book.author}
            </p>

            {/* PRICE (ONLY ON HOVER NOW) */}
            <div className="flex items-center gap-3 mb-2">
              <p className="line-through text-gray-400 text-xs sm:text-sm">
                ${book.price}
              </p>
              <p className="text-white font-bold text-lg">
                ${book.offerPrice}
              </p>
            </div>
          </div>
        </Link>

      </div>

      {/* ADD TO CART BUTTON */}
      <button
        onClick={() => addtocart(book)}
        className="mt-4 w-full flex justify-end pr-1 sm:pr-4"
      >
        <div
          className="
            w-10 h-10 sm:w-12 sm:h-12 
            rounded-full bg-white/10 backdrop-blur-xl 
            border border-white/20 
            flex items-center justify-center
            hover:bg-white/20 hover:scale-110
            transition-all duration-300
            shadow-[0_5px_20px_rgba(255,200,50,0.4)]
            cursor-pointer
          "
        >
          <img src={assets.cart_icon} className="w-5 sm:w-6 opacity-90" />
        </div>
      </button>

    </div>
  );
};

export default BookCart;
