import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Productlist = () => {
  const { booksData } = useContext(AppContext);

  return (
    <div className="py-8 sm:py-10">

      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-serif text-white mb-6 sm:mb-10 drop-shadow-xl">
        📚 All Books
      </h1>

      {/* WRAPPER WITH HORIZONTAL SCROLL FOR MOBILE */}
      <div className="w-full overflow-x-auto rounded-2xl scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">

        {/* TABLE */}
        <div
          className="
            min-w-[600px]      /* MOBILE SAFE WIDTH */
            w-full 
            rounded-2xl overflow-hidden
            bg-white/5 backdrop-blur-2xl 
            border border-white/10
            shadow-[0_10px_40px_rgba(0,0,0,0.35)]
          "
        >
          <table className="w-full table-auto">
            <thead>
              <tr className="text-gray-300 text-sm border-b border-white/10">
                <th className="px-6 py-4 font-semibold text-left">Book</th>
                <th className="px-6 py-4 font-semibold text-left">Category</th>
                <th className="px-6 py-4 font-semibold text-left hidden md:table-cell">
                  Price
                </th>
              </tr>
            </thead>

            <tbody className="text-gray-200 text-sm">
              {booksData.map((product, index) => (
                <tr
                  key={index}
                  className="
                    border-t border-white/10 
                    hover:bg-white/10
                    transition-all duration-300 cursor-pointer
                  "
                >
                  {/* Book + Image */}
                  <td className="px-6 py-4 flex items-center gap-4">
                    <div
                      className="
                        w-12 h-16 sm:w-14 sm:h-20 
                        rounded-md overflow-hidden border border-white/10 
                        shadow-md 
                        transition-transform duration-300
                      "
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <span className="truncate font-medium text-white/90 max-w-[140px] sm:max-w-none">
                      {product.title}
                    </span>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="
                      px-3 py-1 text-xs rounded-full 
                      bg-indigo-500/20 text-indigo-300
                    ">
                      {product.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 hidden md:table-cell font-semibold text-indigo-300">
                    ₹ {product.offerPrice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default Productlist;
