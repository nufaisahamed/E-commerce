const express = require("express")
const orderController = require("../controller/orderController");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();


router.get("/orders",verifyToken, orderController.getallOrders);
router.post("/orders",verifyToken, orderController.createOrder);
module.exports = router;