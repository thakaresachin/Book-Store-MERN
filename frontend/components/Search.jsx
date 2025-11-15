import React, { useState, useContext, useEffect, useRef } from "react";
import { categories } from "../src/assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const { booksData, setselectCategory } = useContext(AppContext);
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const dropdownRef = useRef();

  const filteredBooks = booksData.filter((book) => {
    return (
      query.trim() === "" ||
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
    );
  });

  // CLOSE DROPDOWN CLICK OUTSIDE
  useEffect(() => {
    const click = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", click);
    return () => document.removeEventListener("mousedown", click);
  }, []);

  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-start px-4 sm:px-6 md:px-10 py-16 bg-[#0a0a0d] relative">

      {/* SEARCH BOX */}
      <div
        ref={dropdownRef}
        className="
          w-full max-w-xl
          bg-white/5 backdrop-blur-xl 
          border border-white/10
          px-6 sm:px-8 py-8 
          rounded-2xl
          shadow-[0_10px_40px_rgba(0,0,0,0.6)]
          mb-12
        "
      >
        <h2 className="text-2xl sm:text-3xl font-serif text-white text-center mb-6">
          Search Your Favorite Book
        </h2>

        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search Book..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowResults(true);
            }}
            className="
              flex-1 px-4 py-3 rounded-xl
              bg-white/10 border border-white/20 
              text-white placeholder-gray-400 outline-none
            "
          />

          <button
            className="
              px-6 py-3 rounded-xl
              bg-gradient-to-r from-amber-500 to-yellow-400 
              text-black font-semibold
            "
          >
            Search
          </button>
        </form>

        {/* SEARCH DROPDOWN */}
        {showResults && query.length > 0 && (
          <div className="
            mt-4 bg-black/70 backdrop-blur-xl 
            border border-white/10
            rounded-xl 
            p-4 
            max-h-64 overflow-y-auto
          ">
            {filteredBooks.length === 0 ? (
              <p className="text-gray-400 text-center">No results found</p>
            ) : (
              filteredBooks.map((book) => (
                <div
                  key={book._id}
                  className="
                    flex items-center gap-4 py-2 px-2 cursor-pointer 
                    hover:bg-white/10 rounded-lg
                  "
                  onClick={() => navigate(`/books/${book._id}`)}
                >
                  <img
                    src={`http://localhost:3000/uploads/${book.image}`}
                    className="w-10 h-14 sm:w-12 sm:h-16 rounded-lg object-cover"
                  />

                  <div>
                    <p className="text-white font-medium">{book.title}</p>
                    <p className="text-gray-400 text-sm">{book.author}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* CATEGORY GRID */}
      <div
        className="
          w-full max-w-5xl
          grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6
          gap-0 
          rounded-2xl overflow-hidden
          border border-white/10 
          bg-white/5 backdrop-blur-xl
        "
      >
        {categories.map((category) => (
          <div
            key={category._id}
            onClick={() => {
              setselectCategory(category.name);
              navigate("/books");
            }}
            className="
              relative w-full h-[120px] sm:h-[150px] md:h-[160px] 
              cursor-pointer group overflow-hidden 
              border border-white/5
            "
          >
            <img
              src={category.image}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

            <p className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 text-white text-sm sm:text-base font-semibold group-hover:text-amber-300">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
