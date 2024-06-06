import mongoose from "mongoose";
const mongoose = require('mongoose');

// Define the SavedCar schema
const savedCarSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  carDetails: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// Create a model for the SavedCar schema
const SavedCar = mongoose.model('SavedCar', savedCarSchema);

module.exports = SavedCar;
