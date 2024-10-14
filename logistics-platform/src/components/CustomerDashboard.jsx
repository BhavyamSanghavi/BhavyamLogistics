// src/components/CustomerDashboard.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerDashboard = ({ userId }) => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/trips/user/${userId}`);
        setTrips(response.data);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchTrips();
  }, [userId]);

  return (
    <div className="p-6 bg-black rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Your Trips</h2>
      {trips.length === 0 ? (
        <p>You have no trips yet.</p>
      ) : (
        trips.map((trip) => (
          <div key={trip._id} className="mb-4 p-4 bg-black rounded shadow">
            <p><strong>Pickup:</strong> {trip.pickupLocation}</p>
            <p><strong>Dropoff:</strong> {trip.dropoffLocation}</p>
            <p><strong>Status:</strong> {trip.status}</p>
            <p><strong>Price:</strong> ${trip.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CustomerDashboard;
