const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // make sure you have a Product model
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [cartItemSchema],
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
