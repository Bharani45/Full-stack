import React, { useEffect, useState, useContext } from 'react';
import Title from '../components/title';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login() {
  const [cur, scur] = useState('SignUp'); // or 'Login'
  const { token, setTok, navi, backendurl } = useContext(ShopContext);

  const [name, setn] = useState('');
  const [email, setemail] = useState('');
  const [password, setp] = useState('');

  const clearForm = () => {
    setn('');
    setemail('');
    setp('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim() || (cur === 'SignUp' && !name.trim())) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      const route = cur === 'SignUp' ? '/api/user/register' : '/api/user/login';
      const payload = cur === 'SignUp'
        ? { name: name.trim(), email: email.trim(), password }
        : { email: email.trim(), password };

      const response = await axios.post(backendurl + route, payload);

      if (response.data.success) {
        setTok(response.data.token);
        localStorage.setItem('token', response.data.token);
        clearForm();
      } else {
        toast.error(response.data.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navi('/');
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center m-10">
      <Title text1={cur} text2="" />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mt-6 border p-6 rounded-lg shadow-md flex flex-col gap-4 bg-white"
      >
        {cur === 'SignUp' && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setn(e.target.value)}
            className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setp(e.target.value)}
          className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="mt-4 bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          {cur === 'Login' ? 'Login' : 'Create Account'}
        </button>

        {cur === 'Login' && (
          <button type="button" className="text-sm text-blue-600 hover:underline">
            Forgot your password?
          </button>
        )}

        <button
          type="button"
          onClick={() => scur(cur === 'Login' ? 'SignUp' : 'Login')}
          className="text-sm mt-2 text-gray-600 hover:underline"
        >
          {cur === 'Login' ? "Don't have an account? Sign up" : 'Already have an account? Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
