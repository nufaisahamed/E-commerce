const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

const isLoggedIn = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Format: Bearer TOKEN

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    // Find the user associated with the token
    const user = await User.findById(decoded.userId).select("-password");
    
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    // Return user details (optionally, you can add additional fields like a refreshed token)
    return res.status(200).json({ success: true, user });
  } catch (error) {
    // Handle errors like expired or invalid token
    console.error("Token verification failed:", error);
    return res.status(401).json({ success: false, message: "Token expired or invalid" });
  }
};

module.exports = { isLoggedIn };
