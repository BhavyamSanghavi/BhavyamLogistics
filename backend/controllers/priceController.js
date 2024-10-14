// Price Estimation Controller
exports.estimatePrice = (req, res) => {
    const { pickup, dropoff, vehicle } = req.body;
    
    // Simulate random distance for demo purposes
    const distance = Math.random() * 100;
  
    // Pricing logic based on vehicle type
    const pricePerKm = vehicle === 'car' ? 2 : 3;
    const price = distance * pricePerKm;
  
    // Return the calculated price
    res.json({ price: price.toFixed(2) });
  };
  