import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.config.js";
import { BASE_URL, DB_NAME } from "./utils/constants.util.js";
import { dataRouter } from "./routes/data.routes.js";
import { MongoClient } from "mongodb";
import { customerRouter } from "./routes/customer.route.js";
import { salesRouter } from "./routes/sales.route.js";
import cors from "cors";

dotenv.config();
export const client = new MongoClient(`${process.env.MONGODB_URI}/${DB_NAME}`);

async function startServer() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  await connectDB(client);

  // Routes
  app.use(`${BASE_URL}/data`, dataRouter);
  app.use(`${BASE_URL}/customer`, customerRouter);
  app.use(`${BASE_URL}/sales`, salesRouter);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`app is listening at port : ${PORT}`);
  });
}

startServer();
