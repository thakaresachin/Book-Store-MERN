import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../src/assets/assets";

const BookCart = ({ book }) => {
  const { addtocart } = useContext(AppContext);

  return (
    <div className="w-full">

      <Link
        to={`/books/${book._id}`}
        className="relative block w-full h-[320px] overflow-hidden
                   bg-black/40 backdrop-blur-xl border border-white/10
                   group transition-all duration-700"
      >
        {/* IMAGE */}
        <img
          src={`http://localhost:3000/uploads/${book.image}`}
          className="absolute inset-0 w-full h-full object-cover
                     group-hover:scale-110 duration-700"
        />

        {/* DARK GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* SHINE */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-40
                        bg-gradient-to-r from-transparent via-white/10 to-transparent
                        -translate-x-full group-hover:translate-x-full
                        rotate-[20deg] duration-[1200ms] transition-all"></div>

        {/* TEXT */}
        <div className="absolute bottom-6 left-6 z-10">
          <h2 className="text-3xl font-serif text-white drop-shadow-xl">
            {book.title}
          </h2>

          <p className="text-gray-300 mt-1">by {book.author}</p>

          <div className="flex items-center gap-3 mt-3">
            <p className="line-through text-gray-400 text-sm">${book.price}</p>
            <p className="text-white font-bold text-lg">${book.offerPrice}</p>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <img src={assets.star_icon} className="w-4 h-4" />
            <span className="text-amber-300 text-sm">{book.rating}</span>
          </div>
        </div>
      </Link>

      {/* ADD TO CART BUTTON */}
      <button
  onClick={() => addtocart(book)}
  className="mt-4 w-full flex justify-end pr-4"
>
  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl 
                  border border-white/20 flex items-center justify-center
                  hover:bg-white/20 hover:scale-110 transition-all duration-300
                  shadow-[0_5px_20px_rgba(255,200,50,0.4)] cursor-pointer">
    <img src={assets.cart_icon} className="w-6 opacity-90" />
  </div>
</button>

    </div>
  );
};

export default BookCart;
