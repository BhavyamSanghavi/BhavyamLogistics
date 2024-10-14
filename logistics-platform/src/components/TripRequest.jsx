// src/components/TripRequest.jsx

import React, { useState } from 'react';
import axios from 'axios';

const TripRequest = ({ setTripId }) => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [vehicleType, setVehicleType] = useState('car');
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [isEstimating, setIsEstimating] = useState(true); // Toggle between estimating and confirming

  const demandMultiplier = 1.2; // Example demand multiplier (surge pricing)

  const vehicleData = {
    car: { basePrice: 5, ratePerKm: 2 },
    van: { basePrice: 8, ratePerKm: 3 },
    truck: { basePrice: 10, ratePerKm: 4 },
  };

  const calculateDistance = () => {
    // Simulate a random distance between 5 and 50 kilometers.
    return Math.random() * (50 - 5) + 5;
  };

  const handleEstimatePrice = () => {
    const distance = calculateDistance();
    const vehicle = vehicleData[vehicleType];

    // Calculate price using base price, rate per km, and demand multiplier
    const price = (vehicle.basePrice + vehicle.ratePerKm * distance) * demandMultiplier;

    setEstimatedPrice(price.toFixed(2)); // Set the estimated price
    setIsEstimating(false); // Toggle to show "Request Trip" button
  };

  const handleRequestTrip = async (e) => {
    e.preventDefault();
    const customerId = localStorage.getItem('userId'); // Assuming customerId is stored

    try {
      // Send the estimated price in the request body
      const response = await axios.post('http://localhost:5000/api/trips', {
        customerId,
        pickupLocation,
        dropoffLocation,
        vehicleType,
        price: estimatedPrice, // Send the estimated price here
      });
      setTripId(response.data._id); // Set tripId after successful request

      // Reset form fields
      setPickupLocation('');
      setDropoffLocation('');
      setVehicleType('car');
      setEstimatedPrice(null);
      setIsEstimating(true); // Go back to estimating phase
    } catch (error) {
      console.error('Error requesting trip:', error);
    }
  };

  return (
    <div className="p-6 bg-black rounded-md shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Request a Trip</h2>
      <form>
        <input
          type="text"
          placeholder="Pickup Location"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
          required
        />
        <input
          type="text"
          placeholder="Dropoff Location"
          value={dropoffLocation}
          onChange={(e) => setDropoffLocation(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
          required
        />
        <select
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        >
          <option value="car">Car</option>
          <option value="van">Van</option>
          <option value="truck">Truck</option>
        </select>

        {isEstimating ? (
          <button
            type="button"
            onClick={handleEstimatePrice}
            className="bg-blue-500 text-white p-2 rounded mt-4 w-full"
          >
            Estimate Price
          </button>
        ) : (
          <>
            <p className="mt-4 text-xl">
              Estimated Price: <strong>${estimatedPrice}</strong>
            </p>
            <button
              type="button"
              onClick={handleRequestTrip}
              className="bg-green-500 text-white p-2 rounded mt-4 w-full"
            >
              Request Trip
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default TripRequest;
