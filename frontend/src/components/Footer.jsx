import React from 'react';
import { assets } from '../assets/assets';

function Footer() {
  return (
    <div>
    <div className='flex justify-center items-center bg-gray-100 px-4 py-6 m-4'>
      {/* Column 1 */}
      <div className='w-1/3 flex flex-col justify-center items-center px-2 text-center'>
        <img src={assets.logo} alt='logo' className='h-12 mb-2'/>
        <p>This is a prestigious company</p>
      </div>

      {/* Column 2 */}
      <div className='w-1/3 text-center'>
        <ul className='space-y-1'>
          <li className='hover:underline cursor-pointer'>Home</li>
          <li className='hover:underline cursor-pointer'>About us</li>
          <li className='hover:underline cursor-pointer'>Policy</li>
        </ul>
      </div>

      {/* Column 3 */}
      <div className='w-1/3 text-center'>
        <p className='font-semibold mb-2'>GET IN TOUCH</p>
        <ul className='space-y-1'>
          <li>9850667543</li>
          <li>dubaikurukusandhu@gmail.com</li>
        </ul>
      </div>
    </div>
    <div className='flex justify-center italic'>
        <p className=''>All copyrights reserved @2004</p>
    </div>
    </div>
  );
}

export default Footer;
