import { useState } from "react"; // 🚀 Added to manage the side drawer state
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Story from "./pages/Story";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar"; // 🚀 Imported
import CartSidebar from "./components/CartSidebar"; // 🚀 Bring in your sliding drawer panel
import Footer from "./components/Footer";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false); // Sidebar control node

  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#0B0B0B]">
          {/* 🚀 Uniform Navbar displayed on top of every page layout */}
          <Navbar onOpenCart={() => setIsCartOpen(true)} />

          {/* 🚀 Sliding checkout drawer container layer */}
          <CartSidebar
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
          />

          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route
                path="/product/:id"
                element={
                  <ProductDetail onProductAdded={() => setIsCartOpen(true)} />
                }
              />{" "}
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/story" element={<Story />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
