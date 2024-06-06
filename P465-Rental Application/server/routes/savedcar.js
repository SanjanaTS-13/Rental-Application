import express from 'express';
import {
  saveCar,
  updateSavedCar,
  deleteSavedCar,
  getSavedCar,
  getAllSavedCars,
} from '../controllers/savedCarController.js';
import { verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// CREATE
router.post("/api/savedCars", verifyUser, saveCar);

// UPDATE
router.put("/api/savedCars/:id", verifyUser, updateSavedCar);

// DELETE
router.delete("/api/savedCars/:id", verifyUser, deleteSavedCar);

// GET by ID
router.get("/api/savedCars/:id", verifyUser, getSavedCar);

// GET ALL
router.get("/api/savedCars", verifyUser, getAllSavedCars);

export default router;
