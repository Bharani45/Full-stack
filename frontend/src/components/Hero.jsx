import React from 'react';
import { assets } from '../assets/assets';

function Hero() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="flex w-full max-w-screen-xl h-[80vh] shadow-md rounded-lg overflow-hidden">
      {/* Left Section - Text */}
      <div className="flex flex-col justify-center items-start w-1/2 bg-white pl-20">
        <p className="text-sm tracking-widest text-gray-500 mb-2">— OUR BESTSELLERS</p>
        <h1 className="text-4xl font-semibold mb-2">Latest <span className="font-light">Arrivals</span></h1>
        <p className="mt-2 text-sm tracking-wide">SHOP NOW <span className="inline-block w-8 h-[1px] bg-black ml-2 align-middle"></span></p>
      </div>

      {/* Right Section - Image */}
      <div className="w-1/2 bg-pink-100 flex justify-center items-center">
        <img src={assets.hero_img} alt="hero" className="max-h-[80%] object-cover" />
      </div>
    </div>
    </div>
  );
}

export default Hero;
