// MyOrders.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import OrderCard from './OrderCard';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get('https://books-api-lz0r.onrender.com/my-orders', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.orders || [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw new Error('Failed to fetch orders');
    }
  };

  const fetchBooksFromDatabase = async () => {
    try {
      const response = await axios.get('https://books-api-lz0r.onrender.com/books');
      const publishers = response.data;

      const books = publishers.reduce((acc, publisher) => {
        publisher.publications.forEach(publication => {
          const booksWithDetails = publication.publishedBooks.map(book => ({
            title: book.title,
            image: book.imageUrl,
            author: publication.author,
            genre: publication.genre,
            price: book.price,
            date: book.date, // Assuming book.date is available
          }));
          acc = acc.concat(booksWithDetails);
        });
        return acc;
      }, []);

      return books;
    } catch (error) {
      console.error('Error fetching books from database:', error);
      throw new Error('Failed to fetch books');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await fetchOrders();
        const booksData = await fetchBooksFromDatabase();

        // Match orders with books data
        const ordersWithDetails = ordersData.map(order => {
          const book = booksData.find(book => book.title === order.product);
          return book ? { ...order, book } : null;
        }).filter(Boolean);

        // Sort orders by date
        ordersWithDetails.sort((a, b) => new Date(b.book.date) - new Date(a.book.date));

        setOrders(ordersWithDetails);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>
        <div className='flex justify-center'>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-3 text-center">Loading...</div>
            ) : error ? (
              <div className="col-span-3 text-center text-red-600">{error}</div>
            ) : orders.length > 0 ? (
              orders.map(order => (
                <OrderCard key={order._id} order={order} />
              ))
            ) : (
              <p className="text-gray-700 col-span-3 text-center">No orders found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrders;
