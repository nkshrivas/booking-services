const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const { Seat, SeatPricing } = require('../src/models/Schema');

async function uploadDataFromCSV(csvFilePath, model) {
  try {
    // Database connection
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to the database');

    // Read the CSV file
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', async (row) => {
        if (model === 'Seat') {
          // Map snake_case column names to corresponding fields in the Seat model
          const seat = new Seat({
            _id: new mongoose.Types.ObjectId(),
            seatNumber: row.seat_identifier,
            seatClass: row.seat_class,
            isBooked: false,
          });

          // Save the Seat document to the database
          try {
            await seat.save();
          } catch (err) {
            console.error('Error saving seat:', err);
          }
        } else if (model === 'SeatPricing') {
          // Map snake_case column names to corresponding fields in the SeatPricing model
          const seatPricing = new SeatPricing({
            _id: new mongoose.Types.ObjectId(),
            seatClass: row.seat_class,
            isBooked: false,
            minPrice: row.min_price ? parseFloat(row.min_price.replace('$', '')) : null,
            normalPrice: row.normal_price ? parseFloat(row.normal_price.replace('$', '')) : null,
            maxPrice: row.max_price ? parseFloat(row.max_price.replace('$', '')) : null,
          });

          // Save the SeatPricing document to the database
          try {
            await seatPricing.save();
          } catch (err) {
            console.error('Error saving seat pricing:', err);
          }
        }
      })
      .on('end', () => {
        console.log('Data upload completed');
        
      });
  } catch (err) {
    console.error('Error uploading data:', err);
  }
}

// // Usage example:
// uploadDataFromCSV('./public/data/Seats.csv', 'Seat');
// uploadDataFromCSV('./public/data/SeatsPricing.csv', 'SeatPricing');
