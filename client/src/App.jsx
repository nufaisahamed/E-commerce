import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import SignupPage from "./pages/Signup";
import FileUpload from "./pages/fileUpload";
import Hero from "./components/Hero";
import About from "./pages/About";
import Header from "./components/Header";
import BeautyPage from "./pages/Beauty";
import Explore from "./pages/Explore";
import Cart from "./components/Cart";
import Wishlist from "./components/wishList";
import Checkout from "./components/Checkout";

import UserLayout from "./layouts/UserLayout";

const App = () => {
  return (
    <div>
      <Toaster position="bottom-left" reverseOrder={true} />

      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Hero />} />
          <Route path="/file" element={<FileUpload />} />
          <Route path="/Explore" element={<Explore />} />
          <Route path="/product/:id" element={<About />} />
          <Route path="/Beauty" element={<BeautyPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </div>
  );
};

export default App;
