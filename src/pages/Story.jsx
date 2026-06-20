import { Link } from "react-router-dom";

function Story() {
  return (
    <div className="bg-[#0B0B0B] text-white min-h-screen p-6 md:p-16 flex flex-col justify-between">
      <nav className="max-w-4xl mx-auto w-full mb-16">
        <Link to="/" className="text-xs uppercase tracking-[0.3em] text-gray-500 hover:text-[#C5A880] transition-colors">
          ← Return to Core Space
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto w-full flex-1 flex flex-col justify-center py-12">
        <span className="text-xs uppercase tracking-[0.5em] text-[#C5A880] mb-4 block font-medium">Philosophy</span>
        <h1 className="text-4xl md:text-6xl font-extralight tracking-wide uppercase text-white mb-10 leading-tight">
          Architectural Wear <br />For Minimalist Living
        </h1>
        
        <div className="space-y-6 text-gray-400 text-sm font-light tracking-wide leading-relaxed">
          <p>
            ZAIRA Studio was founded in 2026 as an exploration of clean geometry and monochrome composition. We reject fast-paced industrial trends, choosing instead to design structured pieces that serve as everyday wearable architecture.
          </p>
          <p>
            Every silhouette goes through dynamic revisions to remove extraneous clutter, leaving behind pure form, crisp structural lines, and midnight hues.
          </p>
          <p className="text-[#C5A880]/80 italic pt-4">
            "We do not construct apparel. We map coordinates on fabric." — ZAIRA Director
          </p>
        </div>

        <div className="mt-12">
          <Link to="/shop" className="inline-block px-10 py-4 bg-transparent border border-gray-800 text-white text-xs uppercase tracking-widest hover:border-[#C5A880] hover:text-[#C5A880] transition-colors">
            Explore Collection Matrix
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Story;