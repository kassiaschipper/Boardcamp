import express from "express";
import { listGames, insertGame } from "../controllers/gamesControllers.js";
import { gamesValidation } from "../middlewares/gamesMiddleware.js";

const router = express.Router();
router.get("/games", listGames);
router.post("/games", gamesValidation, insertGame)

export default router;