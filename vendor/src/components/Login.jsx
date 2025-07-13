import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { bakendurl } from '../App';

function Login({ settoken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${bakendurl}/api/user/admin`, {
        email,
        password,
      });

      if (response.data.success && response.data.token) {
        // ✅ Save token to localStorage and app state
        localStorage.setItem('token', response.data.token);
        settoken(response.data.token);
        toast.success('Login successful');
      } else {
        toast.error(response.data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Panel Login</h1>
        <form onSubmit={onsubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
