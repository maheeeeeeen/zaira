import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail"; // Import the new view page
import Checkout from "./pages/Checkout"; // 🚀 Import checkout

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          {/* The ':id' tells React Router that this segment is a dynamic variable variable parameter */}
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />{" "}
          {/* 🚀 Added Route */}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
