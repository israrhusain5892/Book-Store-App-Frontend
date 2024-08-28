import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { Line, Pie, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const Statistics = () => {
  const [customers, setCustomers] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [buyingData, setBuyingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const [customersResponse, booksResponse, buyingResponse] =
          await Promise.all([
            axios.get("https://books-api-lz0r.onrender.com/customers", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            axios.get("https://books-api-lz0r.onrender.com/books", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            axios.get("https://books-api-lz0r.onrender.com/buyingmodules", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);

        setCustomers(customersResponse.data);
        setPublishers(booksResponse.data);
        setBuyingData(buyingResponse.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader animate-bounce"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const loginsPerDay = customers.reduce((acc, customer) => {
    customer.timestamps.forEach((timestamp) => {
      const date = timestamp.login.split(" ")[0];
      if (!acc[date]) acc[date] = 0;
      acc[date]++;
    });
    return acc;
  }, {});

  const salesPerDay = buyingData.reduce((acc, customer) => {
    customer.orders.forEach((order) => {
      if (!acc[order.date]) acc[order.date] = 0;
      acc[order.date] += order.price;
    });
    return acc;
  }, {});

  const booksByPublisher = publishers.reduce((acc, publisher) => {
    publisher.publications.forEach((publication) => {
      publication.publishedBooks.forEach((book) => {
        if (!acc[publisher.publisherName]) acc[publisher.publisherName] = 0;
        acc[publisher.publisherName]++;
      });
    });
    return acc;
  }, {});

  const loginsData = {
    labels: Object.keys(loginsPerDay),
    datasets: [
      {
        label: "Logins per Day",
        data: Object.values(loginsPerDay),
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const salesData = {
    labels: [
      ...new Set(Object.keys(salesPerDay).map((date) => date.split("T")[0])),
    ],
    datasets: [
      {
        label: "Sales per Day",
        data: Object.values(salesPerDay),
        fill: false,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        yAxisID: "y-axis-0", // Assigning a specific ID to the y-axis
      },
    ],
  };

  const options = {
    scales: {
      y: {
        min: 0, // Set the minimum value for the y-axis
        max: 50, // Set the maximum value for the y-axis
      },
    },
  };

  const booksData = {
    labels: Object.keys(booksByPublisher),
    datasets: [
      {
        label: "Books by Publisher",
        data: Object.values(booksByPublisher),
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  };

  // Number of Customers
  const customersData = {
    labels: ["Customers"],
    datasets: [
      {
        label: "Number of Customers",
        data: [customers.length],
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
      },
    ],
  };

  return (
    <>
      <Sidebar />
      <div className="flex h-screen">
        <div className="flex-1 ml-64 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Logins per Day
              </h2>
              <Line data={loginsData} />
            </div>
            <div className="bg-white p-8 rounded shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Sales per Day
              </h2>
              <Line data={salesData} options={options} />
            </div>
            <div className="bg-white p-8 rounded shadow-lg text-center col-span-full">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Books by Publisher
              </h2>
              <Doughnut data={booksData} />
            </div>
            <div className="bg-white p-8 rounded shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Number of Customers
              </h2>
              <Bar data={customersData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistics;
