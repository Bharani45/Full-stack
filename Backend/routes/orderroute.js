import express from "express";
import {
  placeordercod,
  placeorderrazrop,
  placeorderstripe,
  updatestatus,
  allorder,
  userorders,
  verifystripe,
} from "../controllers/ordercontroller.js";
import adminauth from "../middleware/adminauth.js";
import authuser from "../middleware/auth.js";

const orderrouter = express.Router();

// Admin Routes
orderrouter.post('/list', adminauth, allorder);
orderrouter.post('/status', adminauth, updatestatus);

// User Routes
orderrouter.post('/place', authuser, placeordercod);
orderrouter.post('/stripe', authuser, placeorderstripe);
orderrouter.post('/razor', authuser, placeorderrazrop);  // was mistakenly calling placeorderstripe again
orderrouter.post("/userorders", authuser, userorders); // ✅ fixed spelling

orderrouter.post('/verifystripe',authuser,verifystripe);
export default orderrouter;
