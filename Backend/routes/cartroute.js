import express from "express";
import { addcart, updatecart, usercart } from "../controllers/cartcontroller.js";
import authuser from "../middleware/auth.js";

const cartrouter = express.Router();

cartrouter.post('/get', authuser, usercart); // ✅ FIXED: use GET instead of POST for fetching cart
cartrouter.post('/add', authuser, addcart);
cartrouter.post('/update', authuser, updatecart);

export default cartrouter;
