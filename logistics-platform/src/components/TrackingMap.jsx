import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import io from 'socket.io-client';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: -3.745, // Default coordinates (placeholder)
  lng: -38.523,
};

const TrackingMap = () => {
  const [driverLocation, setDriverLocation] = useState(center);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your Google Maps API Key
  });

  useEffect(() => {
    // Connect to the Socket.io server
    const socket = io('http://localhost:5000');

    // Listen for location updates from the server
    socket.on('locationUpdate', (location) => {
      setDriverLocation(location);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={driverLocation}
      zoom={15}
    >
      {/* Marker for the driver's current location */}
      <Marker position={driverLocation} />
    </GoogleMap>
  );
};

export default TrackingMap;
