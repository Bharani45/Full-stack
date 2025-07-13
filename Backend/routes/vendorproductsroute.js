import express from 'express';
import { vendoradd,vendoritemlist,vendorremove } from '../controllers/vendorproductcontroller.js';
import upload from '../middleware/multer.js';
import vendorauth from '../middleware/vendorauth.js';
const vendorproductrouter=express.Router();

vendorproductrouter.post('/add',vendorauth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),vendoradd);
vendorproductrouter.post('/remove',vendorauth,vendorremove)
vendorproductrouter.get('/list',vendorauth,vendoritemlist);

export default vendorproductrouter;