import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaCheckCircle } from "react-icons/fa";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AddressForm from "./AddressForm";
import emailjs from "emailjs-com";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookCard = ({ book, token, isExpanded, onExpand, onRemove }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [NumberofItems, setNumberofItems] = useState(1);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [copiesAvailable, setCopiesAvailable] = useState(book.copiesAvailable);
  const navigate = useNavigate();
  const user = token ? jwtDecode(token) : null;
  const userEmail = user ? user.email : null;
  const userName = user ? user.username : null;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!token) return;

      try {
        const response = await axios.get("https://books-api-lz0r.onrender.com/wishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const wishlist = response.data.wishlist;
        if (wishlist.includes(book.title)) {
          setIsFavorite(true);
        }
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }
    };

    checkIfFavorite();
  }, [book.title, token]);

  const handleFavoriteClick = async () => {
    if (!token) {
      toast.error("You have to login first");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }

    try {
      if (!isFavorite) {
        await axios.put(
          "https://books-api-lz0r.onrender.com/wishlist",
          { bookTitle: book.title },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.delete("https://books-api-lz0r.onrender.com/wishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            bookTitle: book.title,
          },
        });
      }
      setIsFavorite(!isFavorite);
      // Dispatch custom event to notify wishlist change
      const event = new Event("wishlistChange");
      window.dispatchEvent(event);
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  const handleBuyNowClick = async () => {
    if (!token) {
      toast.error("You need to login first to buy books");
      setTimeout(() => {
        navigate("/login");
      });
    }

    try {
      const response = await axios.get(
        `https://books-api-lz0r.onrender.com/user/address/${userEmail}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const fetchedAddresses = response.data.addresses;

      if (fetchedAddresses && fetchedAddresses.length > 0) {
        setAddresses(fetchedAddresses);
        setIsAddressFormOpen(false);
        setSelectedAddress(fetchedAddresses[0]);
      } else {
        setIsAddressFormOpen(true);
        setAddresses([]);
      }
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setIsAddressFormOpen(true); // Fallback to showing form on error
      setAddresses([]);
      setIsModalOpen(true);
    }
  };

  const handleBuyConfirm = async () => {
    try {
      if (!selectedAddress) {
        console.error("No address selected");
        return;
      }

      // Assuming `book` is defined elsewhere in your component
      const response = await axios.post(
        "https://books-api-lz0r.onrender.com/purchase",
        {
          bookTitle: book.title, // Ensure `book` is correctly accessed
          quantity: NumberofItems, // Example, adjust as needed
          address: JSON.stringify(selectedAddress), // Store entire address as string
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure `token` is defined in your component
          },
        }
      );

      console.log("Order updated:", response.data);
      if (onRemove) {
        onRemove(book.title); 
      }
      setCopiesAvailable((prevCopies) => prevCopies - NumberofItems);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      console.log(userEmail);
      console.log(book.title);
      console.log(book.price);
      const emailParams = {
        book_title: book.title,
        book_price: book.price*NumberofItems,
        to_email: userEmail,
      };

      await emailjs.send(
        "service_ss7iidp",
        "template_mw2oj8s",
        emailParams,
        "2rkwjft3NJO0kqp4F"
      );
      console.log("Acknowledgment email sent");
      // console.log(userEmail);
    } catch (error) {
      console.error("Error completing purchase:", error);
    } finally {
      setIsModalOpen(false); // Close modal after purchase attempt
      setIsAddressFormOpen(false); // Close address form after successful purchase
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsAddressFormOpen(false); // Ensure address form is also closed when modal closes
  };

  const handleAddressFormSubmit = () => {
    setIsAddressFormOpen(false); // Close address form after submission
    handleBuyNowClick(); // Fetch addresses again after new address submission
  };

  return (
    <>
  <ToastContainer />
  <motion.div
    className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl m-6 rounded overflow-hidden shadow-lg bg-white ${
      isExpanded ? "flex" : ""
    }`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    onMouseMove={(event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      const halfWidth = rect.width / 2;
      const halfHeight = rect.height / 2;
      const xMove = (offsetX - halfWidth) / halfWidth;
      const yMove = (offsetY - halfHeight) / halfHeight;
      x.set(xMove * 50);
      y.set(yMove * 50);
    }}
    onMouseLeave={() => {
      x.set(0);
      y.set(0);
    }}
    style={{ perspective: 1000, transformStyle: "preserve-3d" }}
  >
    <motion.div style={{ rotateX, rotateY }}>
      <div
        className={`relative ${isExpanded ? "w-1/3" : "w-full"}`}
        onClick={onExpand}
      >
        <img
          className="w-full h-48 z-10 object-cover"
          src={book.imageUrl}
          alt={book.title}
        />
      </div>
      <div className={`px-4 py-2 ${isExpanded ? "w-2/3" : "w-full"}`}>
        <div className="font-bold text-lg mb-1">{book.title}</div>
        <p className="text-gray-700 text-sm">Author: {book.author}</p>
        <p className="text-gray-700 text-sm mt-1">
          Price: ${book.price.toFixed(2)}
        </p>
        {isExpanded && (
          <>
            <p className="text-gray-700 text-sm mt-1">
              Description: {book.description}
            </p>
            <p className="text-gray-700 text-sm">Genre: {book.genre}</p>
            <p className="text-gray-700 text-sm">
              Publisher: {book.publisherName}
            </p>
            <p className="text-gray-700 text-sm mt-1">
              Copies Available: {copiesAvailable}
            </p>
            <button
              onClick={onExpand}
              className="ml-auto text-red-500 focus:outline-none text-sm"
            >
              Show Less
            </button>
          </>
        )}
        {!isExpanded && (
          <div className="flex items-center mt-2">
            <button
              onClick={handleFavoriteClick}
              className={`mr-2 ${
                isFavorite ? "text-red-500" : "text-gray-500"
              }`}
            >
              <FaHeart className="h-5 w-5" />
            </button>
            <button
              onClick={handleBuyNowClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
            >
              Buy Now
            </button>
            <button
              onClick={onExpand}
              className="ml-auto text-blue-500 focus:outline-none text-sm"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </motion.div>
  </motion.div>

  {isModalOpen && !isAddressFormOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Confirm Purchase
        </h2>
        <p className="text-gray-700 text-base mb-4">
          Are you sure you want to buy "{book.title}" for $
          {book.price.toFixed(2)}?
        </p>
        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="text-gray-700 text-base block"
          >
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={NumberofItems}
            onChange={(e) => setNumberofItems(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded text-base focus:outline-none focus:border-blue-500"
          />
        </div>
        <p>Sorry for the inconvenience. We are having Cash-on-delivery..</p>
        {addresses.length > 0 && (
          <div className="text-gray-700 text-base mb-4">
            <p className="mb-2">
              <strong>Select Address:</strong>
            </p>
            {addresses.map((address, index) => (
              <label
                key={index}
                htmlFor={`address-${index}`}
                className="flex items-center mb-2"
              >
                <input
                  type="radio"
                  id={`address-${index}`}
                  name="address"
                  value={index}
                  checked={selectedAddress === address}
                  onChange={() => setSelectedAddress(address)}
                  className="mr-2"
                />
                <div className="ml-2">
                  <p className="font-medium">{address.name}</p>
                  <p>
                    {address.locality}, {address.landmark}
                  </p>
                  <p>
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                  <p>Phone: {address.phone}</p>
                </div>
              </label>
            ))}
          </div>
        )}
        <div className="flex justify-center">
          <button
            onClick={() => handleBuyConfirm()}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 text-base"
          >
            Confirm Purchase
          </button>
          <button
            onClick={() => setIsAddressFormOpen(true)}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2 text-base"
          >
            Add Another Address
          </button>
          <button
            onClick={handleCloseModal}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-base"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )}
  {isAddressFormOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <AddressForm
          userEmail={userEmail}
          onAddressSubmit={handleAddressFormSubmit}
          onCancel={() => setIsAddressFormOpen(false)}
        />
      </div>
    </div>
  )}
  {showSuccessMessage && (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-md mx-auto my-6">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="p-5 border-b border-solid border-gray-300 text-center">
            <FaCheckCircle className="text-green-500 mx-auto" size={64} />
            <h3 className="text-2xl font-semibold mt-4">
              Purchase Successful!
            </h3>
          </div>
        </div>
      </div>
    </div>
  )}
</>  );
};

export default BookCard;
