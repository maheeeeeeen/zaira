import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#070707] border-t border-gray-950 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] tracking-[0.3em] uppercase text-gray-600">
        <div>
          © 2026 ZAIRA Studio. All Coordinates Reserved.
        </div>
        <div className="flex gap-8">
          <Link to="/shop" className="hover:text-[#C5A880] transition-colors">Collection</Link>
          <Link to="/story" className="hover:text-[#C5A880] transition-colors">Story</Link>
          <Link to="/contact" className="hover:text-[#C5A880] transition-colors">Contact Hub</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;