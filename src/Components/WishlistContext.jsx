import React, { createContext, useState, useContext, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const handleWishlistChange = () => {
      setWishlistCount((prev) => prev + 1); // Dummy increment, replace with actual logic
    };

    window.addEventListener('wishlistChange', handleWishlistChange);

    return () => {
      window.removeEventListener('wishlistChange', handleWishlistChange);
    };
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlistCount, setWishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
