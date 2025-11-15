import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const BooksDetail = () => {
  const { booksData, addtocart, navigate } = useContext(AppContext);
  const { id } = useParams();

  const product = booksData?.find((product) => product._id === id);

  if (!product) {
    return (
      <p className="text-center text-gray-400 text-lg mt-20">
        Loading book details...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0c10] flex items-center justify-center px-6 py-20 relative overflow-hidden">

      {/* BACKGROUND GLOWS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-32 w-[450px] h-[450px] bg-indigo-600/20 blur-[160px]"></div>
        <div className="absolute bottom-0 right-0 w-[380px] h-[380px] bg-yellow-500/10 blur-[160px]"></div>
      </div>

      {/* WRAPPER ( FIXED ALIGNMENT ) */}
      <div className="relative max-w-6xl w-full bg-white/5 backdrop-blur-2xl border border-white/10 
                      rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.7)] grid md:grid-cols-2 gap-0 
                      overflow-hidden">

        {/* LEFT IMAGE SECTION */}
        <div className="flex justify-center items-center p-10 border-r border-white/10">
  <div className="w-[330px] h-[460px] rounded-xl overflow-hidden border border-white/20 
                  shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
    <img
      src={product.image}   // ← FIXED HERE
      alt={product.title}
      className="w-full h-full object-cover"
    />
  </div>
</div>

        {/* RIGHT CONTENT SECTION */}
        <div className="p-10 flex flex-col justify-center space-y-6 text-white">

          {/* TITLE */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold drop-shadow-lg leading-snug">
            {product.title}
          </h1>

          {/* AUTHOR */}
          <p className="text-gray-300 text-lg">by {product.author}</p>

          {/* RATING */}
          <div className="flex items-center gap-1">
            {Array(5).fill("").map((_, i) => (
              product.rating > i ? (
                <svg key={i} width="20" height="20" fill="#facc15">
                  <path d="M8.049.927c...Z" />
                </svg>
              ) : (
                <svg key={i} width="20" height="20" fill="#ffffff30">
                  <path d="M8.049.927c...Z" />
                </svg>
              )
            ))}
            <p className="ml-2 text-yellow-300 font-medium">({product.rating})</p>
          </div>

          {/* PRICE */}
          <div className="space-y-1">
            <p className="line-through text-gray-500 text-sm">MRP: ${product.price}</p>
            <p className="text-4xl font-bold text-yellow-400 tracking-tight">
              ${product.offerPrice}
            </p>
            <p className="text-gray-400 text-xs">(inclusive of all taxes)</p>
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-yellow-300">About this Book</h2>

            {Array.isArray(product.description) ? (
              <ul className="list-disc ml-5 text-gray-300 space-y-1 text-sm">
                {product.description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-300 text-sm leading-relaxed">{product.description}</p>
            )}
          </div>

          {/* BUTTONS (PERFECTLY ALIGNED) */}
          <div className="flex flex-col md:flex-row gap-5 pt-4">

            {/* ADD TO CART */}
            <button
              onClick={() => addtocart(product)}
              className="w-full md:w-1/2 py-3.5 rounded-xl bg-white/10 backdrop-blur-xl 
                         border border-white/20 flex items-center justify-center gap-2
                         text-white font-semibold hover:bg-white/20 hover:scale-[1.03]
                         transition-all shadow-[0_10px_40px_rgba(255,200,50,0.4)]"
            >
              🛒 Add to Cart
            </button>

            {/* BUY NOW */}
            <button
              onClick={() => {
                addtocart(product);
                navigate("/cart");
                toast.success("Proceeding to checkout");
              }}
              className="w-full md:w-1/2 py-3.5 rounded-xl bg-gradient-to-r from-yellow-500 
                         to-amber-400 text-black font-semibold hover:scale-[1.03] 
                         transition-all shadow-[0_10px_40px_rgba(255,200,50,0.5)]"
            >
              Buy Now →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BooksDetail;
