const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Adjust the path as necessary

// User signup route
router.post('/register', userController.registerUser);

// User login route
router.post('/login', userController.loginUser);

// Export the router
module.exports = router;
