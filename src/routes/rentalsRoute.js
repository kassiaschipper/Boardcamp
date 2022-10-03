import express from "express";
import {insertRentals } from "../controllers/rentalsController.js";
import { rentalsValidation } from "../middlewares/rentalsMiddleware.js";

const router = express.Router();
//router.get("/rentals", listRentals);
router.post("/rentals",rentalsValidation, insertRentals)

export default router;