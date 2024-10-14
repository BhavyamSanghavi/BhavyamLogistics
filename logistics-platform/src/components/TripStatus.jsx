// src/components/TripStatus.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TripStatus = ({ tripId }) => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchStatus = async () => {
      const response = await axios.get(`http://localhost:5000/api/trips/${tripId}`);
      setStatus(response.data.status);
    };
    fetchStatus();
  }, [tripId]);

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Current Trip Status: {status}</h2>
      <ul>
        <li>{status === 'en_route' && 'Driver is en route to pickup.'}</li>
        <li>{status === 'collected' && 'Goods collected.'}</li>
        <li>{status === 'delivered' && 'Goods delivered.'}</li>
      </ul>
    </div>
  );
};

export default TripStatus;
