import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";
import logo from "../assets/img/Logo.svg";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { clearCart } from "../features/cartSlice";
import { clearWishlist } from "../features/WishSlice";
import { logout } from "../features/authSlice";

const Header = () => {
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const wishlistCount = wishlistItems.length;

  const { user } = useSelector((state) => state.auth);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 transition-all duration-300 ease-in-out">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="focus:outline-none">
            <img className="h-10 w-auto transition-transform transform hover:scale-105" src={logo} alt="E-Commerce Logo" />
          </Link>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <Link
            to="/explore?category=men"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 focus:outline-none"
          >
            Men
          </Link>
          <Link
            to="/explore?category=women"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 focus:outline-none"
          >
            Women
          </Link>
          <Link
            to="/explore?category=kids"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 focus:outline-none"
          >
            Kids
          </Link>
          <Link
            to="/explore?category=unisex"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 focus:outline-none"
          >
            Unisex
          </Link>
          <Link
            to="/beauty"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 focus:outline-none"
          >
            Beauty
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={toggleSearch}
            className="text-gray-600 hover:text-blue-500 focus:outline-none transition-colors duration-200 relative"
          >
            <FaSearch className="h-5 w-5" />
          </button>

          <Link to="/wishlist" className="relative focus:outline-none">
            <button className="text-gray-600 hover:text-red-500 focus:outline-none transition-colors duration-200 relative">
              <FaHeart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-[-0.2rem] right-[-0.2rem] bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
          </Link>

          <Link to="/cart" className="relative focus:outline-none">
            <button className="text-gray-600 hover:text-green-500 focus:outline-none transition-colors duration-200 relative">
              <FaShoppingCart className="h-5 w-5" />
              {totalQuantity > 0 && (
                <span className="absolute top-[-0.2rem] right-[-0.2rem] bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </button>
          </Link>

          <div className="hidden lg:flex items-center">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border border-gray-300"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm text-white font-semibold">
                      {user.fullname.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-gray-800 font-medium text-sm">
                    Hi, {user.fullname.split(" ")[0]}
                  </span>
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md overflow-hidden z-50">
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-semibold text-gray-800">{user.fullname}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="focus:outline-none">
                  <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium py-2 px-4 rounded-md transition-colors duration-200 text-sm">
                    Login
                  </button>
                </Link>
                <Link to="/signup" className="focus:outline-none">
                  <button className="bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm">
                    Signup
                  </button>
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={toggleMenu}
            className="lg:hidden text-gray-600 hover:text-gray-800 focus:outline-none transition-colors duration-200"
          >
            {!isMenuOpen ? <FaBars className="h-6 w-6" /> : <FaTimes className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {isSearchOpen && (
        <div className="bg-gray-50 p-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      )}

      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            {user ? (
              <div className="flex items-center space-x-3">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border border-gray-300"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm text-white font-semibold">
                    {user.fullname.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-gray-800 font-medium text-sm">
                  Hi, {user.fullname.split(" ")[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white font-medium py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-200 text-sm focus:outline-none"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="focus:outline-none">
                  <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium py-2 px-4 rounded-md transition-colors duration-200 text-sm">
                    Login
                  </button>
                </Link>
                <Link to="/signup" className="focus:outline-none">
                  <button className="bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm">
                    Signup
                  </button>
                </Link>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Link
              to="/explore?category=men"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 focus:outline-none"
            >
              Men
            </Link>
            <Link
              to="/explore?category=women"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 focus:outline-none"
            >
              Women
            </Link>
            <Link
              to="/explore?category=kids"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 focus:outline-none"
            >
              Kids
            </Link>
            <Link
              to="/explore?category=unisex"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 focus:outline-none"
            >
              Unisex
            </Link>
            <Link
              to="/beauty"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 focus:outline-none"
            >
              Beauty
            </Link>
          </div>

          <button
            onClick={toggleSearch}
            className="block w-full bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-200 transition-colors duration-200 mt-4 focus:outline-none"
          >
            Search
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;