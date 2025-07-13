import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudnary.js';
import userrouter from './routes/userroute.js';
import productrouter from './routes/productroute.js';
import cartrouter from './routes/cartroute.js';
import orderrouter from './routes/orderroute.js';
import vendorrouter from './routes/vendorroute.js';
import vendorproductrouter from './routes/vendorproductsroute.js';
import vendororderrouter from './routes/vendororderroute.js';

const app=express();
const port=process.env.PORT || 4000
connectDB()
connectCloudinary()
app.use(express.json())
app.use(cors())
app.use('/api/user',userrouter)
app.use('/api/product',productrouter);
app.use('/api/cart',cartrouter)
app.use('/api/order',orderrouter)
app.use('/api/vendor',vendorrouter)
app.use('/api/vendorproduct',vendorproductrouter);
app.use('/api/vendororder',vendororderrouter);
app.get('/',(req,res)=>{
    res.send("api working")
})

app.listen(port,()=>console.log('server running on ${port}'))