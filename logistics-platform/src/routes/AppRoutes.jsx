// src/routes/AppRoutes.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TripRequest from '../components/TripRequest';
import AvailableTrips from '../components/AvailableTrips';
import OrderStatus from '../components/OrderStatus';
import DriverDashboard from '../components/DriverDashboard';
// import NotFound from '../components/NotFound'; // A 404 Not Found component

const AppRoutes = () => {
  return (
    <p>hi</p>
    // <Routes>
    //     {role ? (
    //       <>
    //         {role === 'customer' && (
    //           <>
    //             <Route path="/order-status" element={tripId ? <OrderStatus tripId={tripId} /> : <Navigate to="/trip-request" />} />
    //             <Route path="/trip-request" element={<TripRequest setTripId={setTripId} />} />
    //             <Route path="*" element={<Navigate to="/trip-request" />} />
    //           </>
    //         )}
    //         {role === 'driver' && (
    //           <>
    //             <Route path="/driver-dashboard" element={driverActiveTrip ? <DriverDashboard tripId={driverActiveTrip} /> : <Navigate to="/available-trips" />} />
    //             <Route path="/available-trips" element={<AvailableTrips setDriverActiveTrip={setDriverActiveTrip} />} />
    //             <Route path="*" element={<Navigate to="/available-trips" />} />
    //           </>
    //         )}
    //       </>
    //     ) : (
    //       <>
    //         <Route path="/login" element={<Login setRole={setRole} />} />
    //         <Route path="/signup" element={<Signup setRole={setRole} />} />
    //         <Route path="*" element={<Navigate to="/login" />} />
    //       </>
    //     )}
    //   </Routes>
  );
};

export default AppRoutes;
