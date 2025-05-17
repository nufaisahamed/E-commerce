// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import wishlistReducer from "../features/WishSlice";
import authReducer from "../features/authSlice";

const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

export default store;
