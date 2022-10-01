import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import categoriesRoute from "./routes/categoriesRoute.js"
import gamesRoute from "./routes/gamesRoute.js"
import customersRoute from "./routes/customersRoute.js"

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.use(categoriesRoute);
server.use(gamesRoute);
server.use(customersRoute);

server.get("/status", (req, res) => {
    return res.send("Ok");
}); 

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});