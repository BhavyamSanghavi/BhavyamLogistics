import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const DriverDashboard = ({ tripId }) => {
  const [status, setStatus] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchTrip = async () => {
      const response = await axios.get(`http://localhost:5000/api/trips/status/${tripId}`);
      setStatus(response.data.status);
    };
    fetchTrip();
  }, [tripId]);

  const handleUpdateStatus = async (newStatus) => {
    await axios.post(`http://localhost:5000/api/trips/status/${tripId}`, { status: newStatus });
    setStatus(newStatus);

    // If the new status is 'delivered', redirect to the available trips page
    if (newStatus === 'delivered') {
      navigate('/available-trips'); // Redirect to available trips page
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Driver Dashboard</h2>
      <p>Current Trip ID: {tripId}</p>
      <p>Current Status: {status}</p>

      <div className="mt-4">
        {status === 'confirmed' && (
          <button
            onClick={() => handleUpdateStatus('en_route')}
            className="bg-blue-500 text-white p-2 rounded"
          >
            En Route to Pickup
          </button>
        )}

        {status === 'en_route' && (
          <button
            onClick={() => handleUpdateStatus('collected')}
            className="bg-green-500 text-white p-2 rounded ml-2"
          >
            Goods Collected
          </button>
        )}

        {status === 'collected' && (
          <button
            onClick={() => handleUpdateStatus('delivered')}
            className="bg-red-500 text-white p-2 rounded ml-2"
          >
            Delivered
          </button>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;
