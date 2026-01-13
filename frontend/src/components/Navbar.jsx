import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // FIX 1: Destructure setcart to clear data on logout
  const { showsearch, setshowsearch, getcount, setTok, token, navi, setcart } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem('token');
    setTok('');
    setcart({}); // FIX 2: Clear the cart state immediately so data is gone
    navi('/login');
  }

  return (
    <div className="bg-white px-6 py-4 shadow-md text-black">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to='/'><img src={assets.logo} alt="logo" className="h-10" /></Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-lg">
          <li><NavLink to="/" className="hover:underline">HOME</NavLink></li>
          <li><NavLink to="/about" className="hover:underline">ABOUT</NavLink></li>
          <li><NavLink to="/collection" className="hover:underline">COLLECTION</NavLink></li>
          <li><NavLink to="/contact" className="hover:underline">CONTACT</NavLink></li>
        </ul>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <img onClick={() => setshowsearch(!showsearch)} src={assets.search_icon} alt="search" className="h-6 cursor-pointer" />

          {/* Profile dropdown */}
          <div className='group relative'>
            <img src={assets.profile_icon} alt="profile" className="h-6 cursor-pointer" />

            {/* FIX 3: Conditional Rendering for Dropdown */}
            <div className='group-hover:block hidden absolute right-0 pt-4 z-10'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 rounded shadow-md transition-all'>
                
                {token ? (
                  // If Logged In: Show Profile, Orders, Logout
                  <>
                    <p className='cursor-pointer hover:bg-gray-200 px-2 py-1 rounded transition'>My Profile</p>
                    <Link to='/orders'><p className='cursor-pointer hover:bg-gray-200 px-2 py-1 rounded transition'>Orders</p></Link>
                    <p onClick={logout} className='cursor-pointer hover:bg-red-200 px-2 py-1 rounded transition text-red-600'>Logout</p>
                  </>
                ) : (
                  // If Logged Out: Show Login Only
                  <Link to='/login'>
                    <p className='cursor-pointer hover:bg-gray-200 px-2 py-1 rounded transition'>Login</p>
                  </Link>
                )}

              </div>
            </div>
          </div>

          {/* Cart */}
          <Link to='/cart' className='relative inline-block'>
            <img src={assets.cart_icon} className='h-6 w-6 cursor-pointer' alt='cart' />
            <p className='absolute -right-1 -bottom-1 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
              {getcount()}
            </p>
          </Link>

          {/* Hamburger Menu */}
          <img
            src={assets.menu_icon}
            className='w-6 cursor-pointer md:hidden'
            alt='menu'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="mt-4 md:hidden flex flex-col space-y-2 text-lg">
          <NavLink to="/" className="hover:underline" onClick={() => setMobileMenuOpen(false)}>HOME</NavLink>
          <NavLink to="/about" className="hover:underline" onClick={() => setMobileMenuOpen(false)}>ABOUT</NavLink>
          <NavLink to="/collection" className="hover:underline" onClick={() => setMobileMenuOpen(false)}>COLLECTION</NavLink>
          <NavLink to="/contact" className="hover:underline" onClick={() => setMobileMenuOpen(false)}>CONTACT</NavLink>
        </div>
      )}
    </div>
  );
}

export default Navbar;