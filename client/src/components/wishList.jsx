import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../features/WishSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { addToCart } from "../features/cartSlice";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);

  const handleAuth = () => {
    const token = Cookies.get("authToken");
    if (!token) {
      toast.error("Please login to continue");
      Navigate("/login");
      return false;
    }
    return true;
  };

  // Add to cart handler
  const handleAddToCart = (product) => {
    if (!handleAuth()) return;
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`);
    navigate("/Cart");
    
  };

  if (wishlist.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-xl">
        Your wishlist is empty!
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Your Wishlist
      </h2>

      <div className="space-y-6">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center border p-4 rounded-lg shadow-sm bg-white"
          >
            <div className="flex items-center gap-4">
              <img
                className="h-24 w-24 object-cover rounded"
                src={item.image}
                alt={item.name}
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-700">
                  {item.name}
                </h3>
                <p className="text-gray-500">{item.price}</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => {
                  handleAddToCart(item);
                  // toast.success(`${item.name} added to cart`)
                  toast(`${item.name} Added to Cart`, {
                    icon: "🛒",
                    style: {
                      borderRadius: "10px",
                      background: "#333",
                      color: "#fff",
                    },
                  });
                }}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Add to Cart
              </button>

              <button
                onClick={() => {
                  dispatch(removeFromWishlist(item._id));
                  toast(`${item.name} Removed`, {
                    icon: "🗑️",
                    style: {
                      borderRadius: "10px",
                      background: "#333",
                      color: "#fff",
                    },
                  });
                }}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
