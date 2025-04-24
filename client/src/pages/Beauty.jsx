import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig";
import { FaHeart } from "react-icons/fa";

const BeautyPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch beauty products
  useEffect(() => {
    const fetchBeautyProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/products?category=Beauty");
        setProducts(response.data.products || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching beauty products:", err);
        setError("Failed to load beauty products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBeautyProducts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading beauty products...
      </div>
    );
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (products.length === 0)
    return (
      <div className="text-gray-500 text-center p-4">No beauty products found</div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Beauty Products</h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative bg-white rounded-lg shadow-md overflow-hidden group transition-transform duration-200 hover:scale-105"
          >
            {/* Product Image */}
            <div className="overflow-hidden h-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
              />
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-bold text-black">{product.name}</h2>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <span className="text-xl font-bold text-green-600">{product.price}</span>
              <div className="flex justify-between items-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full transition-colors duration-200">
                  Add to Cart
                </button>
                <button className="text-red-500 hover:text-red-600">
                  <FaHeart size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeautyPage;