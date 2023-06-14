const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes/BookingRoutes');
mongoose.set('strictQuery', false);
const dotenv=require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI ;
// const seatPath = require('./public/data/Seats.csv');
// const seatPricingPath = require('./public/data/SeatsPricing.csv');
const uploadDataFromCSV = require('./config/csvReader');

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

//   uploadDataFromCSV(seatPath);
// uploadDataFromCSV(seatPricingPath);
// Middleware
app.use(express.json());

// Routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});
