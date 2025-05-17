const express = require("express");
const authController = require("../controller/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.delete("/logout", authController.logout);
router.get("/me", verifyToken, authController.me);
module.exports = router;
