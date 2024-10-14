const express = require('express');
const router = express.Router();
const { getDriverLocation } = require('../controllers/trackingController');

// GET /api/track
router.get('/', getDriverLocation);

module.exports = router;
