const Product = require("../models/productModels");
const product = require("../models/productModels");

// get all products
module.exports.getAllproducts = async (req, res) => {
  try {
    const products = await product.find();
    res.status(200).json({ message: "success", products });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "failed to get all products", error: error.message });
  }
};

//get product by ID
module.exports.getProductById = async (req, res) => {
  const { id } = req.params; // Getting product ID from the request params
  try {
    const product = await Product.findById(id); // Replace with your model fetching logic
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// create a product
module.exports.createProduct = async (req, res) => {
  try {
    const productDetails = req.body;
    const newProduct = await product(productDetails);
    await newProduct.save();
    res.status(200).json({ message: "success", newProduct });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "failed to create product", error: error.message });
  }
};

//update a product
module.exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { Product_name, category, price, inStock } = req.body;
    const products = await product.findOne({ _id: productId });
    products.Product_name = Product_name ? Product_name : products.Product_name;
    products.category = category ? category : products.category;
    products.price = price ? price : products.price;
    products.inStock = inStock ? inStock : products.inStock;
    const updateProduct = await products.save();
    res.status(200).json({message:"success",updateProduct})
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "failed to update product", error: error.message });
  }
};

//delete a product
module.exports.deleteProduct = async (req,res)=>{
    try {
        const {productId}=req.params;
        const products = await product.findByIdAndDelete(productId)
      if(!products){
        res.status(404).json({message:"product not found"})
      }
      res.status(200).json({message:"product deleted"})
        
    } catch (error) {
       console.log(error);
       res.status(500).json({message:"failed to delete product",error:error.message}) 
    }
}
