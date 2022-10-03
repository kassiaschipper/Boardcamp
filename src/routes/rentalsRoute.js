import express from "express";
import {
  insertRentals,
  listRentals,
  finalizingRental,
  deleteRental
} from "../controllers/rentalsController.js";
import { rentalsValidation } from "../middlewares/rentalsMiddleware.js";

const router = express.Router();
router.get("/rentals", listRentals);
router.post("/rentals", rentalsValidation, insertRentals);
router.post("/rentals/:id/return", finalizingRental);
router.delete("/rentals/:id", deleteRental);

export default router;
