// src/components/Login.jsx

import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setRole, handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        username,
        password,
      });

      const { token, role, userId } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      if(role === 'driver') {
        localStorage.setItem('driverId', 'userId');
      }
      handleLogin(userId); // Pass the userId back to App
      setRole(role);
      setError(null);
    } catch (err) {
      setError('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="p-6 bg-black rounded-md shadow-md w-full">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default Login;
