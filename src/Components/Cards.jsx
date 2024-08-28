import React from "react";

const Card = (props) => {
  // Function to generate star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <svg
            key={i}
            className="h-5 w-5 text-yellow-500 inline"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.964a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.372 2.447a1 1 0 00-.364 1.118l1.287 3.964c.3.921-.755 1.688-1.538 1.118L10 13.347l-3.374 2.447c-.783.57-1.838-.197-1.538-1.118l1.287-3.964a1 1 0 00-.364-1.118L2.639 9.39c-.783-.57-.381-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.964z" />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="h-5 w-5 text-gray-400 inline"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a1 1 0 01-.65-.24l-6.5-5.5a1 1 0 01-.18-1.4l2.5-3a1 1 0 011.4-.18L10 13.34l5.48-4.64a1 1 0 111.32 1.49l-6 5a1 1 0 01-.81.15l-4.5-1.5a1 1 0 01-.61-.65L3 5.76V6a1 1 0 11-2 0V4a1 1 0 011-1h2a1 1 0 010 2H3v2.16l2.79 1.4 4.1 1.37a1 1 0 01.64.65l.36 1.09a1 1 0 01-.39 1.11l-7 5a1 1 0 01-.75.14z"
              clipRule="evenodd"
            />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div className="m-2 p-6 relative transition-transform duration-500 text-beige bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 rounded-lg shadow-lg">
      <img
        src={props.img}
        alt=""
        className="h-28 w-28 mb-4 shadow-md border-2 border-white rounded-full mx-auto"
      />
      <p className="text-base  text-left font-semi-bold mb-6">{props.des}</p>
      <h2 className="text-lg font-semi-bold mb-2">{props.name}</h2>
      <div className="flex items-center">{renderStars(props.ratings)}</div>
    </div>
  );
};

export default Card;
