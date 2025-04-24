const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");

router.post("/cart", cartController.addToCart);
router.get("/:userId", cartController.getCartByUser);

module.exports = router;
