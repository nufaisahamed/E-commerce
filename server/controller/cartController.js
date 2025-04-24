const Cart = require("../models/cartModels");

// Add item to cart
exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.productId == productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }

      await cart.save();
      res.json({ message: "Cart updated", cart });
    } else {
      const newCart = await Cart.create({
        userId,
        items: [{ productId, quantity }],
      });
      res.json({ message: "Cart created", cart: newCart });
    }
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
};

// Get cart for user
exports.getCartByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart", error: err.message });
  }
};


module.exports.getCart = async (req, res) => {
    try {
      const { userId } = req.params; // Get userId from request parameters
      
      // Check if userId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
  
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching cart", error: error.message });
    }
  };
