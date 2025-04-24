
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const cartRoutes = require("./routes/cartRoutes");
const createOrder = require("./routes/paymentRoues");
const cookieParser = require("cookie-parser");
const { upload } = require("./controller/uploadController");
const adminRoutes = require('./routes/adminRoutes');



app.use(
  cors({
    origin: "https://e-commerce-beryl-seven-27.vercel.app", // your frontend URL
    credentials: true, // this allows cookies to be sent/received
  })
);
app.use(express.json());
app.use(express.static("./uploads"));
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
connectDB();


app.use(productRoutes);
app.use(authRoutes);
app.use(orderRoutes);
app.use(uploadRoutes);
app.use(cartRoutes);
app.use(createOrder);
app.use( adminRoutes);


app.listen(process.env.PORT, () => {
  console.log("server is connectd");
});
