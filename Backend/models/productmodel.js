import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  image: { type: [String], required: true },
  category: { type: String, required: true, enum: ['Men', 'Women', 'Kids'] },
  subcategory: { type: String, required: true, enum: ['Topwear', 'Bottomwear', 'Winterwear'] },
  sizes: { type: [String], required: true },
  bestseller: { type: Boolean, default: false },
  vendorEmail: { type: String, required: false }, // ✅ Add this field
  // Alternatively: vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" }
  date: { type: Date, default: Date.now }
});


const productModel = mongoose.models.Product || mongoose.model("Product", productSchema);
export default productModel;

