import mongoose from "mongoose";

const selectedCarSchema = new mongoose.Schema({
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
  brand: {
    type: String,
  },
  rating: {
    type: Number,
  },
  model: {
    type: String,
  },
  price: {
    type: Number,
  },
  speed: {
    type: Number,
  },
  gps: {
    type: String,
  },
  seatType: {
    type: String,
  },
  automatic: {
    type: String,
  },
  description: {
    type: String,
  },
});

export default mongoose.model("SelectedCar", selectedCarSchema);
