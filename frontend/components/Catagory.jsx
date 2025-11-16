import React from "react";
import Lottie from "lottie-react";

const Category = () => {
  return (
    <div className="
      w-full h-[350px] rounded-3xl relative overflow-hidden
      bg-transparent
      flex items-center justify-center
    ">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-1/3 w-[25rem] h-[25rem] bg-purple-600/20 blur-[150px]"></div>
        <div className="absolute right-0 bottom-0 w-[25rem] h-[25rem] bg-blue-500/20 blur-[150px]"></div>
      </div>

      {/* GLASS LAYER */}
      <div
        className="
          absolute inset-0 rounded-3xl
          bg-white/5 backdrop-blur-2xl
          border border-white/10
          shadow-[0_0_40px_rgba(0,0,0,0.4)]
          z-10
        "
      ></div>

      {/* WALKING ANIMATION */}
      <Lottie
        animationData={null}
        path="https://assets7.lottiefiles.com/packages/lf20_puciaact.json"
        loop={true}
        className="w-[280px] h-[280px] z-20"
        style={{
          animation: "walk 10s ease-in-out infinite",
        }}
      />

      {/* ANIMATION KEYFRAMES */}
      <style>{`
        @keyframes walk {
          0% { transform: translateX(-260px); }
          50% { transform: translateX(260px); }
          100% { transform: translateX(-260px); }
        }
      `}</style>
    </div>
  );
};

export default Category;
