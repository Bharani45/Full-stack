import usermodel from "../models/usermodel.js";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User does not exist" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    // Generate token
    const token = createtoken(user._id);
    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
const createtoken=(id)=>{
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

const registeruser=async(req,res)=>{
    try {
      
        const {name,email,password}=req.body;

        const exists=await usermodel.findOne({email});
        if(exists){
            return res.json({success:false,message:"user exists"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter a valid email"})

        }
        if(password.length<8){
            return res.json({success:false,message:"Generate strong password"})

        }
        const salt=await bcrypt.genSalt(10)
        const hasedp=await bcrypt.hash(password,salt)
        
        const newuser=new usermodel({
            name,
            email,
            password:hasedp
        })
        const user =await newuser.save();
        const token=createtoken(user._id)

        res.json({success:true,token})
    } catch (error) {
        console.log(error);

        res.json({success:false,message:error.message})
    }
}

// controllers/usercontroller.js
const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { email, password }, // ✅ sign an object
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      return res.json({ success: true, token });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Admin Login Error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export {loginuser,registeruser,adminlogin}