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

const app = express();
dotenv.config();

const allowedOrigins = ["http://localhost:5173"]  
app.use("/uploads", express.static("uploads"));
app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,  // correct lowercase
    })
  );
  



app.use(express.json());
app.use(cookieParser());


app.use("/api/user", userRouter);
app.use("/api/admin",adminRouter );
app.use("/api/books", bookRouter );
app.use("/api/cart", cartRouter );
app.use("/api/order", orderRouter );
app.use("/api/address", addressRouter );

Dbconnect();

app.listen(process.env.PORT, () => {
    console.log("Backend server is running on http://localhost:3000");
})
