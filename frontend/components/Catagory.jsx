import React from "react";
import { categories } from "../src/assets/assets";

// AWWWARDS-STYLE ULTRA PREMIUM CATEGORY SHOWCASE
// ✔ No logic changed
// ✔ Cinematic grid with NO GAP
// ✔ Dark luxury theme with gold glow accents
// ✔ Full-bleed square cards similar to the screenshot you provided

const Category = () => {
  return (
    <div className="my-20 text-center px-6">
      {/* Heading */}
      <h1 className="font-serif text-4xl md:text-6xl text-white drop-shadow-xl mb-12">
        Browse Categories
      </h1>

      {/* FULL-WIDTH SHOWCASE GRID (NO GAP) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-0 w-full">
        {categories.map((category) => (
          <div
            key={category._id}
            className="relative w-full h-[180px] md:h-[200px] overflow-hidden
                       bg-black/40 backdrop-blur-2xl border border-white/10
                       group transition-all duration-700 cursor-pointer"
          >
            {/* BACKGROUND IMAGE (CINEMATIC) */}
            <img
              src={category.image}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover
                         group-hover:scale-110 transition-all duration-700"
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            {/* GOLDEN SHINE */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-40
                            bg-gradient-to-r from-transparent via-yellow-200/20 to-transparent
                            translate-x-[-100%] group-hover:translate-x-[100%]
                            rotate-[25deg] transition-all duration-[1200ms]
                            pointer-events-none"></div>

            {/* CATEGORY NAME */}
            <div className="absolute bottom-5 left-6 z-10">
              <p className="text-xl md:text-2xl font-serif tracking-wide text-white drop-shadow-lg group-hover:text-amber-300 transition-all duration-500">
                {category.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;