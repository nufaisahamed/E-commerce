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

  const { user } = useSelector((state) => state.auth);

  const handleAuth = () => {
    if (!user) {
      toast.error("Please login to continue");
      navigate("/login");
      return false;
    }
    return true;
  };

  const handleAddToCart = (product) => {
    if (!handleAuth()) return;
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`);
    navigate("/Cart");
  };

  const handleWishlistToggle = (product) => {
    const isWishlisted = wishlist.some((item) => item._id === product._id);
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
    toast.success("Wishlist updated!");
  };

  const isInWishlist = (id) => wishlist.some((item) => item._id === id);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    setCategory(categoryParam || "All");
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/products");
        setProducts(response.data.products);
        setError(null);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProduct = products.filter((product) => {
    const matchCategory = category === "All" || category === product.category;
    const matchSearch = product.name
      .toLowerCase()
      .includes(query.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading products...
      </div>
    );
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (filteredProduct.length === 0)
    return (
      <div className="text-gray-500 text-center p-4">No products found</div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative w-full max-w-md mb-4">
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

      <div className="flex justify-end mb-4">
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-full px-3 py-1"
          value={category}
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Explore Products
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProduct.map((product) => (
          <div
            key={product._id}
            onClick={() => setSelectedProductId(product._id)}
            className="relative bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer border border-gray-200 hover:shadow-lg transition-all duration-300"
          >
            <div className="h-48 w-full bg-white flex items-center justify-center p-2">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300";
                }}
              />
            </div>

            <div className="p-4 flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>
              <span className="text-sm text-purple-700 font-medium">
                {product.category}
              </span>
              <span className="text-lg font-bold text-green-600">
                ₹{product.price}
              </span>

              <div className="flex items-center justify-between mt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full text-sm"
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
                    size={20}
                    className={`transition-all duration-300 ${
                      isInWishlist(product._id)
                        ? "text-red-600"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProductId && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="w-full max-w-5xl rounded-lg relative max-h-[90vh] overflow-y-auto">
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
