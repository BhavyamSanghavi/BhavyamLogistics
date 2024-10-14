import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AvailableTrips = ({ setDriverActiveTrip }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state for confirmation action

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/trips/available');
        setTrips(response.data);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    // Fetch trips initially
    fetchTrips();

    // Polling every 30 seconds to fetch available trips
    const interval = setInterval(() => {
      fetchTrips();
    }, 30000); // 30 seconds interval

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const handleConfirm = async (tripId) => {
    const driverId = localStorage.getItem('driverId'); // assume driverId is stored after login
    console.log('Confirming trip:', tripId, 'for driver:', driverId);

    if (!driverId) {
      console.error('No driver ID found in localStorage!');
      return;
    }

    try {
      setLoading(true); // Set loading state
      const response = await axios.post(`http://localhost:5000/api/trips/confirm/${tripId}`, { driverId });
      
      // Remove the confirmed trip from available trips
      setTrips(trips.filter((trip) => trip._id !== tripId)); 
      
      // Set current trip for the driver
      setDriverActiveTrip(response.data._id); 

    } catch (error) {
      console.error('Error confirming trip:', error);
    } finally {
      setLoading(false); // Reset loading state after action
    }
  };

  return (
    <div className="p-6 bg-black rounded-md shadow-md w-full">
      <h2 className="text-xl font-bold mb-4 w-full">Available Trips</h2>
      {trips.length === 0 ? (
        <p>No available trips.</p>
      ) : (
        trips.map((trip) => (
          <div key={trip._id} className="mb-4 p-4 bg-black rounded shadow">
            <p><strong>Pickup:</strong> {trip.pickupLocation}</p>
            <p><strong>Dropoff:</strong> {trip.dropoffLocation}</p>
            <p><strong>Price:</strong> ${trip.price}</p>
            <button
              onClick={() => handleConfirm(trip._id)}
              className={`bg-green-500 text-white p-2 rounded mt-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
              disabled={loading} // Disable button during loading
            >
              {loading ? 'Confirming...' : 'Confirm Trip'}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AvailableTrips;
