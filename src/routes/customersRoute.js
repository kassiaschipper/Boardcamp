import express from "express";
import { insertCustomer } from "../controllers/customersController.js";
import { customerValidation } from "../middlewares/customersMiddleware.js";

const router = express.Router();
//router.get("/customers", listCustomers);
router.post("/customers", customerValidation, insertCustomer)

export default router;