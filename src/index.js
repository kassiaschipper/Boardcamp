import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());
//server.use(router);


server.get("/status", (req, res) => {
    return res.send("Ok");
}); 

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});