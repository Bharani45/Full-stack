import vendormodel from "../models/vendormodel.js";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const vendorregister = async (req, res) => {
  try {
    const { name, email, password, shopName } = req.body;

    const exists = await vendormodel.findOne({ email });
    if (exists) return res.json({ success: false, message: "Vendor already exists" });
    if(!validator.isEmail(email)){
        return res.json({success:false,message:"Enter a valid email"})
    }
    if(password.length<8){
        return res.json({success:false,message:"Generate strong password"})

    }
    const hashed = await bcrypt.hash(password, 10);
    const vendor = new vendormodel({
      name,
      email,
      password: hashed,
      shopName,
      status: 'pending'
    });

    await vendor.save();
    res.json({ success: true, message: "Vendor registered, pending approval" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const vendorlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const vendor = await vendormodel.findOne({ email });
    if (!vendor) {
      return res.status(400).json({ success: false, message: "Vendor does not exist" });
    }

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    if (vendor.status !== "approved") {
      return res.status(403).json({ success: false, message: "Vendor not approved by admin yet" });
    }

const token = jwt.sign(
  {
    id: vendor._id,
    email: vendor.email, // ✅ This is the fix
    role: "vendor",
  },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);


    res.json({
      success: true,
      message: "Login successful",
      token,
      vendor: {
        id: vendor._id,
        name: vendor.name,
        email: vendor.email,
        shopName: vendor.shopName,
      }
    });
  } catch (error) {
    console.error("Vendor login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getVendorsByStatus = async (req, res) => {
  const { status } = req.query;
  try {
    const vendors = await vendormodel.find({ status });
    res.json({ success: true, vendors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const approveVendor = async (req, res) => {
  const { vendorId } = req.body;
  try {
    await vendormodel.findByIdAndUpdate(vendorId, { status: "approved" });
    res.json({ success: true, message: "Vendor approved" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {vendorlogin,vendorregister,approveVendor,getVendorsByStatus}

