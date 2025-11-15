import express from "express";
import dotenv from "dotenv";
import Dbconnect from "./config/dbconnect.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./router/user.route.js";
import adminRouter from "./router/admin.route.js";
import bookRouter from "./router/Book.route.js";
import cartRouter from "./router/cart.route.js";
import orderRouter from "./router/order.route.js";
import addressRouter from "./router/address.route.js";

import path from "path";
import { fileURLToPath } from "url";

// Fix dirname (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

// CORS
const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use("/uploads", express.static("./backend/uploads"));

app.use(express.json());
app.use(cookieParser());

// API ROUTES
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/books", bookRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/address", addressRouter);

// ===========================
// 📌 FRONTEND SERVE FIXED PATH
// ===========================
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// DB + Server
Dbconnect();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
