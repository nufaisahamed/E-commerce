import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../config/axiosConfig";
import { Link } from "react-router-dom";

export default function SignupPage() {
    const [formValues, setFormValues] = useState({
      fullname: "",
      email: "",
      password: "",
    });
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };
    const handleLogin = (e) => {
      e.preventDefault();
      //login logic here
      axiosInstance.post("/register", formValues)
      .then(res => {
        console.log(res);
        toast.success(res.data.message)
      })  
      .catch(err => {
        console.log(err);
        toast.error(err.response.data.message);
      })
    }
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
          <h2 className="text-2xl font-semibold text-center text-gray-700">Sign Up</h2>
          <form onSubmit={handleLogin} className="mt-6">
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                name="fullname"
                type="text"
                onChange={handleChange}
                value={formValues.fullname}
                className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your full name"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formValues.email}
                className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={formValues.password}
                className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Create a password"
              />
            </div>
            
            <button
              type="submit"
              className="w-full mt-6 bg-purple-500 hover:bg-purple-600 text-white font-semibold p-2 rounded-lg"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account? <a href="#" className="text-purple-500"></a>
            <button className="text-blue-500"><Link to={"/login"}>Login</Link></button>
          </p>
        </div>
      </div>
    );
  }
  