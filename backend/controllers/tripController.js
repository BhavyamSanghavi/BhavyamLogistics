// controllers/tripController.js
const Trip = require('../models/Trip');

exports.getTripStatus = async (req, res) => {
    const { tripId } = req.params;
  
    try {
      const trip = await Trip.findById(tripId);
      
      if (!trip) {
        return res.status(404).json({ message: 'Trip not found' });
      }
  
      res.status(200).json({ status: trip.status });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching trip status', error });
    }
  };

  exports.getUserTrips = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const trips = await Trip.find({ customerId: userId }); // Assuming 'customer' is the field in Trip model
      res.status(200).json(trips);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user trips', error });
    }
  };

  // Backend route to fetch trip statistics
exports.getTripStatistics = async (req, res) => {
  try {
    const totalTrips = await Trip.countDocuments(); // Total number of trips
    const completedTrips = await Trip.countDocuments({ status: 'completed' }); // Completed trips
    const pendingTrips = await Trip.countDocuments({ status: 'pending' }); // Pending trips
    const totalRevenue = await Trip.aggregate([
      { $match: { status: 'completed' } }, // Only count revenue for completed trips
      { $group: { _id: null, total: { $sum: "$price" } } }
    ]);

    const tripsPerVehicle = await Trip.aggregate([
      { $group: { _id: "$vehicleType", count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      totalTrips,
      completedTrips,
      pendingTrips,
      totalRevenue: totalRevenue[0]?.total || 0, // Set to 0 if no revenue
      tripsPerVehicle
    });
  } catch (error) {
    console.error('Error fetching trip statistics:', error);
    res.status(500).json({ message: 'Error fetching statistics', error });
  }
};

// controllers/tripController.js
exports.createTrip = async (req, res) => {
    const { customerId, pickupLocation, dropoffLocation, vehicleType,price } = req.body;
  
    // Check if customerId is provided
    if (!customerId) {
      return res.status(400).json({ message: 'Customer ID is required' });
    }
  
    try {
      const newTrip = new Trip({
        customerId: customerId,
        pickupLocation,
        dropoffLocation,
        vehicleType,
        price, 
        status: 'pending',
      });
  
      await newTrip.save();
      res.status(201).json(newTrip);
    } catch (error) {
      res.status(500).json({ message: 'Error creating trip', error });
    }
  };
  

// Driver: Get available trips
exports.getAvailableTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ status: 'pending' }).populate('customerId');
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trips', error });
  }
};

// Driver: Confirm a trip
exports.confirmTrip = async (req, res) => {
    const { tripId } = req.params;
    
    const driverId = req.body.driverId;
    
    try {
      const trip = await Trip.findById(tripId);
  
      // Check if the trip is already confirmed or completed
      if (trip.status !== 'pending') {
        return res.status(400).json({ message: 'Trip already confirmed or completed' });
      }
  
      // Assign the driver and update the trip status to 'confirmed'
      trip.driverId = driverId;
      trip.status = 'confirmed';
  
      await trip.save();
      res.status(200).json(trip);
    } catch (error) {
      res.status(500).json({ message: 'Error confirming trip', error });
    }
  };
  

// Driver: Update trip status (en_route, collected, delivered)
exports.updateTripStatus = async (req, res) => {
  const { tripId } = req.params;
  const { status } = req.body;

  try {
    const trip = await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    if (!['pending','confirmed', 'en_route', 'collected', 'delivered'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    trip.status = status;
    await trip.save();

    res.status(200).json({ message: `Trip status updated to ${status}`, trip });
  } catch (error) {
    res.status(500).json({ message: 'Error updating trip status', error });
  }
};
