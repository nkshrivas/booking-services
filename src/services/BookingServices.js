const { Seat, SeatPricing, Booking } = require('../models/Schema');
const mongoose = require('mongoose');


// Service to get all seats
async function getAllSeats() {
  try {
    const seats = await Seat.find().sort('seatClass');
    return seats;
  } catch (error) {
    throw new Error('Failed to fetch seats');
  }
}

// Service to get seat pricing based on seat class and booking percentage
async function getSeatPricing(seatClass, bookingPercentage) {
  try {
    const pricing = await SeatPricing.findOne({ seatClass });

    if (!pricing) {
      throw new Error('Seat pricing not found');
    }

    let price;

    if (bookingPercentage < 40) {
      price = pricing.minPrice || pricing.normalPrice;
    } else if (bookingPercentage >= 40 && bookingPercentage <= 60) {
      price = pricing.normalPrice || pricing.maxPrice;
    } else {
      price = pricing.maxPrice || pricing.normalPrice;
    }

    return price;
  } catch (error) {
    throw new Error('Failed to fetch seat pricing');
  }
}

// Service to create a booking
async function createBooking(seatIds, user, phoneNumber) {
  try {
    const seats = await Seat.find({ _id: { $in: seatIds } });


    if (seats.length !== seatIds.length) {
      throw new Error('Invalid seat selection');
    }
    const isAnySeatBooked = seats.some(seat => seat.isBooked);
console.log(isAnySeatBooked)

    if (isAnySeatBooked===true) {
      throw new Error('One or more selected seats are already booked');
    }

    const bookingPercentage = (seats.length / await Seat.countDocuments()) * 100;
    const price = await getSeatPricing(seats[0].seatClass, bookingPercentage);
    const totalAmount = seats.length * price;

    const booking = new Booking({
      _id: new mongoose.Types.ObjectId(),
      seats: seatIds,
      user,
      phoneNumber,
      totalAmount
    });

    await Promise.all(seats.map(seat => {
      seat.isBooked = true;
      return seat.save();
    }));

    await booking.save();

    return booking;
  } catch (error) {
    throw new Error(error);
  }
}

// Service to retrieve bookings by user identifier (email or phone number)
async function retrieveBookings(userIdentifier) {
  try {
    const bookings = await Booking.find({
      $or: [
        { user: userIdentifier },
        { phoneNumber: userIdentifier }
      ]
    });

    return bookings;
  } catch (error) {
    throw new Error('Failed to retrieve bookings');
  }
}

module.exports = {
  getAllSeats,
  getSeatPricing,
  createBooking,
  retrieveBookings
};
