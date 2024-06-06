import SavedCar from "../schemas/savedcar.js";

export const saveCar = async (req, res, next) => {
  try {
    const { user, carDetails, startDate, endDate, startTime, endTime, price } = req.body;

    // Create a new instance of the SavedCar model
    const savedCar = new SavedCar({
      user,
      carDetails,
      startDate,
      endDate,
      startTime,
      endTime,
      price,
    });

    // Save the data to the database
    const savedCarResult = await savedCar.save();

    res.status(201).json({ success: true, data: savedCarResult });
  } catch (err) {
    next(err);
  }
};

export const updateSavedCar = async (req, res, next) => {
  try {
    const updatedSavedCar = await SavedCar.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedSavedCar);
  } catch (err) {
    next(err);
  }
};

export const deleteSavedCar = async (req, res, next) => {
  try {
    await SavedCar.findByIdAndDelete(req.params.id);
    res.status(200).json("SavedCar has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getSavedCar = async (req, res, next) => {
  try {
    const savedCar = await SavedCar.findById(req.params.id);
    res.status(200).json(savedCar);
  } catch (err) {
    next(err);
  }
};

export const getAllSavedCars = async (req, res, next) => {
  try {
    const savedCars = await SavedCar.find();
    res.status(200).json(savedCars);
  } catch (err) {
    next(err);
  }
};
