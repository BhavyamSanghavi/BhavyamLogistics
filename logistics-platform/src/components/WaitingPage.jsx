// src/components/WaitingPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const WaitingPage = ({ tripId }) => {
  const [tripStatus, setTripStatus] = useState('pending');
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/trips/${tripId}`);
        setTripStatus(response.data.status);

        // Redirect to final page if delivered
        if (response.data.status === 'delivered') {
          navigate(`/trip/completed/${tripId}`);
        }
      } catch (error) {
        console.error('Error checking trip status:', error);
      }
    };

    const interval = setInterval(checkStatus, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [tripId, navigate]);

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Trip Status: {tripStatus}</h2>
      <p>Waiting for driver confirmation and updates...</p>
    </div>
  );
};

export default WaitingPage;
