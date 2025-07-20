import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function VendorLogin({ backendurl, setVendorToken, navi }) {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendurl}/api/vendor/login`, form);
      if (res.data.success) {
        toast.success("Login successful!");
        localStorage.setItem("vendorToken", res.data.token);
        setVendorToken(res.data.token); // You might store vendor context separately
        navi("/vendor/dashboard");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Login failed");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Vendor Login</h2>
      <input name="email" placeholder="Email" onChange={handleChange} className="input" type="email" required />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} className="input" required />
      <button type="submit" className="btn-primary w-full mt-4">Login</button>
    </form>
  );
}

export default VendorLogin;
