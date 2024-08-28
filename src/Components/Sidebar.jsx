import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { HomeIcon, BookOpenIcon, UsersIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'; // Import specific icons from Heroicons
import { ChartBarIcon } from '@heroicons/react/24/solid'; // Import the chart bar icon

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.post('https://books-api-lz0r.onrender.com/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      sessionStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      // Optional: Display an error message to the user
    }
  };

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="h-screen border border-black py-8 px-4 fixed md:w-64 w-48"
      style={{
        background: "linear-gradient(to bottom, #243137, #000000)",
        color: "#bd9f67",
      }}
    >
      <nav>
        <ul>
          <motion.li
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-4 flex items-center justify-center"
          >
            <h1 className="text-3xl font-bold mb-2 text-6xl"  style={{ color: "#bd9f67", fontFamily: "Dancing Script, cursive" }}>Admin</h1>
          </motion.li>
          {/* Navigation links */}
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-4"
          >
            <NavLink
              to="/dashboard"
              className="block py-2 px-4 rounded hover:bg-gray-700 text-lg font-semibold ml-5 mb-3 flex items-center"
              activeclassname="bg-gray-700"
            >
              <HomeIcon className="w-6 h-6 mr-3" /> Dashboard
            </NavLink>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mb-4"
          >
            <NavLink
              to="/statistics"
              className="block py-2 px-4 rounded hover:bg-gray-700 text-lg font-semibold ml-5 mb-3 flex items-center"
              activeclassname="bg-gray-700"
            >
              <ChartBarIcon className="w-6 h-6 mr-3" /> Statistics
            </NavLink>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-4"
          >
            <NavLink
              to="/dashboard/book"
              className="block py-2 px-4 rounded hover:bg-gray-700 text-lg font-semibold ml-5 mb-3 flex items-center"
              activeclassname="bg-gray-700"
            >
              <BookOpenIcon className="w-6 h-6 mr-3" /> Add a Book
            </NavLink>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-4"
          >
            <NavLink
              to="/customerdashboard"
              className="block py-2 px-4 rounded hover:bg-gray-700 text-lg font-semibold ml-5 mb-3 flex items-center"
              activeclassname="bg-gray-700"
            >
              <UsersIcon className="w-6 h-6 mr-3" /> Customers Data
            </NavLink>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-4"
          >
            <NavLink
              to="/bookdata"
              className="block py-2 px-4 rounded hover:bg-gray-700 text-lg font-semibold ml-5 mb-3 flex items-center"
              activeclassname="bg-gray-700"
            >
              <BookOpenIcon className="w-6 h-6 mr-3" /> Books Data
            </NavLink>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-4"
          >
            <NavLink
              to="/buyingmodules"
              className="block py-2 px-4 rounded hover:bg-gray-700 text-lg font-semibold ml-5 mb-3 flex items-center"
              activeclassname="bg-gray-700"
            >
              <ShoppingCartIcon className="w-6 h-6 mr-3" /> Buying Data
            </NavLink>
          </motion.li>
         
         
          {/* Logout button */}
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <button
              onClick={handleLogout}
              className="block py-2 px-4 rounded hover:bg-red-700 bg-red-500 text-lg font-semibold ml-5 flex items-center text-white"
            >
              Logout
            </button>
          </motion.li>
        </ul>
      </nav>
    </motion.div>
  );
};

export default Sidebar;
