import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaShieldAlt,
  FaUndo,
} from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { AiFillMobile } from "react-icons/ai";
import { IoLogoAppleAppstore } from "react-icons/io5";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 border-t border-gray-200">
      <div className="max-w-screen-xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Explore Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Explore
            </h3>
            <ul className="space-y-3 text-sm">
              {["Men", "Women", "Kids", "Home & Living", "Beauty", "Gift Cards"].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="flex items-center hover:text-gray-900 transition-all"
                  >
                    <BsArrowRight className="mr-2 text-gray-400" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Customer Service
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                "Contact Us",
                "FAQ",
                "Track Orders",
                "Shipping",
                "Returns",
                "Cancellation",
                "Privacy Policy",
                "Terms of Use",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="flex items-center hover:text-gray-900 transition-all"
                  >
                    <BsArrowRight className="mr-2 text-gray-400" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile App */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Get Our App
            </h3>
            <p className="text-sm mb-4">
              Shop smarter with our mobile app.
            </p>
            <div className="flex flex-col space-y-3">
              <Link
                to="#"
                className="flex items-center bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-100 transition-all text-sm"
              >
                <IoLogoAppleAppstore className="mr-2 text-lg" />
                Download on iOS
              </Link>
              <Link
                to="#"
                className="flex items-center bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-100 transition-all text-sm"
              >
                <AiFillMobile className="mr-2 text-lg" />
                Download on Android
              </Link>
            </div>
          </div>

          {/* Contact & Guarantee */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Contact & Guarantee
            </h3>
            <ul className="space-y-3 text-sm mb-5">
              <li className="flex items-start">
                <MdLocationOn className="mr-2 text-gray-400 mt-1" />
                <span>Angadipuram, Kerala, India</span>
              </li>
              <li className="flex items-center">
                <MdEmail className="mr-2 text-gray-400" />
                support@nufustore.com
              </li>
              <li className="flex items-center">
                <MdPhone className="mr-2 text-gray-400" />
                +91 9876543210
              </li>
            </ul>
            <div className="flex space-x-5 text-sm">
              <div className="flex items-center">
                <FaShieldAlt className="text-green-600 mr-2" />
                100% Original
              </div>
              <div className="flex items-center">
                <FaUndo className="text-blue-600 mr-2" />
                Easy Returns
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-200 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
          <p className="mb-4 md:mb-0 text-center md:text-left">
            © 2025 <span className="font-semibold">NUFU STORE.COM</span>. All rights reserved.
          </p>
          <div className="flex space-x-5">
            <Link to="#" className="hover:text-gray-900 transition-all" aria-label="Facebook">
              <FaFacebook size={18} />
            </Link>
            <Link to="#" className="hover:text-gray-900 transition-all" aria-label="Twitter">
              <FaTwitter size={18} />
            </Link>
            <Link to="#" className="hover:text-gray-900 transition-all" aria-label="Instagram">
              <FaInstagram size={18} />
            </Link>
            <Link to="#" className="hover:text-gray-900 transition-all" aria-label="YouTube">
              <FaYoutube size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
);
};

export default Footer;
