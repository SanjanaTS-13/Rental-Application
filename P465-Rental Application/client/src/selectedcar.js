import mongoose from "mongoose";
const selectedCarSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  carDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
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
});

// const SelectedCar = mongoose.model('SelectedCar', selectedCarSchema);
// module.exports = SelectedCar;
export default mongoose.model("SelectedCar", selectedCarSchema);
