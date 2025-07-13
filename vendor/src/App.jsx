import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import List from './pages/List';
import Orders from './pages/Orders';
import Add from './pages/Add'; // Capitalized for consistency
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VendorLogin from './components/Vendorlogin';

export const bakendurl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [token, settoken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <div>
      <ToastContainer />
      {token === '' ? (
        <VendorLogin setVendorToken={settoken} />
      ) : (
        <>
          <Navbar settoken={settoken} />

          {/* Main layout: Sidebar + Content */}
          <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex-1 p-4 bg-gray-50">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                {/* Default route redirect */}
                <Route path="*" element={<Navigate to="/add" />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
