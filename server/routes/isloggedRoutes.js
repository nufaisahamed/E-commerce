const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../controller/isloggedController");

router.get("/isLoggedIn", isLoggedIn);

module.exports = router;
