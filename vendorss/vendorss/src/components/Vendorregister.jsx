import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function VendorRegister({ backendurl, navi }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    shopName: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendurl}/api/vendor/register`, form);
      if (res.data.success) {
        toast.success("Registered successfully! Wait for admin approval.");
        navi('/vendor-login');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Registration failed");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Vendor Registration</h2>
      <input name="name" placeholder="Name" onChange={handleChange} className="input" required />
      <input name="email" placeholder="Email" onChange={handleChange} className="input" type="email" required />
      <input name="shopName" placeholder="Shop Name" onChange={handleChange} className="input" required />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} className="input" required />
      <button type="submit" className="btn-primary w-full mt-4">Register</button>
    </form>
  );
}

export default VendorRegister;
