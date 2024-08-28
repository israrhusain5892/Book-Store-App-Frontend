import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import loginbg from "../assets/login/loginpagebg.jpg";
import logo from "../assets/logo/logo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {jwtDecode} from "jwt-decode"; // Ensure correct import
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing the eye icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    axios
      .post("http://localhost:8000/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data.token) {
          const decoded = jwtDecode(result.data.token);
          sessionStorage.setItem("token", result.data.token);
          if (decoded.email.includes("@numetry")) {
            toast.success("Admin has logged in");
            navigate("/dashboard");
          } else {
            navigate("/home");
          }
        } else {
          setError("Login failed. Please check your credentials.");
        }
      })
      .catch((err) => {
        console.log(err);
        setError("An error occurred while logging in. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });

    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <ToastContainer />
      <div className="flex bg-white p-8 rounded shadow-md w-full max-w-4xl animate-fade-in">
        {/* Left Column: Image Background */}
        <div className="w-1/2 hidden md:flex items-center justify-center">
          <img
            src={loginbg}
            alt="Background"
            className="rounded-md w-full h-full object-cover animate-slide-in"
          />
        </div>

        {/* Right Column: Login Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center animate-slide-in">
          {/* Loader */}
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="loader animate-bounce"></div>
            </div>
          ) : (
            <>
              {/* Logo */}
              <div className="flex justify-center">
                <img
                  src={logo} // Replace "your-logo.png" with the path to your logo
                  alt="Logo"
                  className="h-20"
                />
              </div>
              {/* Login Heading */}
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Login
              </h2>
              {error && (
                <div className="mb-4 text-red-500 text-sm">{error}</div>
              )}
              <form onSubmit={handleSubmit}>
                {/* Email Input */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 transition duration-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {/* Password Input */}
                <div className="mb-6 relative">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 transition duration-300"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className="absolute right-3 top-3 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white py-2 rounded transform hover:scale-105 focus:outline-none focus:ring focus:ring-blue-200 transition duration-300"
                >
                  Login
                </button>
              </form>
              {/* Signup Link */}
              <div className="mt-4 text-center">
                <span className="text-gray-600">Don't have an account? </span>
                <Link to="/signup" className="text-blue-500 hover:underline">
                  Signup
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
