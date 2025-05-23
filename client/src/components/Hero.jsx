import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";
import Grid from "../pages/Grid";
import Footer from "./Footer";
import emailjs from "@emailjs/browser";

import img from "../assets/img/img.jpg";
import img2 from "../assets/img/img2.jpg";
import img3 from "../assets/img/img3.jpg";

// Feature icons
import { FaShippingFast, FaHeadset, FaGift } from "react-icons/fa";
// Testimonial arrows
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Hero = () => {
  // hero slides & state
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
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  // products carousel state
  const [products, setProducts] = useState([]);
  const [productIndex, setProductIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");

  // testimonials
  const testimonials = [
    { quote: "Amazing selection & fast delivery!", user: "Priya S." },
    { quote: "Customer service went above & beyond.", user: "Rahul K." },
  ];
  const [testiIndex, setTestiIndex] = useState(0);

  // fetch products
  useEffect(() => {
    axiosInstance
      .get("/products")
      .then((res) => setProducts(res.data.products))
      .catch((e) => console.error(e));
  }, []);

  // slide intervals
  useEffect(() => {
    const heroTimer = setInterval(
      () => setHeroSlideIndex((i) => (i + 1) % heroSlides.length),
      5000
    );
    const prodTimer = setInterval(
      () =>
        setProductIndex((i) =>
          products.length ? (i + 1) % products.length : 0
        ),
      3000
    );
    const testiTimer = setInterval(
      () => setTestiIndex((i) => (i + 1) % testimonials.length),
      7000
    );
    return () => {
      clearInterval(heroTimer);
      clearInterval(prodTimer);
      clearInterval(testiTimer);
    };
  }, [products.length]);

  const currentSlide = heroSlides[heroSlideIndex];
  const currentTesti = testimonials[testiIndex];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setNewsletterStatus("Please enter a valid email address.");
      return;
    }

    const serviceID = "service_p7kn1ed";
    const templateID = "template_7ofxzw4";
    const publicKey = "AZhDoJvxJBZtMJI3N";

    const templateParams = {
      user_email: email,
    };

    emailjs
      .send(serviceID, templateID, templateParams, publicKey)
      .then(() => {
        setNewsletterStatus("Thanks for subscribing!");
        setEmail("");
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        setNewsletterStatus("Failed to subscribe. Please try again later.");
      });
  };

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

      {/* TRENDING PRODUCTS */}
      <section className="relative py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-pink-800">TRENDING NOW</h2>
            <div className="flex space-x-4">
              <button
                onClick={() =>
                  setProductIndex((i) =>
                    i === 0 ? products.length - 1 : i - 1
                  )
                }
                className="p-3 bg-white rounded-full shadow text-pink-600 hover:text-pink-800"
              >
                &#x276E;
              </button>
              <button
                onClick={() =>
                  setProductIndex((i) => (i + 1) % products.length)
                }
                className="p-3 bg-white rounded-full shadow text-pink-600 hover:text-pink-800"
              >
                &#x276F;
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[0, 1, 2, 3, 4].map((offset) => {
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
                      className="w-full h-[220px] object-center "
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
          <div className="mt-10 text-center">
            <Link to="/Explore">
              <button className="bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold rounded-full px-8 py-3 hover:from-pink-600 hover:to-pink-700 transition">
                Explore More →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
          <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow">
            <p className="italic text-gray-700 mb-4">“{currentTesti.quote}”</p>
            <p className="font-semibold text-gray-900">— {currentTesti.user}</p>
          </div>
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={() =>
                setTestiIndex((i) =>
                  i === 0 ? testimonials.length - 1 : i - 1
                )
              }
            >
              <MdChevronLeft
                size={24}
                className="text-gray-600 hover:text-pink-600"
              />
            </button>
            <button
              onClick={() =>
                setTestiIndex((i) => (i + 1) % testimonials.length)
              }
            >
              <MdChevronRight
                size={24}
                className="text-gray-600 hover:text-pink-600"
              />
            </button>
          </div>
        </div>
      </section>

      {/* NEWSLETTER SIGN‑UP */}
      <section className="py-12 bg-pink-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="mb-6 text-gray-700">
            Get 10% off your first order when you subscribe.
          </p>
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row justify-center gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition"
            >
              Subscribe
            </button>
          </form>
          {newsletterStatus && (
            <p className="mt-3 text-sm text-gray-700">{newsletterStatus}</p>
          )}
        </div>
      </section>

      {/* GRID */}
      <Grid />

      {/* WHY SHOP WITH US */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Why Shop With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow">
              <FaShippingFast className="mx-auto text-4xl text-pink-600 mb-4" />
              <h3 className="font-semibold mb-2">Fast Shipping</h3>
              <p className="text-sm text-gray-600">
                Get your order delivered within 24–48 hours.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <FaHeadset className="mx-auto text-4xl text-pink-600 mb-4" />
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">
                Our team is always here to help you.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <FaGift className="mx-auto text-4xl text-pink-600 mb-4" />
              <h3 className="font-semibold mb-2">Special Offers</h3>
              <p className="text-sm text-gray-600">
                Exclusive deals and bundles only for you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
