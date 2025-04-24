import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosConfig";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

const About = ({ productId }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const handleAddToCart = (product) => {
  //   dispatch(addToCart(product));
  // };

  // Auth check function
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
    navigate("/Cart")
    console.log(handleAddToCart);
  };


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/products/${productId}`);
        setProduct(response.data.product);
        setError(null);
      } catch (err) {
        setError("Could not fetch product details");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
        <p className="text-red-600 text-center font-medium">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 mx-auto block text-sm text-blue-600 hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Product Image */}
        <div className="relative w-full lg:w-1/2 h-64 lg:h-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 z-10"></div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 lg:h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 flex-wrap">
              {product.category && (
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {product.category}
                </span>
              )}
              {product.brand && (
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                  Brand: {product.brand}
                </span>
              )}
            </div>

            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              {product.name}
            </h2>

            {/* Ratings */}
            {product.rating && (
              <p className="text-yellow-600 font-medium mb-2">
                ⭐ {product.rating} / 5
              </p>
            )}

            <div className="prose text-gray-600 mb-6">
              <p>{product.description}</p>
            </div>

            {/* Specifications */}
            {product.specs && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">
                  Specifications:
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {product.specs.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Shipping Info */}
            {product.shipping && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">
                  Shipping Info:
                </h4>
                <p className="text-sm text-gray-600">{product.shipping}</p>
              </div>
            )}
          </div>

          {/* Price and Stock */}
          <div className="mt-auto">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-green-600">
                ₹{product.price}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!product.inStock) return;
                  handleAddToCart(product);
                  toast.custom((t) => (
                    <div
                      className={`${
                        t.visible ? "animate-enter" : "animate-leave"
                      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                    >
                      <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 pt-0.5">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={product.image}
                              alt=""
                            />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {product.name} added to cart
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.brand}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex border-l border-gray-200">
                        <button
                          onClick={() => toast.dismiss(t.id)}
                          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  ));
                }}
                disabled={!product.inStock}
                className={`font-medium py-2 px-6 rounded-lg transition duration-200 ${
                  product.inStock
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
            {product.inStock ? (
              <p className="text-sm text-green-600 mt-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-600 mr-1"></span>
                In Stock
              </p>
            ) : (
              <p className="text-sm text-red-600 mt-2">
                <span className="inline-block w-2 h-2 rounded-full bg-red-600 mr-1"></span>
                Out of Stock
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
