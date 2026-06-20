import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-[#0B0B0B] text-white min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#C5A880]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="text-center z-10 max-w-2xl">
        <h1 className="text-7xl md:text-9xl font-extralight tracking-[0.3em] uppercase text-white mb-6 animate-pulse">
          ZAIRA
        </h1>
        <p className="text-gray-400 font-light text-sm md:text-base tracking-[0.5em] uppercase mb-12 leading-relaxed">
          ARCHITECTURAL SILHOUETTES <br />
          <span className="text-[#C5A880]/70 text-xs tracking-[0.3em]">EST. 2026</span>
        </p>

        <Link 
          to="/shop" 
          className="inline-block px-12 py-4 border border-[#C5A880] text-[#C5A880] uppercase tracking-[0.3em] text-xs font-semibold hover:bg-[#C5A880] hover:text-black transition-all duration-500 ease-in-out shadow-lg hover:shadow-[#C5A880]/20"
        >
          Enter Exhibition
        </Link>
      </div>

      <footer className="absolute bottom-8 text-center text-gray-600 text-[10px] tracking-[0.4em] uppercase">
        © 2026 ZAIRA Studio. All Rights Reserved.
      </footer>
    </div>
  );
}

export default Home;