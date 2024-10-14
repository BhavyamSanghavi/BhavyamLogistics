// src/components/OrderStatus.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderStatus = ({ tripId }) => {
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    const fetchStatus = async () => {
      const response = await axios.get(`http://localhost:5000/api/trips/status/${tripId}`);
      setStatus(response.data.status);
    };

    // Polling for status updates every 10 seconds
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [tripId]);

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Order Status</h2>
      <p>Trip ID: {tripId}</p>
      <p>Status: {status}</p>
    </div>
  );
};

export default OrderStatus;
