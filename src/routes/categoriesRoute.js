import express from "express";
import { listCategories, insertCategories } from "../controllers/categoriesController.js";

const router = express.Router();
router.get("/categories", listCategories);
router.post("/categories", insertCategories)

export default router;