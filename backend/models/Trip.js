const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  driverId: { type: Schema.Types.ObjectId, ref: 'User' }, // Driver assigned
  pickupLocation: { type: String, required: true },
  dropoffLocation: { type: String, required: true },
  vehicleType: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ['pending','confirmed', 'en_route', 'collected', 'delivered'], default: 'pending' }, // Status tracking
});

module.exports = mongoose.model('Trip', tripSchema);
