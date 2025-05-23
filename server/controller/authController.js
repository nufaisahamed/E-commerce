
const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Check required fields
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if user exists
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(409).json({ message: "User already exists!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // If profile picture is provided, handle it
    const profilePicture = req.file ? "/uploads/" + req.file.filename : ""; // Assuming file is uploaded with multer

    // Create new user
    const newUser = await User.create({
      fullname,
      email,
      password,
      profilePicture, // Save profile picture path in DB
    });

    res.status(201).json({
      message: "Registration success!",
      newUser: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePicture: newUser.profilePicture, // Include profile picture URL
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res
      .status(500)
      .json({ message: "Registration failed!", error: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the token in the cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,  // Use true in production
      sameSite: "none",
      maxAge: 1000 * 60 * 60, // 1 hour
    });

    res.status(200).json({
      message: "Login success",
      token,
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed!", error: error.message });
  }
};

module.exports.logout = async (req, res) => {
  console.log("from logout");
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "error", error: error.message });
  }
};


module.exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "error", error: error.message });
  }
};
