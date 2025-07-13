// middleware/vendorauth.js
import jwt from 'jsonwebtoken';

const vendorauth = (req, res, next) => {
  console.log("🛡️ vendorauth hit");

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    console.log("❌ No token provided");
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token decoded:", decoded);

    if (decoded.role !== 'vendor') {
      console.log("❌ Not a vendor:", decoded.role);
      return res.status(403).json({ success: false, message: "Forbidden: Not a vendor" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.log("❌ Token invalid:", err.message);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};


export default vendorauth;
