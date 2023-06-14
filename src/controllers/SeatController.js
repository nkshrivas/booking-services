const Seat = require('../models/Schema');
const SeatPricing = require('./models/Schema');
const Booking = require('./models/Schema');

// Controller to get all seats
const getAllSeats = async (req, res) => {
  try {
    const seats = await Seat.find().sort({ seatClass: 1 });
    res.json(seats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get seat pricing based on seat class and booking percentage
const getSeatPricing = async (req, res) => {
  try {
    const { id } = req.params;
    const seat = await Seat.findById(id);
    if (!seat) {
      return res.status(404).json({ error: 'Seat not found' });
    }

    const bookingPercentage = (await Booking.countDocuments()) / (await Seat.countDocuments()) * 100;
    const price = await SeatPricing.getSeatPricing(seat.seatClass, bookingPercentage);

    res.json({ seat, price });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to create a booking
const createBooking = async (req, res) => {
  try {
    const { seatIds, user, phoneNumber } = req.body;

    // Check if seats are available and not already booked
    const bookedSeats = await Booking.find({ seat: { $in: seatIds } }).distinct('seat');
    const availableSeats = seatIds.filter((seatId) => !bookedSeats.includes(seatId));
    if (availableSeats.length !== seatIds.length) {
      return res.status(400).json({ error: 'Some seats are already booked' });
    }

    // Create the booking
    const booking = new Booking({ seats: seatIds, user, phoneNumber });
    await booking.save();

    res.json({ booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to retrieve bookings by user identifier (email or phone number)
const retrieveBookings = async (req, res) => {
  try {
    const { userIdentifier } = req.query;

    if (!userIdentifier) {
      return res.status(400).json({ error: 'User identifier not provided' });
    }

    const bookings = await Booking.find({ $or: [{ user: userIdentifier }, { phoneNumber: userIdentifier }] });
    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllSeats,
  getSeatPricing,
  createBooking,
  retrieveBookings
};
