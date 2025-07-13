import productmodel from '../models/productmodel.js';
import cloudinary from 'cloudinary';


const vendoradd = async (req, res) => {
  try {
    const { name, description, category, subcategory, price, sizes, bestseller, vendorEmail } = req.body;

    if (!vendorEmail) {
      return res.status(400).json({ success: false, message: "Vendor email is required" });
    }

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(Boolean);
    const imagesurl = images.map(img => img.path); // ✅ Already uploaded via multer-storage-cloudinary

    const newProduct = new productmodel({
      name,
      description,
      category,
      subcategory,
      price: Number(price),
      bestseller: bestseller === "true" || bestseller === true,
      sizes: JSON.parse(sizes),
      image: imagesurl,
      vendorEmail,
    });

    await newProduct.save();
    res.json({ success: true, message: "Product added" });

  } catch (err) {
    console.error("❌ Error adding product:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const vendorremove = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const product = await productmodel.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Optional: check if the logged-in vendor owns this product
    if (product.vendorEmail !== req.user.email) {
      return res.status(403).json({ success: false, message: "Unauthorized to delete this product" });
    }

    // Optional: delete associated images from Cloudinary
    // Uncomment below if you're storing public_ids and want to clean up Cloudinary
    /*
    for (const imageUrl of product.image) {
      const publicId = extractPublicIdFromUrl(imageUrl); // You must write this helper
      await cloudinary.v2.uploader.destroy(publicId);
    }
    */

    await productmodel.findByIdAndDelete(id);

    res.json({ success: true, message: "Product removed successfully" });
  } catch (err) {
    console.error("❌ Error deleting product:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const vendoritemlist = async (req, res) => {
  try {
    const vendorEmail = req.user.email;
    if (!vendorEmail) {
      return res.status(400).json({ success: false, message: "Vendor email missing in token" });
    }

    const products = await productmodel.find({ vendorEmail });
    res.json({ success: true, products });
  } catch (err) {
    console.error("Error in vendoritemlist:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export { vendoradd, vendoritemlist, vendorremove };
