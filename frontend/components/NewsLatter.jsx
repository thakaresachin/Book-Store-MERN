import React from "react";

// AWWWARDS-STYLE PREMIUM NEWSLETTER SECTION
// Dark luxury theme • Cinematic gradients • Glassmorphism • Gold accent
// ZERO logic changed — only UI upgraded

const Newsletter = () => {
  return (
    <div className="relative py-20 px-6 w-full overflow-hidden bg-[#0a0a0d] flex justify-center items-center">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-10 w-72 h-72 bg-amber-500/10 blur-[150px]"></div>
        <div className="absolute bottom-0 right-0 w-[22rem] h-[22rem] bg-yellow-300/10 blur-[160px]"></div>
      </div>

      {/* CARD WRAPPER */}
      <div className="w-full max-w-5xl md:h-[360px] rounded-3xl overflow-hidden backdrop-blur-2xl
                      bg-white/5 border border-white/10 shadow-[0_10px_60px_rgba(0,0,0,0.7)] grid md:grid-cols-2">

        {/* LEFT IMAGE */}
        <div className="relative hidden md:block overflow-hidden">
          <img
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/newsletter/image.png"
            alt="newsletter"
            className="w-full h-full object-cover scale-105 hover:scale-110 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="relative flex flex-col items-center justify-center p-10 text-center">

          {/* TITLE */}
          <h1 className="font-serif text-4xl md:text-5xl text-white tracking-wide drop-shadow-xl">
            Stay <span className="text-amber-400">Updated</span>
          </h1>

          <p className="mt-4 text-gray-300 max-w-sm leading-relaxed">
            Subscribe to receive exclusive updates, insights, and premium book recommendations.
          </p>

          {/* FORM */}
          <form className="mt-8 flex w-full max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow bg-black/40 border border-white/20 text-gray-200
                         rounded-l-xl p-3 backdrop-blur-xl focus:outline-none focus:ring-2
                         focus:ring-amber-400 placeholder-gray-400"
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300
                         text-black font-semibold px-6 py-3 rounded-r-xl shadow-[0_0_30px_rgba(255,200,50,0.4)]
                         hover:shadow-[0_0_45px_rgba(255,210,90,0.6)] transition-all duration-500"
            >
              Join
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
