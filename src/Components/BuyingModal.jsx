import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const BuyingModuleDashboard = () => {
  const [buyingModules, setBuyingModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBuyingModules();
  }, []);

  const fetchBuyingModules = () => {
    setTimeout(() => {
      axios
        .get("https://books-api-lz0r.onrender.com/buyingmodules", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setBuyingModules(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching buying modules:", error);
          setError("Failed to fetch data");
          setLoading(false);
        });
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader animate-bounce"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto ml-48 md:ml-64 p-8 bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Buying Module Dashboard
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Username</th>
                <th className="py-2 px-4 border-b">Product</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {buyingModules.map((module) =>
                module.orders.map((order, index) => (
                  <tr
                    key={order._id}
                    className={index % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    {index === 0 && (
                      <>
                        <td
                          className="py-2 px-4 border-b"
                          rowSpan={module.orders.length}
                        >
                          {module.email}
                        </td>
                        <td
                          className="py-2 px-4 border-b"
                          rowSpan={module.orders.length}
                        >
                          {module.username}
                        </td>
                      </>
                    )}
                    <td className="py-2 px-4 border-b">{order.product}</td>
                    
                    <td className="py-2 px-4 border-b">{order.quantity}</td>
                    <td className="py-2 px-4 border-b">{order.price}</td>
                    <td className="py-2 px-4 border-b">{order.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BuyingModuleDashboard;
