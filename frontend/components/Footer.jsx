import React from "react";

const Footer = () => {
  return (
    <footer className="relative w-full mt-20 bg-[#0b0c10] text-gray-300 overflow-hidden">

      {/* BACKGROUND GLOWS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[26rem] h-[26rem] bg-indigo-600/20 blur-[150px]" />
        <div className="absolute top-0 right-0 w-[26rem] h-[26rem] bg-purple-600/25 blur-[160px]" />
      </div>

      <div className="relative px-6 md:px-16 lg:px-24 xl:px-32 py-16">

        {/* TOP BRAND SECTION */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-14">

          {/* LOGO + NAME */}
          <div className="flex items-center gap-4">
            

            <h1 className="text-3xl font-serif tracking-wide text-white drop-shadow-xl">
              BookVerse
            </h1>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-6">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/sachin-thakare-ba6541262/"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full bg-white/5 backdrop-blur-lg 
                border border-white/10 hover:bg-white/10 
                transition-all duration-300 hover:scale-110 cursor-pointer"
            >
              <svg
                className="w-5 h-5 text-gray-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7H10v-7a6 6 0 016-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/thakaresachin"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full bg-white/5 backdrop-blur-lg 
                border border-white/10 hover:bg-white/10 
                transition-all duration-300 hover:scale-110 cursor-pointer"
            >
              <svg
                className="w-6 h-6 text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .8.1-.7.4-1.1.7-1.4-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6.2 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.9.1 3.2.8.9 1.2 2 1.2 3.3 0 4.7-2.8 5.6-5.5 5.9.4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6A10.9 10.9 0 0 0 23.5 12C23.5 5.6 18.4.5 12 .5z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/sachin.thakare_/"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full bg-white/5 backdrop-blur-lg 
                border border-white/10 hover:bg-white/10 
                transition-all duration-300 hover:scale-110 cursor-pointer"
            >
              <svg
                className="w-5 h-5 text-gray-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>

        <hr className="border-white/10 my-8" />

        {/* BOTTOM TEXT */}
        <p className="text-center text-gray-400 text-sm mt-4">
          Made with ❤️ by{" "}
          <a
            href="https://www.linkedin.com/in/sachin-thakare-ba6541262/"
            target="_blank"
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Sachin Thakare
          </a>
        </p>

        <p className="text-center text-gray-500 text-xs mt-2">
          © 2025 BookVerse — Crafted for Readers
        </p>

      </div>

      {/* FLOAT ANIMATION */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
