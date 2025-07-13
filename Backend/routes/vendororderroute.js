import express from 'express'
import { vendororders,vendorupdatestatus } from '../controllers/vendororder.js';
import vendorauth from '../middleware/vendorauth.js';
const vendororderrouter=express.Router();

vendororderrouter.post('/order',vendorauth,vendororders);
vendororderrouter.post('/update',vendorauth,vendorupdatestatus);
vendororderrouter.get('/ping', (req, res) => {
  res.send('Vendor order route working');
});

export default vendororderrouter;