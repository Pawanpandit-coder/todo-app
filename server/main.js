import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import todoRouter from "./routes/todoRoute.js";
import authRoute from "./routes/authRoute.js";
import dns from 'dns'
dns.setServers(['8.8.8.8', '1.1.1.1']);

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/todos", todoRouter);
app.use("/api/auth", authRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
