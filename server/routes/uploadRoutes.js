const express = require("express");
const router = express.Router();
const uploadController = require("../controller/uploadController");
const upload = require("../middleware/multer");

router.post("/upload", upload.single("file"), uploadController.upload);

module.exports = router;