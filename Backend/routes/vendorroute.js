import exporess from "express"
import { vendorlogin,vendorregister,getVendorsByStatus,approveVendor } from "../controllers/vendorcontroller.js"
import express from "express"
const vendorrouter=express.Router();

vendorrouter.post('/register',vendorregister)
vendorrouter.post('/login',vendorlogin);
vendorrouter.get('/pending',getVendorsByStatus)
vendorrouter.post('/approve',approveVendor)
export default vendorrouter;