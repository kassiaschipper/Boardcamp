import express from "express";
import { listCustomers, insertCustomer, listCustomersById, updateCustomerInfo} from "../controllers/customersController.js";
import { customerValidation } from "../middlewares/customersMiddleware.js";

const router = express.Router();
router.post("/customers", customerValidation, insertCustomer)
router.get("/customers", listCustomers);
router.get("/customers/:id", listCustomersById);
router.put("/customers/:id",customerValidation, updateCustomerInfo)

export default router;