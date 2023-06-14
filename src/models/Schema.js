const mongoose = require('mongoose');

// Define the Seat schema
const seatSchema = new mongoose.Schema({
  _id:mongoose.ObjectId,
  seatNumber: {
    type: String,
    required: true
  },
  seatClass: {
    type: String,
    required: true
  },
  isBooked: {
    type: Boolean,
    default: false
  }
});

// Define the SeatPricing schema
const seatPricingSchema = new mongoose.Schema({
  _id:mongoose.ObjectId,
  seatClass: {
    type: String,
    required: true,
    unique: true
  },
  minPrice: {
    type: Number,
    
  },
  maxPrice: {
    type: Number,
    
  },
  normalPrice: {
    type: Number,
    required: true
  }
});

// Define the Booking schema
const bookingSchema = new mongoose.Schema({
  _id:mongoose.ObjectId,
  seats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seat'
  }],
  user: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Define the models based on the schemas
const Seat = mongoose.model('Seat', seatSchema);
const SeatPricing = mongoose.model('SeatPricing', seatPricingSchema);
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = {
  Seat,
  SeatPricing,
  Booking
};
