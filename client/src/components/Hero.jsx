import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import axiosInstance from "../config/axiosConfig";
import Grid from "../pages/Grid";
import { Link } from "react-router-dom";
import img from "../assets/img/img.jpg";
import img2 from "../assets/img/img2.jpg";
import img3 from "../assets/img/img3.jpg";

const Hero = () => {
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [productIndex, setProductIndex] = useState(0);
  const [products, setProducts] = useState([]);

  const heroSlides = [
    {
      title: "Summer Collection 2025",
      subtitle: "Elevate your style this season",
      buttonText: "SHOP NOW",
      bgColor: "bg-pink-100",
      textColor: "text-pink-800",
      backimage: img3,
      buttonColor: "bg-pink-600 hover:bg-pink-700",
    },
    {
      title: "Exclusive Brands",
      subtitle: "Premium selections at amazing prices",
      buttonText: "EXPLORE",
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
      backimage: img2,
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Festive Offers",
      subtitle: "Up to 70% off on top brands",
      buttonText: "GET DEALS",
      bgColor: "bg-purple-100",
      textColor: "text-purple-800",
      backimage: img,
      buttonColor: "bg-purple-600 hover:bg-purple-700",
    },
  ];

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products");
        setProducts(response.data.products);
        console.log(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Auto change hero slide and product carousel
  useEffect(() => {
    const heroTimer = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    const productTimer = setInterval(() => {
      setProductIndex((prev) =>
        products.length > 0 ? (prev + 1) % products.length : 0
      );
    }, 3000);

    return () => {
      clearInterval(heroTimer);
      clearInterval(productTimer);
    };
  }, [products.length, heroSlides.length]);

  const showPrevProduct = () => {
    setProductIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const showNextProduct = () => {
    setProductIndex((prev) => (prev + 1) % products.length);
  };

  const currentSlide = heroSlides[heroSlideIndex];

  return (
    <div className="relative overflow-hidden">
      {/* HERO SECTION */}
      
      <div
        className={` w-full min-h-[70vh] flex items-center relative ${currentSlide.bgColor}`}
        style={{
          backgroundImage: `url(${currentSlide.backimage})`,
          backgroundSize: "fit",
          backgroundPosition: "center",
          
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30" />

        <div className="container mx-auto px-4 z-10 text-center">
          <h1
            className={`text-4xl md:text-6xl font-extrabold tracking-tight mb-4 ${currentSlide.textColor} lg:w-1/2 mx-auto`}
          >
            {currentSlide.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white lg:w-1/2 mx-auto">
            {currentSlide.subtitle}
          </p>

          <Link to={"/Explore"}>
            <button
              className={`px-10 py-4 text-xl font-bold rounded-full ${currentSlide.buttonColor} shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105`}
            >
              {currentSlide.buttonText}
            </button>
          </Link>

          <div className="flex justify-center mt-8 space-x-4">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setHeroSlideIndex(index)}
                className={`h-4 rounded-full ${
                  heroSlideIndex === index ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
       
       {/* carousel */}
      <div className="relative py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-pink-800 tracking-wider">
              TRENDING NOW
            </h2>
            <div className="flex space-x-6">
              <button
                onClick={showPrevProduct}
                className="p-3 bg-white rounded-full shadow-xl text-pink-600 hover:text-pink-800 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={showNextProduct}
                className="p-3 bg-white rounded-full shadow-xl text-pink-600 hover:text-pink-800 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            {[0, 1, 2, 3].map((offset) => {
              if (products.length === 0) return null;
              const index = (productIndex + offset) % products.length;
              const product = products[index];
              return (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-[400px] object-center "
                    />
                   
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-sm">{product.brand}</p>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-xl font-bold text-gray-900">
                      ₹{product.price}
                      </p>
                      <span className="text-green-600 font-medium">
                        {product.discount}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Link to={"/Explore"} className="mt-10 flex justify-center">
            <button className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold rounded-full px-8 py-3 transition-all">
              Explore More →
            </button>
          </Link>
        </div>
      </div>
      <Grid />
      <Footer />
    </div>
  );
};

export default Hero;
