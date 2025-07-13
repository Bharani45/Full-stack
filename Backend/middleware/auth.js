import jwt from 'jsonwebtoken';

const authuser = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized. Please login." });
    }

    token = token.split(" ")[1]; // ✅ Remove "Bearer " prefix
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id; // ✅ Use a safe custom property
    next(); // ✅ Call next middleware
  } catch (error) {
    console.error("User JWT Auth Error:", error.message);
    return res.status(401).json({ success: false, message: "Authentication failed." });
  }
};

export default authuser;
