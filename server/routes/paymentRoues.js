const express = require("express");
const { createOrder } = require("../controller/paymentController");
const router = express.Router();

router.post("/create-order", createOrder);

module.exports = router;
