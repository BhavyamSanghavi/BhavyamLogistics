// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['customer', 'driver'], // Restrict roles to 'customer' and 'driver'
    required: true,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
