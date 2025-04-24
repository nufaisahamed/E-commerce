import React, { useEffect } from "react";
import axiosInstance from "../config/axiosConfig";

const Checkout = () => {
  
  
  useEffect(() => {
    const initiatePayment = async () => {
      try {
        // Call backend to create an order
        
        const { data: order } = await axiosInstance.post("/create-order", {
          amount: 1500, // ₹5.00 in paise
        });

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Access from .env
          amount: order.amount, // Use amount from backend response
          currency: "INR",
          name: "NUFU Shopping", // Match your brand
          description: "Order Payment",
          order_id: order.id, // Order ID from backend
          handler: function (response) {
            alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
            console.log(response);
            // Optionally verify payment by sending response to /verify-payment endpoint
            axiosInstance.post("/verify-payment", response);
          },
          prefill: {
            name: "Nufais Ahamed", // Replace with dynamic user data if available
            email: "nufais@example.com", // Replace with dynamic user data
            contact: "9000000000", // Replace with dynamic user data
          },
          theme: {
            color: "#3399cc",
          },
        };

        // Load Razorpay script and initialize checkout
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => {
          const rzp = new window.Razorpay(options);
          rzp.open();
        };
        document.body.appendChild(script);

        // Cleanup
        return () => document.body.removeChild(script);
      } catch (error) {
        console.error("Payment Error:", error);
      }
    };

    initiatePayment();
  }, []);

  return (
    <div>
      {/* <h1>Checkout</h1>
      <p>Proceed with the payment.</p>
      <button onClick={() => window.location.reload()}>Retry Payment</button> Optional retry */}
    </div>
  );
};

export default Checkout;