import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { FaUserPlus } from 'react-icons/fa'; // 👥 Icon for pending vendors
import axios from 'axios';
import { bakendurl } from '../App';
import { Link } from 'react-router-dom'; // ✅ Import Link for navigation

function Navbar({ settoken }) {
  const [pendingCount, setPendingCount] = useState(0);

  const fetchPendingCount = async () => {
    try {
      const response = await axios.get(`${bakendurl}/api/vendor/pending`);
      if (response.data.success) {
        setPendingCount(response.data.vendors.length); // ⏳ Count of pending vendors
      }
    } catch (err) {
      console.error("Failed to fetch pending vendor count", err);
    }
  };

  useEffect(() => {
    fetchPendingCount();
  }, []);

  return (
    <div className="flex px-[2%] py-[2%] items-center justify-between bg-white shadow">
      <img className="w-[140px]" src={assets.logo} alt="Logo" />

      <div className="flex items-center gap-6">
        {/* 🔗 Link to Pending Vendors Page with Icon and Badge */}
        <Link to="/pending" className="relative cursor-pointer">
          <FaUserPlus size={24} className="text-gray-700" />
          {pendingCount > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full">
              {pendingCount}
            </span>
          )}
        </Link>

        <button
          onClick={() => settoken('')}
          className="border bg-black text-white rounded px-4 py-1 hover:bg-gray-800"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
