const express = require('express');
const router = express.Router();
const { estimatePrice } = require('../controllers/priceController');

// POST /api/price
router.post('/', estimatePrice);

module.exports = router;
