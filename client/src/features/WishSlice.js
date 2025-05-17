import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Array to store wishlist items
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const itemExists = state.items.some(item => item._id === action.payload._id);
      if (!itemExists) {
        state.items.push(action.payload); // Add item to wishlist if it doesn't already exist
      }
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
    },

    clearWishlist: (state) => {
      state.items = []; // Clear all items from wishlist
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
