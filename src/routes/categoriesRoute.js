import express from "express";
import { listCategories, insertCategories } from "../controllers/categoriesController.js";
import { categoriesNameValidation } from "../middlewares/categoriesMiddleware.js";

const router = express.Router();
router.get("/categories", listCategories);
router.post("/categories",categoriesNameValidation, insertCategories)

export default router;