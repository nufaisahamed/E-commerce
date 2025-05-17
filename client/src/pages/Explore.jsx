import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosConfig";
import { Search, Heart, ShoppingCart, Filter } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { addToWishlist, removeFromWishlist } from "../features/WishSlice";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import About from "./About";

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
  const [showFilters, setShowFilters] = useState(false);
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
    if (!handleAuth()) return;
    
    const isWishlisted = wishlist.some((item) => item._id === product._id);
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
      toast.success(`${product.name} removed from wishlist`);
    } else {
      dispatch(addToWishlist(product));
      toast.success(`${product.name} added to wishlist`);
    }
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
    const matchSearch = product.name.toLowerCase().includes(query.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
    
  if (error)
    return (
      <div className="text-red-500 text-center p-8 max-w-md mx-auto bg-red-50 rounded-lg shadow">
        <div className="text-xl font-semibold mb-2">Oops!</div>
        {error}
      </div>
    );
    
  if (filteredProduct.length === 0)
    return (
      <div className="text-gray-500 text-center p-12 max-w-md mx-auto">
        <div className="text-7xl mb-4">🔍</div>
        <h3 className="text-xl font-medium mb-2">No products found</h3>
        <p>Try adjusting your search or filter criteria</p>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Explore Products
          </h1>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full sm:max-w-xs">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-3 w-full rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
              />
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50"
              >
                <Filter size={18} />
                <span className="font-medium">Filters</span>
              </button>
              
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-3 bg-white shadow-sm appearance-none cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={category}
              >
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {filteredProduct.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full group"
            >
              <div 
                className="relative cursor-pointer overflow-hidden"
                onClick={() => setSelectedProductId(product._id)}
              >
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[290px]  object-cover transform group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300";
                    }}
                  />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWishlistToggle(product);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
                >
                  <Heart
                    size={20}
                    fill={isInWishlist(product._id) ? "#ef4444" : "none"}
                    className={`transition-colors duration-300 ${
                      isInWishlist(product._id) ? "text-red-500" : "text-gray-500"
                    }`}
                  />
                </button>
                {product.discount && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                    {product.discount}% OFF
                  </div>
                )}
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <div 
                  className="cursor-pointer flex-1"
                  onClick={() => setSelectedProductId(product._id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                      {product.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center bg-green-50 px-2 py-1 rounded-md">
                      <span className="text-sm font-medium text-green-700">{product.rating || "4.5"}</span>
                      <span className="text-yellow-500 ml-1">★</span>
                    </div>
                    <span className="text-xs text-gray-500 ml-2">{product.category}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                </div>
                
                <div className="mt-auto flex justify-between items-center">
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      ₹{product.price}
                    </p>
                    {product.originalPrice && (
                      <p className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice}
                      </p>
                    )}
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <ShoppingCart size={16} />
                    <span className="font-medium">Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProduct.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No products found matching your criteria</p>
            <button 
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
              className="mt-4 text-blue-600 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Modal for About */}
      {selectedProductId && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-5xl bg-white rounded-xl relative max-h-[90vh] overflow-y-auto shadow-xl">
            <button
              onClick={() => setSelectedProductId(null)}
              className="absolute top-4 right-4 z-50 bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 transition-colors"
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