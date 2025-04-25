import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";
import toast from "react-hot-toast";
import Cookies from "js-cookie"; // Import js-cookie

export default function LoginPage() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const checkLoginStatus = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) return;

      try {
        const res = await axiosInstance.get("isLoggedIn", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          // User is already logged in, redirect to home page
          navigate("/");
        }
      } catch (err) {
        console.error("Not logged in or token expired", err);
      }
    };

    checkLoginStatus();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    axiosInstance
      .post("/login", formValues)
      .then((res) => {
        // Store the auth token in localStorage (or wherever you prefer)
        localStorage.setItem("authToken", res.data.token);

        // Store user data in cookies (expires in 7 days)
        Cookies.set("user", JSON.stringify(res.data.user), {
          expires: 7,
          sameSite: "Strict", // secure: true, if you are using HTTPS
        });

        toast.success(res.data.message);
        navigate("/"); // Redirect to homepage after login
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Login failed");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>
        <form onSubmit={handleLogin} className="mt-6">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={formValues.email}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              name="email"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <label className="flex items-center text-gray-600">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <Link to="/forgot-password" className="text-blue-500 text-sm">
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-lg transition-colors duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
