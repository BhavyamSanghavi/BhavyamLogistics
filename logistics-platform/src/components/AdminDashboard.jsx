// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalTrips: 0,
    completedTrips: 0,
    pendingTrips: 0,
    totalRevenue: 0,
    tripsPerVehicle: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/trips/statistics');
        setStats(response.data);
      } catch (error) {
        setError('Error fetching statistics');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch statistics on component mount
    fetchStatistics();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 bg-black rounded-md shadow-md w-full max-w-3xl">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-black rounded shadow">
          <h3 className="text-lg font-semibold">Total Trips</h3>
          <p className="text-2xl">{stats.totalTrips}</p>
        </div>
        <div className="p-4 bg-black rounded shadow">
          <h3 className="text-lg font-semibold">Completed Trips</h3>
          <p className="text-2xl">{stats.completedTrips}</p>
        </div>
        <div className="p-4 bg-black rounded shadow">
          <h3 className="text-lg font-semibold">Pending Trips</h3>
          <p className="text-2xl">{stats.pendingTrips}</p>
        </div>
        <div className="p-4 bg-black rounded shadow">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl">${stats.totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-4">Trips per Vehicle Type</h3>
      <div className="p-4 bg-black rounded shadow">
        <ul>
          {stats.tripsPerVehicle.map((vehicle) => (
            <li key={vehicle._id} className="mb-2">
              {vehicle._id}: {vehicle.count} trips
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
