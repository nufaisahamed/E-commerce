const express = require("express")
const productController = require("../controller/productController");
const { verifyRole, verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();


router.get("/products", productController.getAllproducts);
router.get("/products/:id", productController.getProductById);
router.post("/products",verifyRole, verifyToken, productController.createProduct);
router.put("/products/:productId",verifyRole,verifyToken,productController.updateProduct);
router.delete("/products/:productId", verifyRole,verifyToken,productController.deleteProduct);


module.exports=router;