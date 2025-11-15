import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import BookCart from '../components/BookCart';

const Books = () => {
  const { booksData, selectCategory } = useContext(AppContext);

  const filteredBooks = booksData.filter((book) => {
    if (!selectCategory) return true;
    return book.category?.toLowerCase() === selectCategory.toLowerCase();
  });

  return (
    <div
      className="
        py-16 min-h-screen 
        bg-[#0b0c10] 
        relative overflow-hidden
      "
    >

      {/* BACKGROUND GLOWS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-16 w-96 h-96 bg-indigo-700/20 blur-[150px]"></div>
        <div className="absolute bottom-0 right-0 w-[26rem] h-[26rem] bg-blue-500/10 blur-[170px]"></div>
      </div>

      {/* PAGE HEADING */}
      <h1 className="text-4xl md:text-6xl font-serif text-white mb-14 relative z-10">
        {selectCategory ? `${selectCategory} Books` : "All Books"}
      </h1>

      {/* BOOKS GRID */}
      <div
        className="
          relative z-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          xl:grid-cols-4
          gap-10
        "
      >
        {filteredBooks.map((book) => (
          <BookCart key={book._id} book={book} />
        ))}
      </div>

    </div>
  );
};

export default Books;
