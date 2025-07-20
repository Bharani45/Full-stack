import React from 'react';
import { assets } from '../assets/assets';

function Hero() {
  return (
    <div className="flex justify-center items-center bg-gray-50 py-10">
      <div className="flex w-full max-w-6xl h-[400px] shadow-md rounded-lg overflow-hidden">

        {/* Left Section - Text */}
        <div className="flex flex-col justify-center items-start w-1/2 bg-white px-10">
          <p className="text-sm tracking-widest text-gray-500 mb-2 uppercase">— Our Bestsellers</p>
          <h1 className="text-3xl font-semibold mb-2">
            Latest <span className="font-light">Arrivals</span>
          </h1>
          <p className="mt-2 text-sm tracking-wide font-medium">
            Shop Now 
            <span className="inline-block w-8 h-[1.5px] bg-black ml-2 align-middle"></span>
          </p>
        </div>

        {/* Right Section - Image */}
        <div className="w-1/2 bg-pink-100 flex justify-center items-center">
          <img
            src={assets.hero_img}
            alt="hero"
            className="h-[250px] w-auto object-contain"
          />
        </div>

      </div>
    </div>
  );
}

export default Hero;
