import { useState } from "react"; 
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser"; 

function Home() {
  const [emailInput, setEmailInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🖼️ The Curated Lookbook Cards Grid Array
  const lookbookHighlights = [
    {
      id: "featured-1",
      title: "Asymmetric Outerwear",
      subtitle: "Collection 01",
      img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop",
      tag: "Limited Release"
    },
    {
      id: "featured-2",
      title: "Midnight Essentia",
      subtitle: "Minimalist Layering",
      img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop",
      tag: "New Drops"
    }
  ];

  // 🚀 Live newsletter handler function
  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 🚀 FIXED: Initialize using your secure environment variable
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY); 

    const templateParams = {
      user_email: emailInput,
      user_name: "New Subscriber Hub Node",
      delivery_address: "Newsletter Database Access",
      phone_number: "N/A",
      order_manifest: `New profile request added to matrix mailing pool: ${emailInput}`,
    };

    // 🚀 FIXED: Dispatched through your dynamic environment variable mappings
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, 
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, 
        templateParams
      )
      .then(
        () => {
          setIsSubmitting(false);
          alert("Exhibition subscription authorized successfully!");
          setEmailInput("");
        },
        (err) => {
          console.error("Subscription connection failed:", err);
          setIsSubmitting(false);
          alert("Submission gateway offline. Please check connectivity matrix.");
        }
      );
  };

  return (
    <div className="bg-[#0B0B0B] text-white min-h-screen font-light selection:bg-[#C5A880] selection:text-black">
      
      {/* 👑 PREMIUM HERO BANNER COMPONENT */}
      <section className="relative h-screen flex flex-col items-center justify-center p-6 overflow-hidden border-b border-gray-900">
        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C5A880]/5 rounded-full blur-[140px] pointer-events-none" />
        
        {/* Hero Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-[#0B0B0B] pointer-events-none" />

        <div className="text-center z-10 max-w-3xl px-4">
          <span className="text-[#C5A880] text-xs uppercase tracking-[0.5em] font-medium block mb-6 animate-pulse">
            Drop 01 — The Solstice Manifest
          </span>
          <h1 className="text-6xl md:text-9xl font-extralight tracking-[0.25em] uppercase text-white mb-6 leading-none">
            ZAIRA
          </h1>
          <p className="text-gray-400 font-light text-xs md:text-sm tracking-[0.4em] uppercase mb-12 max-w-xl mx-auto leading-relaxed">
            Architectural silhouettes crafted for modern geometry. <br />
            <span className="text-gray-600">Designed in Midnight Hues. Est. 2026.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              to="/shop" 
              className="px-12 py-4 border border-[#C5A880] text-[#C5A880] uppercase tracking-[0.3em] text-xs font-semibold hover:bg-[#C5A880] hover:text-black transition-all duration-500 ease-in-out shadow-xl"
            >
              Enter Exhibition
            </Link>
            <Link 
              to="/story" 
              className="text-xs uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-colors py-2 border-b border-transparent hover:border-white duration-300"
            >
              Our Philosophy
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none text-gray-600">
          <span className="text-[9px] uppercase tracking-[0.4em]">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gray-600 to-transparent" />
        </div>
      </section>

      {/* 🖼️ EDITORIAL SHOWCASE: LOOKBOOK GRID */}
      <section className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880]">Editorial Showcase</span>
            <h2 className="text-3xl font-extralight uppercase tracking-widest mt-2">The Curated Matrix</h2>
          </div>
          <Link to="/shop" className="text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-[#C5A880] transition-colors border-b border-gray-800 pb-1">
            Browse Entire Index →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {lookbookHighlights.map((item) => (
            <div key={item.id} className="group cursor-pointer relative overflow-hidden bg-[#121212] border border-gray-950 p-4 hover:border-gray-800 transition-all duration-500">
              <div className="overflow-hidden aspect-[4/5] mb-6">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale contrast-115 transition-transform duration-1000 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">{item.subtitle}</span>
                  <h3 className="text-lg font-light uppercase tracking-wide text-white group-hover:text-[#C5A880] transition-colors">{item.title}</h3>
                </div>
                <span className="text-[10px] uppercase tracking-widest border border-gray-900 px-3 py-1 bg-[#0F0F0F] text-[#C5A880]">
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 📧 LIVE NEWSLETTER COMPONENT WITH PARENT CENTERING RULES */}
      <section className="flex flex-col items-center justify-center border-t border-gray-950 bg-[#0E0E0E] py-24 px-6 relative overflow-hidden">
        <div className="max-w-xl mx-auto text-center relative z-10">
          <h3 className="text-2xl font-extralight tracking-widest uppercase mb-4">
            Studio Manifest updates
          </h3>
          <p className="text-gray-500 text-xs text-center tracking-wider mb-8 leading-relaxed max-w-sm mx-auto">
            Subscribe to receive priority access notices on future private drops
            and studio exhibitions.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-2 border border-gray-900 p-2 bg-[#121212]"
          >
            <input
              required
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="ENTER EMAIL SPECIFICATION"
              className="bg-transparent text-xs tracking-widest p-3 text-white flex-1 focus:outline-none placeholder:text-gray-700"
            />
            <button
              disabled={isSubmitting}
              type="submit"
              className="bg-[#C5A880] text-black text-xs font-semibold tracking-widest uppercase px-8 py-3 hover:bg-[#b3966e] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "TRANSMITTING..." : "Subscribe"}
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}

export default Home;