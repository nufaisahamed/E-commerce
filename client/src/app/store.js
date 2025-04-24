// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import wishlistReducer from '../features/WishSlice';

const store = configureStore({
  reducer: {
   
    wishlist: wishlistReducer,
    cart: cartReducer
  },
});

export default store;
