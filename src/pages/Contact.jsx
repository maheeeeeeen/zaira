import { useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

    const templateParams = {
      user_name: formData.name,
      user_email: formData.email,
      delivery_address: "Direct Atelier Contact Node",
      phone_number: "N/A",
      order_manifest: `Direct Message: ${formData.message}`,
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      )
      .then(
        () => {
          setIsSubmitting(false);
          alert("Transmission secure. Message recorded.");
          setFormData({ name: "", email: "", message: "" });
        },
        (err) => {
          console.error("Transmission failed:", err);
          setIsSubmitting(false);
          alert("Transmission failed. Please check network matrix.");
        }
      );
  };

  return (
    <div className="bg-[#0B0B0B] text-white min-h-screen p-6 md:p-16">
      <nav className="max-w-5xl mx-auto w-full mb-16">
        <Link to="/" className="text-xs uppercase tracking-[0.3em] text-gray-500 hover:text-[#C5A880] transition-colors">
          ← Return to Core Space
        </Link>
      </nav>

      <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-xs uppercase tracking-[0.4em] text-[#C5A880] block mb-2">Inquiries Matrix</span>
          <h1 className="text-4xl font-extralight tracking-wide uppercase text-white mb-8">Connect With Us</h1>
          
          <div className="space-y-8 text-sm font-light tracking-wide">
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-1">General Operations Logistics</h3>
              <p className="text-gray-300">studio@zaira.com</p>
            </div>
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-1">Direct Communication Hub</h3>
              <p className="text-[#C5A880] font-medium">+92 303 5840613</p>
            </div>
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-1">Primary Design Atelier Location</h3>
              <p className="text-gray-300 leading-relaxed">
                Coordinates Desk Node 2F 0/0 <br />
                Karachi, Sindh, Pakistan
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#121212] border border-gray-900 p-8">
          <h3 className="text-sm uppercase tracking-widest text-white mb-6">Direct Terminal Transmission</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              required
              type="text"
              placeholder="YOUR NAME"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#0B0B0B] border border-gray-950 p-3 text-xs tracking-widest focus:outline-none focus:border-[#C5A880] text-white"
            />
            <input
              required
              type="email"
              placeholder="EMAIL POOL NODE"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#0B0B0B] border border-gray-950 p-3 text-xs tracking-widest focus:outline-none focus:border-[#C5A880] text-white"
            />
            <textarea
              required
              rows="4"
              placeholder="MESSAGE COMPOSITION..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-[#0B0B0B] border border-gray-950 p-3 text-xs tracking-widest focus:outline-none focus:border-[#C5A880] text-white resize-none"
            ></textarea>
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full py-3 bg-[#C5A880] text-black font-semibold uppercase tracking-widest text-xs hover:bg-[#b3966e] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "TRANSMITTING..." : "Dispatch Message"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Contact;