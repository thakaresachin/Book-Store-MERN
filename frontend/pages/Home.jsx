import React from 'react';
import Hero from '../components/Hero';
import Search from '../components/Search';
import Catagory from '../components/Catagory';
import NewArrivel from '../components/NewArrivel';
import NewsLatter from '../components/NewsLatter';

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-[#0b0c10] overflow-hidden">

      {/* 🔥 Hero Full Dark Cinematic Section */}
      <div className="w-full">
        <Hero />
      </div>

      {/* 🔥 Search Section (Glass + Glow) */}
      <div className="w-full mt-20">
        <Search />
      </div>

      {/* 🔥 Category Section */}
      <div className="w-full mt-20">
        <Catagory />
      </div>

      {/* 🔥 New Arrivals Grid */}
      <div className="w-full mt-20 px-4 md:px-10">
        <NewArrivel />
      </div>

      {/* 🔥 Newsletter Glass Section */}
      <div className="w-full mt-24 mb-20 px-4 md:px-10">
        <NewsLatter />
      </div>

    </div>
  );
};

export default Home;
