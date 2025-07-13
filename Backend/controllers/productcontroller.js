import {v2 as cloudinary} from "cloudinary";
import productmodel from "../models/productmodel.js"

const addproduct = async (req, res) => {
  try {
    const { name, description, price, category, subcategory, sizes, bestseller } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(Boolean);

    // Upload images to cloudinary
    const imagesurl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subcategory,
      bestseller: bestseller === "true" || bestseller === true, // handle string or boolean
      sizes: JSON.parse(sizes),
      image: imagesurl,
      date: Date.now(), // Mongoose will override this if schema default is used
    };

    const product = new productmodel(productData);
    await product.save();

    console.log("✅ Product saved:", product.name);

    return res.json({ success: true, message: "Product added successfully!" }); // ✅ FIXED
  } catch (error) {
    console.error("❌ Error adding product:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};


const listproduct=async(req,res)=>{
    try {
        const products=await productmodel.find({});
        res.json({success:true,products})
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

const removeproduct=async(req,res)=>{
    try {
        await productmodel.findByIdAndDelete(req.body.id)
        res.json({success:true,messgae:"product removed"});
    } catch (error) {
        res.json({message:false,message:error.message})
        
    }
}

const singleproduct=async(req,res)=>{
    try {
        const {productId}=req.body
        const product=await productmodel.findById(productId)
        res.json({success:true,product})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export {listproduct,addproduct,singleproduct,removeproduct}