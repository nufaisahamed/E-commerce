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
        console.error("Error fetching product", error);
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
      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, index) => {
          const firstProductInCategory = product.find(
            (item) => item.category === category
          );
          
          return firstProductInCategory ? (
            <Link
              key={index}
              to={`/Explore?category=${category.toLowerCase()}`}
              className="block overflow-hidden bg-white dark:bg-gray-800 rounded-lg transition-all duration-300 group hover:shadow-xl"
            >
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={firstProductInCategory.image}
                    alt={category}
                    className="w-full h-full object-center transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-xs font-medium px-2 py-1 rounded">
                  {category}
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {category}
                  </h3>
                  <span className="text-sm text-blue-600 dark:text-blue-400 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Explore →
                  </span>
                </div>
                
                <div className="w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300 mt-2"></div>
              </div>
            </Link>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Grid;