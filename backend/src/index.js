import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import { scheduledTasks } from "./lib/scheduledTasks.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import productRoutes from "./routes/product.route.js";
import requestRoutes from "./routes/productRequest.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

// Updated CORS configuration
app.use(
  cors({
    origin: "http://127.0.0.1:5000", // Explicitly allow this origin
    credentials: true, // Allow credentials (cookies)
  })
);

// Handle preflight requests
app.options('*', cors());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/request", requestRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT);
  connectDB();

  // Schedule a task to run every minute
  scheduledTasks();
});