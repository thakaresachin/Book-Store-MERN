import express from "express";
import {AuthUser}  from "../middleware/authuser.middleware.js";
import { UpdateCart } from "../controller/cart.controller.js";


const cartRouter = express.Router();

cartRouter.get("/",AuthUser,UpdateCart);

export default cartRouter;