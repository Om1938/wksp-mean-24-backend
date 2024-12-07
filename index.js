import { configDotenv } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { connectToDatabase } from "./src/config/db.js";

import authRoutes from "./src/routes/auth.routes.js";

configDotenv();

const app = express();
const port = process.env.PORT || 3000;

connectToDatabase();

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
