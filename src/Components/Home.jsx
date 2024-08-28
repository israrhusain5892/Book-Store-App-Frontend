// App.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa"; // Import the search icon
import HeroCarousel from "./courasel/HeroCourasel";
import Navbar from "./Navbar";
import BookCard from "./BookCard";
import BookDonationPage from "./DonatePage";
import Footer from "./Footer";
import Reviews from "./Reviews"
import ImageGallery from "./Imagegallery"

const App = () => {
  const [booksByGenre, setBooksByGenre] = useState({});
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [expandedBook, setExpandedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered books

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("https://books-api-lz0r.onrender.com/books");
        const publishers = response.data;

        // Flatten the books array from all publishers and include publication and publisher details in each book object
        const books = publishers.reduce((acc, publisher) => {
          if (
            !publisher.publications ||
            !Array.isArray(publisher.publications)
          ) {
            console.warn(
              `Publisher ${publisher.publisherName} has no publications or publications is not an array`
            );
            return acc;
          }

          return acc.concat(
            publisher.publications.reduce((pubAcc, publication) => {
              if (
                !publication.publishedBooks ||
                !Array.isArray(publication.publishedBooks)
              ) {
                console.warn(
                  `Publication by ${publication.author} in genre ${publication.genre} has no publishedBooks or publishedBooks is not an array`
                );
                return pubAcc;
              }

              const booksWithDetails = publication.publishedBooks.map(
                (book) => ({
                  ...book,
                  author: publication.author,
                  genre: publication.genre,
                  publisherName: publisher.publisherName,
                })
              );
              return pubAcc.concat(booksWithDetails);
            }, [])
          );
        }, []);

        const groupedBooks = books.reduce((acc, book) => {
          const { genre } = book;
          if (!acc[genre]) {
            acc[genre] = [];
          }
          acc[genre].push(book);
          return acc;
        }, {});

        setBooksByGenre(groupedBooks);
        setFilteredBooks(books); // Set filtered books to all books initially
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    const fetchUserInfo = async () => {
      if (!token) return;

      try {
        const response = await axios.get("https://books-api-lz0r.onrender.com/user/token", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { userId } = response.data;
        setUserId(userId);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchBooks();
    fetchUserInfo();
  }, [token]);

  const handleExpand = (bookId) => {
    setExpandedBook(expandedBook === bookId ? null : bookId);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    if (query === "") {
      // If the search query is empty, reset the filtered books to all books
      setFilteredBooks(Object.values(booksByGenre).flat());
    } else {
      const filtered = Object.values(booksByGenre)
        .flat()
        .filter(
          (book) =>
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query)
        );
      setFilteredBooks(filtered);
    }
  };

  const slides = [
    {
      image: "https://wallpaperaccess.com/full/464334.jpg",
      title: "Explore New Arrivals",
      subtitle:
        "Discover the latest additions to our collection. Stay ahead with the newest releases in fiction, non-fiction, and more. Find your next great read among our curated selection of new books.",
      buttonText: "Browse New Arrivals",
      link: "/new-arrivals",
    },
    {
      image: "https://wallpaperaccess.com/full/9457868.jpg",
      title: "Top Bestsellers",
      subtitle:
        "Check out the books everyone is talking about. Our bestsellers section features the most popular and highly acclaimed titles in various genres. Don't miss out on these must-read books.",
      buttonText: "Shop Bestsellers",
      link: "/bestsellers",
    },
    {
      image: "https://wallpaperaccess.com/full/464143.jpg",
      title: "Exclusive Discounts",
      subtitle:
        "Save big on your favorite books with our exclusive offers and discounts. From special promotions to seasonal sales, find great deals on a wide range of titles.",
      buttonText: "View Offers",
      link: "/offers",
    },
  ];
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <HeroCarousel slides={slides} />

        <div className="container mx-auto px-4 py-8">
          <div className="relative mb-8">
            <div className="w-1/2 mx-auto mt-8 mb-8">
            <div className="flex items-center justify-center z-50">
      <motion.h1
        initial={{ y: -100, scale: 0.8, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 120 }}
        style={{ color: "#bd9f67", fontFamily: "Dancing Script, cursive" }}
        className="text-8xl font-extrabold text-gray-900 mb-8 text-center"
      >
        The Book Vault
      </motion.h1>
    </div>

              <div className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search here... by book name or author"
                  className="bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-pink-400 outline-none duration-300 placeholder:text-zinc-600 placeholder-opacity-50 rounded-full px-4 py-2 shadow-md focus:shadow-lg focus:shadow-pink-400 dark:shadow-md dark:shadow-purple-500 w-full"
                />
                <span className="rounded-full bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-rose-400 outline-none duration-300 placeholder:text-zinc-600 placeholder-opacity-50 focus:rounded-full px-2 py-2 rotate-45 ml-2 shadow-md focus:shadow-lg focus:shadow-rose-400 dark:shadow-md dark:shadow-purple-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6"
                    viewBox="0 0 128 128"
                  >
                    <path
                      fill="#CA2C31"
                      d="m3.77 71.73l16.34-16.1 27.82-4.93-2.75 14.56-39.02 5.29-2.43-1.05z"
                    ></path>
                    <path
                      fill="#A02422"
                      d="M22.94 59.76L5.2 75.88l13.05 6.36 19.81-10.11v-4.77l4.05-10.92zm41.98 28.39l-8.57 3.72-8.09 17.15s7.12 15.77 7.44 15.77c.32 0 4.37.32 4.37.32l14.4-16.1 3.64-27.5-13.19 6.64z"
                    ></path>
                    <path
                      fill="#CA2C31"
                      d="M56.5 100.84s4.77-.97 8.17-2.59c3.4-1.62 7.6-4.04 7.6-4.04l-1.54 13.43-15.05 17.13s-.59-.73-3.09-6.17c-1.99-4.34-2.68-5.89-2.68-5.89l6.59-11.87z"
                    ></path>
                    <path
                      fill="#F7D74D"
                      d="M31.58 80.66s-5.74-.48-12.03 7.47c-5.74 7.26-8.43 19.08-9.47 22.12s-3.53 3.66-2.7 5.05 4.42 1.31 8.85.76 8.23-1.94 8.23-1.94-.19.48-.83 1.52c-.23.37-1.03.9-.97 1.45  .14 1.31 11.36 1.34 20.32-7.88 9.68-9.95 4.98-18.11 4.98-18.11L31.58 80.66z"
                    ></path>
                    <path
                      fill="#FBF0B4"
                      d="M33.31 85.29s-6.19.33-11.31 8.28-7.5 17.16-7.01 17.78c.48.62 10.02-2.83 12.31-2.14 1.57.48.76 2.07 1.18 2.49.35.35 4.49.94 11.19-6.32 6.71-7.26 5.12-17.46 5.12-17.46l-11.48-2.63z"
                    ></path>
                    <path
                      fill="#858585"
                      d="M36.35 74.44s-3.11 2.77-4.22 4.36c-1.11 1.59-1.11 1.73-1.04 2.21.07.48 1.22 5.75 6.01 10.37 5.88 5.67 11.13 6.43 11.89 6.43.76 0 5.81-5.67 5.81-5.67l-18.45-17.7z"
                    ></path>
                    <path
                      fill="#437687"
                      d="M50.1 91.24s5.04 3.31 13.49.47c11.55-3.88 20.02-12.56 30.51-23.52 10.12-10.58 18.61-23.71 18.61-23.71l-5.95-19.93-46.66 66.69z"
                    ></path>
                    <path
                      fill="#3F545F"
                      d="m67.99 80.33l1.39-4.32 3.48.49s2.65 1.25 4.6 2.16c1.95.91 4.46 1.6 4.46 1.6l-4.95 4.18s-2.7-1.02-4.67-1.88c-2.22-.97-4.31-2.23-4.31-2.23z"
                    ></path>
                    <path
                      fill="#8DAFBF"
                      d="M84.32 16.14s-9.62 5.58-23.41 18.63c-12.43 11.76-21.64 22.4-23.87 31.45-1.86 7.58-.87 12.18 3.36 17.15 4.47 5.26 9.71 7.87 9.71 7.87s3.94.06 20.38-12.59c11.11-11.89 27.54-38.33 27.54-38.33L84.32 16.14z"
                    ></path>
                    <path
                      fill="#D83F22"
                      d="M104.18 41.84s-8.37-3.57-14.34-11.9c-5.93-8.27-5.46-13.86-5.46-13.86s4.96-3.89 16.11-8.34c7.5-2.99 17.71-4.52 21.07-2.03s-2.3 14.98-2.3 14.98l-10.31 19.96-4.77 1.19z"
                    ></path>
                    <path
                      fill="#6896A5"
                      d="M68.17 80.4s-7.23-3.69-11.83-8.94c-8.7-9.91-10.5-20.79-10.5-20.79l4.37-5.13s7.88 16.26 17.21 26.25c6.08 6.51 12.43 9.49 12.43 9.49s-1.27 1.07-2.63 2.11c-.87.67-2.26 1.71-2.26 1.71z"
                    ></path>
                    <path
                      fill="#A02422"
                      d="M112.71 44.48s4.34-5.23 8.45-17.02c5.74-16.44.74-21.42.74-21.42s-1.69 7.82-7.56 18.69c-4.71 8.71-10.41 17-10.41 17s3.14 1.41 4.84 1.9c2.14.62 3.94.85 3.94.85z"
                    ></path>
                    <path
                      fill="#B3E1EE"
                      d="M39.81 69.66c1.3 1.24 3.27-.06 4.56-3.1 1.3-3.04 1.28-4.74.28-5.46-1.24-.9-3.32 1.07-4.23 2.82-1 1.94-1.59 4.8-.61 5.74zm45.14-49.53s-7.61 5.47-15.73 12.91c-7.45 6.83-12.39 12.17-13.07 13.41-.72 1.33-.73 3.21-.17 4.17s1.8 1.46 2.93.62c1.13-.85 9.18-9.75 16.45-16.11 6.65-5.82 11.78-9.51 11.78-9.51s2.08-3.68 1.74-4.52c-.34-.85-3.93-.97-3.93-.97z"
                    ></path>
                    <path
                      fill="#ED6A65"
                      d="M84.95 20.13s5.62-4.31 11.74-7.34c5.69-2.82 11.35-5.17 12.37-3.13.97 1.94-5.37 4.58-10.95 8.14-5.58 3.56-10.95 7.81-10.95 7.81s-.82-1.5-1.35-2.89a23.7 23.7 0 0 1-.86-2.59z"
                    ></path>
                    <path
                      fill="#E1E1E1"
                      d="M89.59 39.25c-5.57-5.13-13.32-3.75-17.14.81-3.92 4.7-3.63 11.88 1 16.2 4.21 3.92 12.04 4.81 16.76-.69 4.2-4.88 3.94-12.13-.62-16.32z"
                    ></path>
                    <path
                      fill="#3F545F"
                      d="M75.33 41.87c-3.31 3.25-3.13 9.69.81 12.63 3.44 2.57 8.32 2.44 11.38-.69 3.06-3.13 3.06-8.82.19-11.76-3.3-3.37-8.59-3.9-12.38-.18z"
                    ></path>
                    <path
                      fill="#A02524"
                      d="M50 76.89s6.19-6.28 6.87-5.6c.68.68.59 4.49-2.37 8.73-2.97 4.24-9.5 11.79-14.67 16.88-5.1 5.01-12.29 10.74-12.97 10.64-.53-.08-2.68-1.15-3.54-2.19-.84-1.03 1.67-5.9 2.68-7.51 1.02-1.61 24-20.95 24-20.95z"
                    ></path>
                    <path
                      fill="#CA2C31"
                      d="M21.23 101.85c-.08 1.44 2.12 3.54 2.12 3.54L56.87 71.3s-1.57-1.77-6.19 1.1c-4.66 2.9-8.74 6.38-14.76 12.21c-8.39 8.14-14.61 15.8-14.69 17.24z"
                    ></path>
                    <path
                      fill="#FFF"
                      d="M19.06 36.95c-1.11 1.11-1.16 2.89.08 3.91 1.1.91 2.89.32 3.56-.5s.59-2.6-.3-3.48c-.89-.89-2.66-.6-3.34.07z"
                    ></path>
                    <path
                      fill="#FFF"
                      d="M41.02 35.65c-.84.93-.57 2.31.21 2.82s1.95.46 2.52-.24c.51-.63.57-1.89-.21-2.67-.68-.67-1.98-.51-2.52.09z"
                      opacity=".5"
                    ></path>
                    <path
                      fill="#FFF"
                      d="M55.55 11.89s1.22-3.48 1.94-3.52c.73-.04 1.78 3.48 1.78 3.48s3.61.04 3.85.57c.31.68-2.31 2.96-2.31 2.96s.85 3.4.45 3.81c-.45.45-3.56-1.34-3.56-1.34s-3.2 2.23-3.89 1.62c-.6-.53.65-4.13.65-4.13s-3-2.19-2.84-2.8c.23-.86 3.93-.65 3.93-.65zm41.46 83.44c1.21.67 2.73.29 3.29-1 .51-1.15-.43-2.52-1.28-2.89-.85-.37-2.34.12-2.88 1.09-.53.96.14 2.4.87 2.8zm17.18-29.49c-.69-1.07-2.18-1.42-3.15-.56-.94.84-.71 2.16-.18 2.83.53.67 1.95.92 2.81.37s.94-2 .52-2.64z"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-center">
            Featured Books by Genre
          </h2>
          {Object.keys(booksByGenre).map(
            (genre) =>
              // Check if there are filtered books for the current genre before rendering
              filteredBooks.some((book) => book.genre === genre) && (
                <div key={genre} className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-center">
                    {genre}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 lg:grid-cols-4 gap-4 justify-center">
                    {filteredBooks
                      .filter((book) => book.genre === genre)
                      .map((book) => (
                        <motion.div
                          key={book._id}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.5 }}
                        >
                          <BookCard
                            key={book._id}
                            book={book}
                            token={token}
                            isExpanded={expandedBook === book._id}
                            onExpand={() => handleExpand(book._id)}
                          />
                        </motion.div>
                      ))}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
     <Reviews/>
     <motion.h1
        initial={{ y: -100, scale: 0.8, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 120 }}
        style={{ color: "#bd9f67", fontFamily: "Dancing Script, cursive" }}
        className="text-8xl font-extrabold text-gray-900 mb-8 text-center"
      >
        Our Authors Gallery
      </motion.h1>
     <ImageGallery/>
<BookDonationPage/>
      <Footer />
    </>
  );
};

export default App;
