import React from "react";
import bookImg from "../src/assets/hero_book.png"; // <-- apna book image yaha

const Hero = () => {
  return (
    <section className="
      relative min-h-[90vh] w-full overflow-hidden
      bg-[#0b0c10]  /* SAME NAVBAR BACKGROUND */
      flex flex-col md:flex-row items-center justify-between
      px-6 md:px-20 py-24
    ">

      {/* ======== BACKGROUND GLOWS (same theme) ======== */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-indigo-700/15 blur-[140px]"></div>
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-blue-500/10 blur-[180px]"></div>
      </div>

      {/* ======== LEFT SIDE — FLOATING ANIMATED BOOK ======== */}
      <div className="relative w-full md:w-1/2 flex justify-center items-center">

        {/* BOOK SHADOW GLOW */}
        <div className="
          absolute w-72 h-72 rounded-full
          bg-indigo-600/20 blur-[70px] animate-pulse
        "></div>

        {/* FLOATING BOOK */}
        <img
          src={bookImg}
          className="
            relative w-64 md:w-80 z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]
            animate-[bookFloat_6s_ease-in-out_infinite]
          "
          alt="book"
        />

        {/* LIGHT PARTICLES */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-white/20 animate-ping"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* ======== RIGHT SIDE ======== */}
      <div className="w-full md:w-1/2 mt-14 md:mt-0 text-center md:text-left z-20">

        <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight drop-shadow-2xl">
          Discover Your Next <br />
          <span className="bg-gradient-to-r from-indigo-300 to-blue-400 bg-clip-text text-transparent">
            Favorite Book
          </span>
        </h1>

        <p className="text-gray-300 mt-6 mb-10 text-lg max-w-md mx-auto md:mx-0">
          A premium reading experience crafted with elegance.  
          Dive into stories that inspire, enlighten and entertain.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button className="
            px-8 py-3 rounded-full 
            bg-gradient-to-r from-indigo-600 to-blue-600 
            text-white font-semibold 
            shadow-[0_10px_40px_rgba(70,80,255,0.5)] 
            hover:scale-105 transition">
            Shop Now
          </button>

          <button className="
            px-8 py-3 rounded-full 
            border border-indigo-400/40 text-indigo-200
            hover:bg-white/5 backdrop-blur-xl font-semibold transition">
            Explore Now
          </button>
        </div>

      </div>

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes bookFloat {
            0% { transform: translateY(0px) rotate(-2deg); }
            50% { transform: translateY(-25px) rotate(2deg); }
            100% { transform: translateY(0px) rotate(-2deg); }
          }
        `}
      </style>

    </section>
  );
};

export default Hero;
