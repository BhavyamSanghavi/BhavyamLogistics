import React, { useState } from 'react';
import TripRequest from './components/TripRequest';
import AvailableTrips from './components/AvailableTrips';
import Login from './components/Login';
import Signup from './components/Signup';
import OrderStatus from './components/OrderStatus';
import DriverDashboard from './components/DriverDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import AdminDashboard from './components/AdminDashboard'; // Import the AdminDashboard component

function App() {
  const [role, setRole] = useState(null); // Store user role
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
  const [tripId, setTripId] = useState(null); // Store tripId after trip request
  const [driverActiveTrip, setDriverActiveTrip] = useState(null); // Store driver's active trip
  const [userId, setUserId] = useState(null); // Store user ID for fetching trips
  const [showDashboard, setShowDashboard] = useState(false); // Track if the dashboard should be shown

  const handleLogin = (userIdFromLogin) => {
    setUserId(userIdFromLogin); // Set userId upon successful login
    setShowDashboard(false); // Reset dashboard visibility on login
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">Logistics Platform</h1>

      {role ? (
        role === 'customer' ? (
          <>
            {showDashboard ? (
              <>
                <CustomerDashboard userId={userId} />
                <button
                  onClick={() => setShowDashboard(false)} // Go back to TripRequest
                  className="bg-blue-500 text-white p-2 rounded mt-4"
                >
                  Back to Trip Request
                </button>
              </>
            ) : (
              <>
                <TripRequest setTripId={setTripId} />
                <button
                  onClick={() => setShowDashboard(true)} // Go to Dashboard
                  className="bg-blue-500 text-white p-2 rounded mt-4"
                >
                  View Dashboard
                </button>
              </>
            )}
          </>
        ) : role === 'driver' ? (
          <>
            {driverActiveTrip ? (
              <DriverDashboard tripId={driverActiveTrip} />
            ) : (
              <AvailableTrips setDriverActiveTrip={setDriverActiveTrip} />
            )}
          </>
        ) : role === 'admin' ? ( // New condition to render AdminDashboard
          <AdminDashboard />
        ) : (
          <div>Role not recognized</div>
        )
      ) : (
        <div className="w-full max-w-md">
          {isSignup ? (
            <>
              <Signup setRole={setRole} />
              <p className="mt-4 text-center">
                Already have an account?{' '}
                <button
                  onClick={() => setIsSignup(false)}
                  className="text-blue-500 underline"
                >
                  Log In
                </button>
              </p>
            </>
          ) : (
            <>
              <Login setRole={setRole} handleLogin={handleLogin} />
              <p className="mt-4 text-center">
                Don't have an account?{' '}
                <button
                  onClick={() => setIsSignup(true)}
                  className="text-blue-500 underline"
                >
                  Sign Up
                </button>
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
