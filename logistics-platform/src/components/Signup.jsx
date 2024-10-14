import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ setRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setUserRole] = useState('customer'); // Default to customer
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous errors before new request
    setSuccess(null); // Reset success message

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        username,
        password,
        role, // Either 'customer' or 'driver'
      });
  
      const { userId } = response.data;
      console.log('User registered successfully. ID:', userId);

      // Show success message
      setSuccess('User registered successfully.');
      
      // Reset form fields
      setUsername('');
      setPassword('');
      setUserRole('customer');

      // Optional: Set the role in parent component or navigate to login
      setRole(role); // Set role to parent component if necessary
      
    } catch (err) {
      console.error(err);
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-black rounded-md shadow-md h-full w-full">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSignup}>
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
        <select
          value={role}
          onChange={(e) => setUserRole(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        >
          <option value="customer">Customer</option>
          <option value="driver">Driver</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Signup
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {success && <p className="mt-4 text-green-500">{success}</p>}
    </div>
  );
};

export default Signup;
