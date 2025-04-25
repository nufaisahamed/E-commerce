const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

const isLoggedIn = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Format: Bearer TOKEN

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(401).json({ success: false, message: "Token expired or invalid" });
  }
};

module.exports = { isLoggedIn };
