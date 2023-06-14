const SeatPricing = require('../models/seatPricing');

// Function to get the seat pricing based on seat class and booking percentage
const getSeatPricing = async (seatClass, bookingPercentage) => {
  const seatPricing = await SeatPricing.findOne({ seatClass });
  if (!seatPricing) {
    throw new Error('Seat pricing not found');
  }

  if (bookingPercentage < 40) {
    return seatPricing.minPrice;
  } else if (bookingPercentage >= 40 && bookingPercentage <= 60) {
    return seatPricing.normalPrice;
  } else {
    return seatPricing.maxPrice;
  }
};

module.exports = {
  getSeatPricing
};
