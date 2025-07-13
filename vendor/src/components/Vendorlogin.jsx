import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { bakendurl } from '../App';

function VendorLogin({ setVendorToken }) {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${bakendurl}/api/vendor/login`, form);
      if (res.data.success) {
        toast.success("Login successful!");
        localStorage.setItem("vendorToken", res.data.token);
        localStorage.setItem("vendorEmail", res.data.vendor.email); // ✅
        setVendorToken(res.data.token);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Login failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form 
        onSubmit={handleLogin} 
        className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center">Vendor Login</h2>

        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={form.email}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default VendorLogin;
