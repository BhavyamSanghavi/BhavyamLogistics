const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Initialize express and configure environment variables
const app = express();
dotenv.config();  // Load environment variables here

const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message); // Log the error message
  });

// Importing routes
const priceRoutes = require('./routes/priceRoutes');
const trackingRoutes = require('./routes/trackingRoutes');
const userRoutes = require('./routes/userRoutes');
const tripRoutes = require('./routes/tripRoutes');

// Use the routes
app.use('/api/users', userRoutes);
app.use('/api/price', priceRoutes);
app.use('/api/track', trackingRoutes);
app.use('/api/trips', tripRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
