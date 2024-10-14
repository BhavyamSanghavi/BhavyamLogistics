// Real-Time Tracking Controller
exports.getDriverLocation = (req, res) => {
    // Simulate random latitude and longitude coordinates
    const lat = (Math.random() * 180 - 90).toFixed(6);  // Random latitude between -90 and 90
    const lng = (Math.random() * 360 - 180).toFixed(6); // Random longitude between -180 and 180
  
    // Return the driver location as an object
    res.json({ location: { lat, lng } });
  };
  