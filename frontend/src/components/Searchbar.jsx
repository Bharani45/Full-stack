import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

function Searchbar() {
  const { search, setsearch, showsearch, setshowsearch } = useContext(ShopContext);
  const location = useLocation();
  const [visible, setvisible] = useState(false);

  useEffect(() => {
    if (location.pathname.includes('/collection')) {
      setvisible(true);
    } else {
      setvisible(false);
    }
  }, [location, showsearch]);

  return showsearch && visible ? (
    <div className="bg-white py-4 px-4 shadow-md">
      <div className="flex justify-center items-center gap-3 max-w-4xl mx-auto">
        <input
          type="search"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          placeholder="Search for products..."
          className="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button
          onClick={() => setshowsearch(false)}
          className="flex items-center justify-center h-10 w-10 bg-gray-100 border border-gray-300 rounded-full hover:bg-red-100 transition"
        >
          <img src={assets.cross_icon} alt="Close" className="h-5 w-5" />
        </button>
      </div>
    </div>
  ) : null;
}

export default Searchbar;
