import { useEffect, useState } from 'react';
import axios from 'axios';

const Tracking = () => {
  const [driverLocation, setDriverLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDriverLocation = async () => {
      try {
        const response = await axios.get('http://localhost:5000/track');
        setDriverLocation(response.data.location);
      } catch (err) {
        setError('Failed to fetch driver location');
        console.error(err);
      }
    };

    // Set interval to poll the server every 5 seconds for updates
    const interval = setInterval(() => {
      fetchDriverLocation();
    }, 5000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-gray-900 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Track Your Driver</h2>
      {error && <p className="text-red-500">{error}</p>}
      {driverLocation ? (
        <p>Current Driver Location: {driverLocation.lat}, {driverLocation.lng}</p>
      ) : (
        <p>Loading driver location...</p>
      )}
    </div>
  );
};

export default Tracking;
