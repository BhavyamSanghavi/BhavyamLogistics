// routes/tripRoutes.js

const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

// Customer: Create a trip request
router.post('/', tripController.createTrip);

// Driver: Get available trips
router.get('/available', tripController.getAvailableTrips);

// Driver: Confirm a trip
router.post('/confirm/:tripId', tripController.confirmTrip);

// Driver: Update trip status (en_route, collected, delivered)
router.post('/status/:tripId', tripController.updateTripStatus);

// Customer: Get trip status
router.get('/status/:tripId', tripController.getTripStatus); //  for fetching trip status

router.get('/user/:userId', tripController.getUserTrips); 

router.get('/statistics', tripController.getTripStatistics); //  for fetching trip statistics
module.exports = router;
