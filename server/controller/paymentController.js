const Razorpay = require("razorpay");

// Initialize Razorpay with your credentials
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Your Razorpay key id
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Your Razorpay key secret
});

// Create an order using Razorpay
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body; // Amount in rupees

    // Prepare order options for Razorpay
    const options = {
      amount: amount * 100, // Amount should be in paise
      currency: "INR",
      receipt: `receipt_${Math.floor(Math.random() * 1000)}`,
      notes: {
        key1: "value3",
        key2: "value2",
      },
    };

    // Create an order with Razorpay
    razorpayInstance.orders.create(options, (err, order) => {
      if (err) {
        return res.status(500).json({ message: "Error creating order", error: err });
      }
      return res.status(200).json(order); // Send order details to frontend
    });
  } catch (error) {
    console.error("Error in creating order:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
