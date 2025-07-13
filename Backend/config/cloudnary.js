import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,       // ✅ fixed
    api_key: process.env.CLOUDINARY_API_KEY,       // ✅ fixed
    api_secret: process.env.CLOUDINARY_SECRET_KEY, // ✅ fixed
  });
};

export default connectCloudinary;
