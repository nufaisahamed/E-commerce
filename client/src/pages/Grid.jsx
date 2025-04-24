import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosConfig";
import { Link } from "react-router-dom";

const Grid = () => {
  const [product, setProductData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchPrd = async () => {
      try {
        const response = await axiosInstance.get("/products");
        setProductData(response.data.products);
        
        // Extract unique categories from products
        const uniqueCategories = [...new Set(response.data.products.map(item => item.category))];
        setCategories(uniqueCategories.slice(0, 4)); // Take only first 4 categories
      } catch (error) {
        console.error("error fetching product", error);
      }
    };
    fetchPrd();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="font-black text-4xl uppercase tracking-wide text-gray-800 dark:text-white">
          Categories
        </h1>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, index) => {
          // Find the first product in this category
          const firstProductInCategory = product.find(
            (item) => item.category === category
          );
          
          return firstProductInCategory ? (
            <div 
              key={index}
              className="relative rounded-xl overflow-hidden shadow-xl transition-all duration-300 transform hover:scale-105 group bg-pink-500"
            >
              <img 
                src={firstProductInCategory.image} 
                alt={category} 
                className="w-fit h-64 object-left-top  group-hover:opacity-90 transition-all duration-300 " 
              />
              
              <div className="absolute inset-x-0 bottom-0 bg-white dark:bg-gray-800 flex items-center justify-center py-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <Link 
                  to={`/Explore?category=${category.toLowerCase()}`} 
                  className="font-semibold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {category}
                </Link>
              </div>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Grid;