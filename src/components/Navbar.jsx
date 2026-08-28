import { Link, useLocation } from "react-router-dom";
import { useCart } from "./CartContext";

function Navbar() {
  const { cart } = useCart();
  const location = useLocation();

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <header className="sticky top-0 z-50 bg-[#0B0B0B] border-b border-[#1f1f1f] text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-12 h-16 md:h-20 flex items-center justify-between relative">
        
        {/* Mobile: Left Logo | Desktop: Left Links */}
        <div className="flex items-center">
          <Link
            to="/"
            className="md:hidden text-lg font-light tracking-[0.3em] text-white hover:text-[#C5A880] transition-colors uppercase"
          >
            ZAIRA
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-[11px] uppercase tracking-[0.25em] font-medium text-neutral-400">
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
              className="hover:text-[#C5A880] transition-colors"
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
        </div>

        {/* Desktop Only: Centered Brand Logo */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 text-center">
          <Link
            to="/"
            className="text-2xl md:text-3xl font-extralight tracking-[0.35em] text-white hover:text-[#C5A880] transition-colors uppercase"
          >
            ZAIRA
          </Link>
        </div>

        {/* Mobile Navigation Links + Shopping Bag */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <nav className="flex md:hidden items-center space-x-4 text-[10px] uppercase tracking-[0.2em] font-medium text-neutral-400">
            <Link
              to="/shop"
              className={`hover:text-[#C5A880] transition-colors ${
                location.pathname.startsWith("/shop") ? "text-white font-semibold" : ""
              }`}
            >
              Shop
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

          <Link
            to="/checkout"
            className="flex items-center space-x-1.5 text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.25em] text-neutral-300 hover:text-[#C5A880] transition-colors"
          >
            <span className="hidden sm:inline-block">Shopping Bag</span>
            <span className="sm:hidden">Bag</span>
            <span className="text-[#C5A880] font-semibold">({totalItems})</span>
          </Link>
        </div>

      </div>
    </header>
  );
}

export default Navbar;