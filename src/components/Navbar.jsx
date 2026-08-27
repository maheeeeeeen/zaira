// import { Link } from "react-router-dom";
// import { useCart } from "./CartContext";

// function Navbar({ onOpenCart }) {
//   const { cartCount } = useCart();

//   return (
//     <nav className="sticky top-0 z-40 bg-[#0B0B0B]/80 backdrop-blur-md border-b border-gray-950 px-6 py-4">
//       <div className="max-w-6xl mx-auto flex justify-between items-center">
        
//         {/* 👑 BRAND LOGO */}
//         <Link to="/" className="text-lg font-light tracking-[0.3em] uppercase text-white hover:text-[#C5A880] transition-colors">
//           ZAIRA
//         </Link>

//         {/* 🧭 NAVIGATION LINKS */}
//         <div className="hidden sm:flex gap-8 text-[10px] tracking-[0.3em] uppercase text-gray-400">
//           <Link to="/shop" className="hover:text-white transition-colors">
//             Collection
//           </Link>
//           <Link to="/story" className="hover:text-white transition-colors">
//             Our Story
//           </Link>
//           <Link to="/contact" className="hover:text-white transition-colors">
//             Contact
//           </Link>
//         </div>

//         {/* 🛍️ INTERACTIVE CART TRIGGER */}
//         <button 
//           onClick={onOpenCart} 
//           className="relative text-[10px] tracking-[0.2em] uppercase text-[#C5A880] hover:text-white transition-colors flex items-center gap-2 focus:outline-none"
//         >
//           <span>Shopping Bag</span>
//           <span className="bg-[#121212] border border-gray-900 text-white rounded-full w-5 h-5 flex items-center justify-center text-[9px] font-medium tracking-none">
//             {cartCount}
//           </span>
//         </button>

//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { Link, useLocation } from "react-router-dom";
import { useCart } from "./CartContext";

function Navbar() {
  const { cart } = useCart();
  const location = useLocation();

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <header className="sticky top-0 z-50 bg-[#0B0B0B]/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 md:px-12 h-20 flex items-center justify-between">
        
        {/* Left Navigation Links */}
        <nav className="flex items-center space-x-8 text-[11px] uppercase tracking-[0.25em] font-medium text-gray-700">
          <Link
            to="/"
            className={`hover:text-black transition-colors ${
              location.pathname === "/" ? "text-black font-semibold underline underline-offset-8" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={`hover:text-black transition-colors ${
              location.pathname.startsWith("/shop") ? "text-black font-semibold underline underline-offset-8" : ""
            }`}
          >
            Shop
          </Link>
          <Link
            to="/shop"
            className="hidden sm:inline-block hover:text-black transition-colors"
          >
            Collection
          </Link>
          <Link
            to="/contact"
            className={`hidden sm:inline-block hover:text-black transition-colors ${
              location.pathname === "/contact" ? "text-black font-semibold underline underline-offset-8" : ""
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Center Brand Logo (Direct Home Link) */}
        <div className="text-center absolute left-1/2 -translate-x-1/2">
          <Link
            to="/"
            className="text-2xl md:text-3xl font-light tracking-[0.35em] text-black hover:opacity-80 transition-opacity uppercase"
          >
            ZAIRA
          </Link>
        </div>

        {/* Right Cart Indicator */}
        <div className="flex items-center space-x-6">
          <Link
            to="/checkout"
            className="flex items-center space-x-2 text-black hover:opacity-75 transition-opacity"
            aria-label="View Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <span className="text-xs font-medium bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]">
              {totalItems}
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
}

export default Navbar;