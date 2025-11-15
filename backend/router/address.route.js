import express from "express";
import { addaddress } from "../controller/address.controller.js";
import { getaddress } from "../controller/address.controller.js";
import {AuthUser} from "../middleware/authuser.middleware.js";

const addressRouter = express.Router();

addressRouter.post("/add", AuthUser, addaddress);
addressRouter.get("/get",AuthUser, getaddress);

export default addressRouter;