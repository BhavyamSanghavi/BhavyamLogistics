import React, { useState } from 'react';

const PriceEstimator = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [vehicleType, setVehicleType] = useState('car');
  const [estimatedPrice, setEstimatedPrice] = useState(null);

  // Dummy data for demo purposes
  const vehicleData = {
    car: { basePrice: 5, ratePerKm: 2 },
    van: { basePrice: 8, ratePerKm: 3 },
    truck: { basePrice: 10, ratePerKm: 4 }
  };

  const demandMultiplier = 1.2; // Example demand multiplier (surge pricing during high demand)

  // Function to simulate distance calculation (normally from an API)
  const calculateDistance = (pickup, dropoff) => {
    // Placeholder for an actual distance calculation, e.g., via Google Maps API
    // Here we simulate a distance between 5 and 50 kilometers.
    return Math.random() * (50 - 5) + 5;
  };

  const handleEstimate = () => {
    const distance = calculateDistance(pickupLocation, dropoffLocation);
    const vehicle = vehicleData[vehicleType];
    
    // Calculate price using base price, rate per km, and demand multiplier
    const price = (vehicle.basePrice + (vehicle.ratePerKm * distance)) * demandMultiplier;
    
    setEstimatedPrice(price.toFixed(2)); // Set estimated price with two decimal places
  };

  return (
    <div className="p-6 bg-gray-800 text-white rounded-md shadow-md w-96">
      <h2 className="text-2xl font-bold mb-4">Price Estimator</h2>
      
      <input
        type="text"
        placeholder="Pickup Location"
        value={pickupLocation}
        onChange={(e) => setPickupLocation(e.target.value)}
        className="mb-2 p-2 border rounded w-full bg-gray-700 text-white"
        required
      />
      
      <input
        type="text"
        placeholder="Dropoff Location"
        value={dropoffLocation}
        onChange={(e) => setDropoffLocation(e.target.value)}
        className="mb-2 p-2 border rounded w-full bg-gray-700 text-white"
        required
      />
      
      <select
        value={vehicleType}
        onChange={(e) => setVehicleType(e.target.value)}
        className="mb-2 p-2 border rounded w-full bg-gray-700 text-white"
      >
        <option value="car">Car</option>
        <option value="van">Van</option>
        <option value="truck">Truck</option>
      </select>
      
      <button
        onClick={handleEstimate}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Estimate Price
      </button>
      
      {estimatedPrice && (
        <p className="mt-4 text-xl">
          Estimated Price: <strong>${estimatedPrice}</strong>
        </p>
      )}
    </div>
  );
};

export default PriceEstimator;
