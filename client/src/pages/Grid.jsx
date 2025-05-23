import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosConfig";
import { Link } from "react-router-dom";
import { FaMale, FaFemale, FaChild, FaUniversalAccess } from "react-icons/fa";

// Mapping: Category → Icon + Background Style
const categoryData = {
  Men: { icon: FaMale, bg: "bg-blue-100 text-blue-800" },
  Women: { icon: FaFemale, bg: "bg-pink-100 text-pink-800" },
  Kids: { icon: FaChild, bg: "bg-green-100 text-green-800" },
  Unisex: { icon: FaUniversalAccess, bg: "bg-purple-100 text-purple-800" },
};

const formatCategory = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const Grid = () => {
  const [product, setProductData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchPrd = async () => {
      try {
        const response = await axiosInstance.get("/products");
        setProductData(response.data.products);

        const uniqueCategories = [
          ...new Set(
            response.data.products.map((item) =>
              formatCategory(item.category)
            )
          ),
        ];
        setCategories(uniqueCategories.slice(0, 4));
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };
    fetchPrd();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-8">
          Shop by Category
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, index) => {
          const { icon: Icon, bg } = categoryData[category] || {
            icon: FaUniversalAccess,
            bg: "bg-gray-100 text-gray-800",
          };

          return (
            <Link
              key={index}
              to={`/Explore?category=${category.toLowerCase()}`}
              className={`rounded-2xl p-6 flex flex-col items-center justify-center shadow-md transition-transform duration-300 transform hover:scale-105 ${bg}`}
            >
              <Icon size={48} className="mb-3" />
              <h3 className="text-lg font-semibold">{category}</h3>
              <span className="mt-1 text-sm opacity-70 group-hover:opacity-100 transition-opacity">
                Explore →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
