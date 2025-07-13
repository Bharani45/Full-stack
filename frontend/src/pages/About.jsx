import React from 'react';
import Title from '../components/title';
import { assets } from '../assets/assets';
import News from '../components/News';

function About() {
  return (
    <div className="px-6 py-10 md:px-16 lg:px-32">
      {/* Page Title */}
      <Title text1={'ABOUT'} text2={'US'} />

      {/* Main content container */}
      <div className="flex flex-col lg:flex-row items-center gap-10 mt-10">
        {/* Left: Image */}
        <img
          src={assets.about_img}
          alt="About Us"
          className="w-full lg:w-1/2 rounded-lg shadow-md"
        />

        {/* Right: Text */}
        <div className="flex flex-col gap-4 lg:w-1/2 text-gray-700">
          <h2 className="text-2xl font-bold text-black">Who We Are</h2>
          <p>
            Welcome to our store! We are passionate about delivering high-quality products and exceptional customer service.
          </p>
          <p>
            Our journey started with a simple mission — to create an online space where shopping feels personal, fun, and easy.
          </p>
          <p>
            Whether you're looking for the latest trends, timeless classics, or everyday essentials, we've got something for everyone.
          </p>
          <ul className="list-disc ml-5 mt-2">
            <li>✨ Quality-focused</li>
            <li>🚚 Fast delivery</li>
            <li>💬 24/7 customer support</li>
            <li>🌿 Eco-conscious packaging</li>
          </ul>
        </div>
      </div>

      {/* Mission Section */}
      <div className=''>
        <News/>
      </div>
      
      <div className="mt-16 text-center">
        <h3 className="text-xl font-semibold text-black mb-4">Our Mission</h3>
        <p className="text-gray-600 max-w-3xl mx-auto">
          To create a seamless and joyful shopping experience by combining thoughtful design, great service, and a commitment to sustainability. Thank you for being part of our journey!
        </p>
      </div>
    </div>
  );
}

export default About;
