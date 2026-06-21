import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // 💾 Lazy initial state: Read from browser local memory on startup
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("zaira_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 🔄 Automatic Synchronization Effect
  useEffect(() => {
    localStorage.setItem("zaira_cart", JSON.stringify(cart));
  }, [cart]);

  // Derived calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

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

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}