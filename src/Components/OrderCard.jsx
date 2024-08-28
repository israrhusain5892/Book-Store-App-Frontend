// OrderCard.js

import React from 'react';
import { motion } from 'framer-motion';

const OrderCard = ({ order }) => {
  const { book, quantity, price } = order;

  return (
    <motion.div
      className="bg-gray-100 p-3 w-60 rounded-lg flex flex-col"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <motion.img
        src={book.image}
        alt={book.title}
        className="w-32 h-40 object-cover mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-1">
          <div>
            <h2 className="text-sm font-bold">{book.title}</h2>
            <p className="text-gray-600 text-xs">{book.date}</p>
          </div>
          <p className="text-gray-700 text-sm">${price}</p>
        </div>
        <p className="text-gray-700 mb-1 text-xs">Author: {book.author}</p>
        <p className="text-gray-700 mb-1 text-xs">Genre: {book.genre}</p>
        <p className="text-gray-700 mb-1 text-xs">Quantity: {quantity}</p>
      </div>
    </motion.div>
  );
};

export default OrderCard;
