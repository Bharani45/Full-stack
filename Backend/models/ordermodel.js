import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  quantity: Number,
  size: String,
  vendorEmail: String,
  status: {
    type: String,
    enum: ["Pending", "Placed", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending"
  }
}, { _id: false }); // disable _id for nested schema

const orderschema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: {
    type: Map,
    of: itemSchema,
    required: true
  },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: {
    type: String,
    enum: ["Pending", "Placed", "Processing", "Shipped", "Delivered", "Cancelled"], // ✅ Added "Pending" here too
    default: "Placed"
  },
  paymentmethod: {
    type: String,
    enum: ["COD", "Stripe", "Razorpay"],
    required: true
  },
  payment: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

// ✅ Force recompile model (important during development)
if (mongoose.models.order) {
  delete mongoose.models.order;
}

const ordermodel = mongoose.model('order', orderschema);
export default ordermodel;
