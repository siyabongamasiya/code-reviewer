import express from "express";
import dotenv from "dotenv";
import { testConnection } from "./config/database";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


const startServer = async () => {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
  });
};


startServer()