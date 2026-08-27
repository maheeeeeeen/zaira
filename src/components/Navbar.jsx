import { Link, useLocation } from "react-router-dom";
import { useCart } from "./CartContext";

function Navbar() {
  const { cart } = useCart();
  const location = useLocation();

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <header className="sticky top-0 z-50 bg-[#0B0B0B]/95 backdrop-blur-md border-b border-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-12 h-20 flex items-center justify-between relative">
        
        {/* Left Navigation Links */}
        <nav className="flex items-center space-x-6 md:space-x-8 text-[11px] uppercase tracking-[0.25em] font-light text-gray-400">
          <Link
            to="/"
            className={`hover:text-[#C5A880] transition-colors ${
              location.pathname === "/" ? "text-white font-normal" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={`hover:text-[#C5A880] transition-colors ${
              location.pathname.startsWith("/shop") ? "text-white font-normal" : ""
            }`}
          >
            Collection
          </Link>
          <Link
            to="/story"
            className="hidden sm:inline-block hover:text-[#C5A880] transition-colors"
          >
            Our Story
          </Link>
          <Link
            to="/contact"
            className={`hidden sm:inline-block hover:text-[#C5A880] transition-colors ${
              location.pathname === "/contact" ? "text-white font-normal" : ""
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Center Brand Logo */}
        <div className="text-center absolute left-1/2 -translate-x-1/2">
          <Link
            to="/"
            className="text-2xl md:text-3xl font-extralight tracking-[0.35em] text-white hover:text-[#C5A880] transition-colors uppercase"
          >
            ZAIRA
          </Link>
        </div>

        {/* Right Cart Counter */}
        <div className="flex items-center space-x-4">
          <Link
            to="/checkout"
            className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors"
            aria-label="View Bag"
          >
            <span className="hidden sm:inline-block">Shopping Bag</span>
            <span className="text-[#C5A880] font-medium">({totalItems})</span>
          </Link>
        </div>

      </div>
    </header>
  );
}

export default Navbar;