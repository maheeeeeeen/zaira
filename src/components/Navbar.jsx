import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

function Navbar({ onOpenCart }) {
  const { cartCount } = useCart();

  return (
    <nav className="sticky top-0 z-40 bg-[#0B0B0B]/80 backdrop-blur-md border-b border-gray-950 px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* 👑 BRAND LOGO */}
        <Link to="/" className="text-lg font-light tracking-[0.3em] uppercase text-white hover:text-[#C5A880] transition-colors">
          ZAIRA
        </Link>

        {/* 🧭 NAVIGATION LINKS */}
        <div className="hidden sm:flex gap-8 text-[10px] tracking-[0.3em] uppercase text-gray-400">
          <Link to="/shop" className="hover:text-white transition-colors">
            Collection
          </Link>
          <Link to="/story" className="hover:text-white transition-colors">
            Our Story
          </Link>
          <Link to="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>

        {/* 🛍️ INTERACTIVE CART TRIGGER */}
        <button 
          onClick={onOpenCart} 
          className="relative text-[10px] tracking-[0.2em] uppercase text-[#C5A880] hover:text-white transition-colors flex items-center gap-2 focus:outline-none"
        >
          <span>Shopping Bag</span>
          <span className="bg-[#121212] border border-gray-900 text-white rounded-full w-5 h-5 flex items-center justify-center text-[9px] font-medium tracking-none">
            {cartCount}
          </span>
        </button>

      </div>
    </nav>
  );
}

export default Navbar;