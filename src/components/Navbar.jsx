import { Link, useLocation } from "react-router-dom";
import { useCart } from "./CartContext";

function Navbar() {
  const { cart } = useCart();
  const location = useLocation();

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <header className="sticky top-0 z-50 bg-[#0B0B0B] border-b border-[#1f1f1f] text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-12 h-20 flex items-center justify-between relative">
        
        {/* Left Navigation Links */}
        <nav className="flex items-center space-x-6 md:space-x-8 text-[11px] uppercase tracking-[0.25em] font-medium text-neutral-400">
          <Link
            to="/shop"
            className={`hover:text-[#C5A880] transition-colors ${
              location.pathname.startsWith("/shop") ? "text-white font-semibold" : ""
            }`}
          >
            Collection
          </Link>
          <Link
            to="/story"
            className="hover:text-[#C5A880] transition-colors hidden sm:inline-block"
          >
            Our Story
          </Link>
          <Link
            to="/contact"
            className={`hover:text-[#C5A880] transition-colors ${
              location.pathname === "/contact" ? "text-white font-semibold" : ""
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Center Brand Logo (Home Link) */}
        <div className="text-center absolute left-1/2 -translate-x-1/2">
          <Link
            to="/"
            className="text-2xl md:text-3xl font-extralight tracking-[0.35em] text-white hover:text-[#C5A880] transition-colors uppercase block"
          >
            ZAIRA
          </Link>
        </div>

        {/* Right Shopping Bag Link */}
        <div className="flex items-center space-x-3">
          <Link
            to="/checkout"
            className="flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-neutral-300 hover:text-[#C5A880] transition-colors"
          >
            <span className="hidden sm:inline-block">Shopping Bag</span>
            <span className="text-[#C5A880] font-semibold">({totalItems})</span>
          </Link>
        </div>

      </div>
    </header>
  );
}

export default Navbar;