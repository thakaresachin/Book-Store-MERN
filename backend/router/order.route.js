import express from "express";
import { getAllOrders, getUserOrder, placedorderCOD } from "../controller/order.controller.js";
import { AuthUser } from "../middleware/authuser.middleware.js";
import { AuthAdmin } from "../middleware/authAdmin.middleware.js";
const orderRouter = express.Router();

orderRouter.post("/cod",AuthUser,placedorderCOD);
orderRouter.get("/user",AuthUser,getUserOrder);
orderRouter.get("/admin",AuthAdmin,getAllOrders);



export default orderRouter;