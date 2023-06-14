const express = require('express');
const {
  getAllSeats,
  getSeatPricing,
  createBooking,
  retrieveBookings
} = require('../services/BookingServices');
const { Seat } = require('../models/Schema');

const router = express.Router();

// Route to get all seats
router.get('/seats', async (req, res) => {
  try {
    const seats = await getAllSeats();
    res.json(seats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get seat pricing based on seat class and booking percentage
router.get('/seatsPricing/', async (req, res) => {
  try {
    const { _id } = req.query;
    const seat = await Seat.findById(_id);
    console.log("uygf",_id)
    if (!seat) {
      return res.status(404).json({ error: 'Seat not found' });
    }

    const bookingPercentage = (await Booking.countDocuments()) / (await Seat.countDocuments()) * 100;
    console.log(bookingPercentage)
    const price = await getSeatPricing(seat.seatClass, bookingPercentage);

    res.json({ seat, price });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to create a booking
router.post('/booking', async (req, res) => {
  try {
    const { seatIds, user, phoneNumber } = req.body;

    const booking = await createBooking(seatIds, user, phoneNumber);

    res.json({ booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to retrieve bookings by user identifier (email or phone number)
router.get('/bookings', async (req, res) => {
  try {
    const { userIdentifier } = req.query;

    if (!userIdentifier) {
      return res.status(400).json({ error: 'User identifier not provided' });
    }

    const bookings = await retrieveBookings(userIdentifier);

    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
