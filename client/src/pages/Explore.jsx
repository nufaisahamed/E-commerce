import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosConfig";
import { Search } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { addToWishlist, removeFromWishlist } from "../features/WishSlice";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import About from "./About";
import Cookies from "js-cookie";

const Explore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlist = useSelector((state) => state.wishlist.items);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const location = useLocation();

  // Auth check function
  const handleAuth = () => {
    const token = Cookies.get("authToken");
    if (!token) {
      toast.error("Please login to continue");
      navigate("/login");
      return false;
    }
    return true;
  };

  // Add to cart handler
  const handleAddToCart = (product) => {
    if (!handleAuth()) return;
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`);
    navigate("/Cart")
    console.log(handleAddToCart);

  };
  console.log(handleAddToCart);

  // Wishlist toggle
  const handleWishlistToggle = (product) => {
    const isWishlisted = wishlist.some((item) => item._id === product._id);
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
    toast.success("Wishlist updated!");
  };

  // Wishlist check
  const isInWishlist = (id) => wishlist.some((item) => item._id === id);

  // Category from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    setCategory(categoryParam || "All");
  }, [location.search]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/products");
        setProducts(response.data.products);
        console.log(response);
        setError(null);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);


  // Category options
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Filtered list
  const filteredProduct = products.filter((product) => {
    const matchCategory = category === "All" || category === product.category;
    const matchSearch = product.name.toLowerCase().includes(query.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Loading/Error States
  if (loading) return <div className="flex justify-center items-center h-screen">Loading products...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (filteredProduct.length === 0) return <div className="text-gray-500 text-center p-4">No products found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <select
        onChange={(e) => setCategory(e.target.value)}
        className="border outline-none rounded-full px-3 py-1 mt-2 absolute right-26"
        value={category}
      >
        {categories.map((cat, i) => (
          <option key={i} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <h1 className="text-3xl font-bold mb-8 text-gray-800 mt-3">
        Explore Products
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-3">
        {filteredProduct.map((product) => (
          <div
            key={product._id}
            onClick={() => setSelectedProductId(product._id)}
            className="relative bg-green-200 rounded-lg shadow-md overflow-hidden group cursor-pointer"
          >
            <div className="overflow-hidden h-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:opacity-30 transition-opacity duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-white flex flex-col justify-center items-center p-4 opacity-0 group-hover:opacity-70 transition-opacity duration-300">
              <div className="absolute right-6 top-6 rounded px-0.5 flex items-center border bg-red-700 text-white">
                New
              </div>
              <h2 className="text-2xl font-bold mb-2 text-black">{product.name}</h2>
              <p className="text-fuchsia-800 mb-4 text-center">{product.description}</p>
              <span className="text-rose-800">{product.category}</span>
              <div className="flex flex-col gap-2 justify-center items-center w-full">
                <span className="text-xl font-bold text-green-600">₹{product.price}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="bg-blue-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-colors duration-200"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWishlistToggle(product);
                    }}
                  >
                    <FaHeart
                      size={22}
                      className={`transition-all duration-300 ${
                        isInWishlist(product._id) ? "text-red-600" : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Modal */}
      {selectedProductId && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="w-full max-w-5xl rounded-lg relative max-h-[90vh] overflo-hidden">
            <button
              onClick={() => setSelectedProductId(null)}
              className="absolute top-2 right-2 z-50 bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              ✕
            </button>
            <About productId={selectedProductId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;
