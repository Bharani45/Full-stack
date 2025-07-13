import jwt from "jsonwebtoken";

const adminauth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Token missing. Please login." });
    }

    token = token.split(" ")[1]; // ✅ Remove "Bearer " prefix

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Proper object check
    if (
      decoded.email !== process.env.ADMIN_EMAIL ||
      decoded.password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(403).json({ success: false, message: "Unauthorized access." });
    }

    next();
  } catch (error) {
    console.error("JWT Auth Error:", error.message);
    return res.status(401).json({ success: false, message: "Authentication failed" });
  }
};


export default adminauth;
