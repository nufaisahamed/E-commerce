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
import Cookies from "js-cookie";
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

  // const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
  const { user } = useSelector((state) => state.auth);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const handleLogout = () => {
    console.log("from logout");
    dispatch(logout());
    // toast.success("Logged out successfully");
    navigate("/login");
    // dispatch(clearCart());
    // dispatch(clearWishlist());
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md backdrop-filter backdrop-blur-lg bg-opacity-80">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center lg:w-auto w-full">
          <Link to="/">
            <img className="w-25 h-14" src={logo} alt="Logo" />
          </Link>
        </div>

        <div className="hidden lg:flex flex-row items-center justify-center px-4 py-2 space-x-6">
          <Link
            to="/explore?category=men"
            className="px-3 py-1 rounded hover:text-blue-500 text-gray-800 transition-colors hover:bg-gray-400"
          >
            MEN
          </Link>
          <Link
            to="/explore?category=women"
            className="px-3 py-1 rounded hover:text-blue-500 text-gray-800 transition-colors"
          >
            WOMEN
          </Link>
          <Link
            to="/explore?category=kids"
            className="px-3 py-1 rounded hover:text-blue-500 text-gray-800 transition-colors"
          >
            KIDS
          </Link>
          <Link
            to="/explore?category=unisex"
            className="px-3 py-1 rounded hover:text-blue-500 text-gray-800 transition-colors"
          >
            UNISEX
          </Link>
          <Link
            to="/beauty"
            className="px-3 py-1 rounded hover:text-blue-500 text-gray-800 transition-colors"
          >
            BEAUTY
          </Link>
        </div>

        <div className="flex items-center gap-4 relative">
          <button
            onClick={toggleSearch}
            className="text-gray-600 hover:text-blue-500 p-2 rounded-full transition-colors"
          >
            <FaSearch size={20} />
          </button>

          <Link to="/wishlist">
            <button className="text-gray-600 hover:text-blue-500 p-2 rounded-full transition-colors relative">
              <FaHeart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
          </Link>

          <Link to="/cart">
            <button className="text-gray-600 hover:text-blue-500 p-2 rounded-full transition-colors relative">
              <FaShoppingCart size={20} />
              {totalQuantity > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </button>
          </Link>

          <button
            onClick={toggleMenu}
            className="lg:hidden text-gray-600 hover:text-gray-800 p-2 rounded-full transition-colors"
          >
            {!isMenuOpen ? <FaBars size={20} /> : <FaTimes size={20} />}
          </button>

          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm text-white">
                      {user.fullname.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-gray-800 font-medium">
                    Hi, {user.fullname.split(" ")[0]}
                  </span>
                </div>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-52 bg-white shadow-md rounded-lg p-4 z-50">
                    <img
                      src={user.avatar}
                      alt=""
                      className="h-[150px] w-[180px]"
                    />
                    <p className="text-sm font-medium text-gray-800">
                      {user.fullname}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">{user.email}</p>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className=" hover:bg-red-700 w-full text-white border rounded-3xl text-center bg-red-500"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <button className="border rounded-2xl px-3 py-1 text-gray-800 hover:bg-gray-100 transition-colors">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="bg-blue-600 text-white rounded-2xl px-3 py-1 hover:bg-blue-700 transition-colors">
                    Signup
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {isSearchOpen && (
        <div className="w-full bg-white p-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg p-4">
          <div className="flex justify-between items-center mb-4">
            {user ? (
              <>
                <span className="text-gray-800 font-medium">
                  Hi, {user.fullname.split(" ")[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="border px-3 py-1 rounded-2xl text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="border rounded-2xl px-3 py-1 text-gray-800 hover:bg-gray-100 transition-colors">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="bg-blue-600 text-white rounded-2xl px-3 py-1 hover:bg-blue-700 transition-colors">
                    Signup
                  </button>
                </Link>
              </>
            )}
          </div>

          <div className="mt-4 space-y-2">
            <Link
              to="/explore?category=men"
              className="block w-full px-3 py-1 rounded text-gray-800 hover:text-blue-500 transition-colors"
            >
              MEN
            </Link>
            <Link
              to="/explore?category=women"
              className="block w-full px-3 py-1 rounded text-gray-800 hover:text-blue-500 transition-colors"
            >
              WOMEN
            </Link>
            <Link
              to="/explore?category=kids"
              className="block w-full px-3 py-1 rounded text-gray-800 hover:text-blue-500 transition-colors"
            >
              KIDS
            </Link>
            <Link
              to="/explore?category=unisex"
              className="block w-full px-3 py-1 rounded text-gray-800 hover:text-blue-500 transition-colors"
            >
              UNISEX
            </Link>
            <Link
              to="/beauty"
              className="block w-full px-3 py-1 rounded text-gray-800 hover:text-blue-500 transition-colors"
            >
              BEAUTY
            </Link>
          </div>

          <button
            onClick={toggleSearch}
            className="block w-full px-3 py-1 rounded bg-gray-100 text-gray-800 mt-4"
          >
            Search
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
