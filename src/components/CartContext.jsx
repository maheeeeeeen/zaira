import { createContext, useState, useContext } from "react";

// Create the empty global data container
const CartContext = createContext();

// Create the Provider component that holds the live state logic
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Function to safely add items or increment quantity if it's already there
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Function to remove an item completely
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Function to clear out the entire bag
  const clearCart = () => setCart([]);

  // Calculate total items currently in the bag
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook so any page can inject this cart context data instantly
export function useCart() {
  return useContext(CartContext);
}