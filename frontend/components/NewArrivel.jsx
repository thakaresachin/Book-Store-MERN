import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import BookCart from "./BookCart";

const NewArrival = () => {
  const { booksData } = useContext(AppContext);

  return (
    <div className="my-20 sm:my-28 px-4 sm:px-6 md:px-20 text-center relative">

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="
          absolute top-0 left-1/2 -translate-x-1/2 
          w-[300px] sm:w-[450px] md:w-[500px] 
          h-[150px] sm:h-[200px] 
          bg-indigo-600/10 blur-[120px]
        "></div>
      </div>

      {/* Heading */}
      <div className="relative inline-block mb-14 sm:mb-16">
        <h1 className="
          font-serif 
          text-3xl sm:text-4xl md:text-6xl 
          text-white 
          drop-shadow-[0_8px_30px_rgba(0,0,0,0.7)] 
          tracking-wide
        ">
          New Arrivals
        </h1>

        <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-3 tracking-wide">
          Fresh picks curated just for you
        </p>

        <div className="
          mx-auto mt-4 
          w-16 sm:w-20 md:w-24 
          h-[3px] 
          bg-gradient-to-r from-indigo-400 to-blue-400 
          rounded-full 
          shadow-[0_0_20px_rgba(99,102,241,0.6)]
        "></div>
      </div>

      {/* Books Grid */}
      <div
        className="
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-4 
          gap-6 sm:gap-8 md:gap-10 
          mt-4 sm:mt-6
        "
      >
        {booksData.slice(0, 4).map((book) => (
          <BookCart key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default NewArrival;
