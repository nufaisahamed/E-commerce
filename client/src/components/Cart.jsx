import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items);

  // Check if the user is authenticated
    const { user } = useSelector((state) => state.auth);
   const isAuthenticated = () => {
    if (!user) {
      toast.error("Please login to continue");
      navigate("/login");
      return false;
    }
    return true;
  };

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => {
    const cleanPrice =
      parseFloat(item.price?.toString().replace(/[^\d.]/g, "")) || 0;
    return acc + cleanPrice * item.quantity;
  }, 0);

  // Handle placing an order
  const handlePlaceOrder = () => {
    if (!isAuthenticated()) return; // Ensure user is authenticated
    toast.success("Redirecting to checkout...", { autoClose: 1000 });
    setTimeout(() => navigate("/checkout"), 1200);
  };

  // Handle quantity changes
  const handleQuantityChange = (itemId, newQuantityStr) => {
    if (!isAuthenticated()) return; // Ensure user is authenticated

    const newQuantity = parseInt(newQuantityStr, 10);
    if (isNaN(newQuantity) || newQuantity < 0) return;

    const currentItem = cart.find((item) => item._id === itemId);
    if (!currentItem) return;

    if (newQuantity > currentItem.quantity) {
      dispatch(addToCart({ ...currentItem, quantity: newQuantity - currentItem.quantity }));
      toast.info("Increased item quantity");
    } else if (newQuantity < currentItem.quantity) {
      dispatch(removeFromCart({ ...currentItem, quantity: currentItem.quantity - newQuantity }));
      toast.warn("Decreased item quantity");
    }
  };

  // Handle removing an item
  const handleRemoveItem = (itemId) => {
    if (!isAuthenticated()) return; // Ensure user is authenticated

    const item = cart.find((item) => item._id === itemId);
    if (!item) return;

    dispatch(removeFromCart(item));
    toast.error("Item removed from cart");
  };

  // Render empty cart message
  if (cart.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-gray-500 text-xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty cart"
            className="w-32 h-32 mx-auto mb-4 opacity-70"
          />
          <p>Your cart is empty!</p>
        </motion.div>
      </div>
    );
  }

  // Render cart items
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">
        🛒 Your Cart
      </h2>

      <div className="space-y-6">
        <AnimatePresence>
          {cart.map((item) => {
            const cleanPrice =
              parseFloat(item.price?.toString().replace(/[^\d.]/g, "")) || 0;
            const subtotal = cleanPrice * item.quantity;

            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="flex justify-between items-center border p-4 rounded-xl shadow bg-white hover:shadow-md transition"
              >
                <div className="flex items-center gap-4 w-full">
                  <img
                    className="h-24 w-24 object-cover rounded-lg"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-700">
                      {item.name}
                    </h3>
                    <p className="text-gray-500">
                      ₹{cleanPrice} x {item.quantity}
                    </p>
                    <p className="text-gray-600 font-medium">
                      Subtotal: ₹{subtotal.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
                      disabled={item.quantity === 0}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item._id, e.target.value)
                      }
                      min="0"
                      className="w-14 text-center border border-gray-300 rounded"
                    />
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="text-red-500 hover:text-red-700 underline text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-10 flex justify-between items-center">
        <h3 className="text-3xl font-bold text-gray-800">
          Total: ₹{totalPrice.toFixed(2)}
        </h3>

        <motion.button
          onClick={handlePlaceOrder}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow transition duration-200"
        >
          ✅ Place Order
        </motion.button>
      </div>
    </div>
  );
};

export default Cart;