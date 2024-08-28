import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./Components/Home";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Signup from "./Components/Signup";
import Book from "./Components/Book/Book";
import Wishlist from "./Components/Wishlist";
import CustomerDashboard from "./Components/CustomerDashboard";
import Bookdata from "./Components/Bookdata";
import Orders from "./Components/MyOrders";
// import DotCursor from "./Components/DotCursor.jsx";
import BuyingModuleDashboard from "./Components/BuyingModal.jsx";
import Navbar from "./Components/Navbar";
import { WishlistProvider } from "./Components/WishlistContext.jsx";
import Statistics from "./Components/Statistics.jsx";

const App = () => {
  return (
    <WishlistProvider>
      <Router>
        {/* <DotCursor /> */}
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/book" element={<Book />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/customerdashboard" element={<CustomerDashboard />} />
              <Route path="/bookdata" element={<Bookdata />} />
              <Route path="/buyingmodules" element={<BuyingModuleDashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/Statistics" element={<Statistics />} />
            </Routes>
          </div>
        </div>
      </Router>
    </WishlistProvider>
  );
};

export default App;
