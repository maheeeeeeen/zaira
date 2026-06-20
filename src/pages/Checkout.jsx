import { useState } from "react";
import { useCart } from "../components/CartContext";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser"; 

function Checkout() {
  const { cart, cartCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Shipping Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    phone: "",
  });

  if (cart.length === 0 && !orderSuccess) {
    return (
      <div className="bg-[#0B0B0B] text-white min-h-screen flex flex-col items-center justify-center p-6">
        <h2 className="text-xl font-light tracking-widest uppercase mb-4">
          Your bag is empty
        </h2>
        <Link
          to="/shop"
          className="text-xs uppercase tracking-widest text-[#C5A880] border border-[#C5A880] px-6 py-2 hover:bg-[#C5A880] hover:text-black transition-colors"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // 🚀 Initialize your public key context layer before dispatching
    emailjs.init("QqJNlrhDs0Ifr2Yn7");

    // Format your shopping bag array into a clean text manifest list for the email body
    const manifestText = cart
      .map((item) => `${item.title.rendered} (QTY: ${item.quantity})`)
      .join(", ");

    // Package the form parameters exactly matching your EmailJS Template layout fields
    const templateParams = {
      user_name: formData.fullName,
      user_email: formData.email,
      delivery_address: `${formData.address}, ${formData.city}`,
      phone_number: formData.phone,
      order_manifest: manifestText,
    };

    // Send the live transaction payload direct to your mail delivery service
    emailjs
      .send(
        "service_wcf6xp9",  
        "template_l524zmc", 
        templateParams
      )
      .then(
        (response) => {
          console.log("Email dispatched successfully!", response.status, response.text);
          setIsProcessing(false);
          setOrderSuccess(true);
          clearCart(); // Safely flush the bag on success
        },
        (err) => {
          console.error("EmailJS Detailed Server Error:", err);
          setIsProcessing(false);
          alert(`Transaction dispatch failure: ${err.text || "Check dashboard settings"}`);
        }
      );
  };

  if (orderSuccess) {
    return (
      <div className="bg-[#0B0B0B] text-white min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 border border-[#C5A880] rounded-full flex items-center justify-center mb-6 mx-auto">
          <span className="text-[#C5A880] text-2xl">✓</span>
        </div>
        <h1 className="text-3xl font-extralight tracking-[0.2em] uppercase mb-4">
          ORDER CONFIRMED
        </h1>
        <p className="text-gray-400 text-sm max-w-sm mx-auto mb-8 tracking-wide leading-relaxed">
          Your allocation transaction was processed successfully. A confirmation
          summary has been dispatched to {formData.email}.
        </p>
        <Link
          to="/shop"
          className="inline-block px-8 py-3 bg-[#C5A880] text-black font-semibold uppercase tracking-widest text-xs hover:bg-[#b3966e] transition-colors"
        >
          Continue Exploring
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0B0B] text-white min-h-screen p-6 md:p-16">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left Side: Editorial Shipping & Verification Form */}
        <div>
          <h2 className="text-xl font-light tracking-widest uppercase mb-8 border-b border-gray-900 pb-4">
            Shipping & Verification Details
          </h2>
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2">
                Full Name
              </label>
              <input
                required
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full bg-[#121212] border border-gray-900 p-3 text-sm text-white focus:outline-none focus:border-[#C5A880] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2">
                Email Address
              </label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-[#121212] border border-gray-900 p-3 text-sm text-white focus:outline-none focus:border-[#C5A880] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2">
                Delivery Address
              </label>
              <input
                required
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full bg-[#121212] border border-gray-900 p-3 text-sm text-white focus:outline-none focus:border-[#C5A880] transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2">
                  City
                </label>
                <input
                  required
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full bg-[#121212] border border-gray-900 p-3 text-sm text-white focus:outline-none focus:border-[#C5A880] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2">
                  Phone Number
                </label>
                <input
                  required
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-[#121212] border border-gray-900 p-3 text-sm text-white focus:outline-none focus:border-[#C5A880] transition-colors"
                />
              </div>
            </div>

            <button
              disabled={isProcessing}
              type="submit"
              className="w-full mt-8 py-4 bg-[#C5A880] text-black font-semibold uppercase tracking-widest text-xs hover:bg-[#b3966e] transition-all duration-300 flex items-center justify-center disabled:opacity-50"
            >
              {isProcessing
                ? "AUTHORIZING GATEWAY..."
                : "AUTHORIZE SECURE TRANSACTION"}
            </button>
          </form>
        </div>

        {/* Right Side: Manifest Order Summary */}
        <div className="bg-[#121212] border border-gray-900 p-6 h-fit">
          <h2 className="text-base font-light tracking-widest uppercase mb-6 text-[#C5A880]">
            Manifest Summary ({cartCount})
          </h2>
          <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 mb-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-gray-900 pb-3 text-xs tracking-wide"
              >
                <div>
                  <h4 className="text-white uppercase font-medium truncate max-w-[200px]">
                    {item.title.rendered}
                  </h4>
                  <p className="text-gray-500 text-[10px] mt-0.5">
                    QTY: {item.quantity}
                  </p>
                </div>
                <span className="text-gray-400 font-light">
                  Limited Allocation
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-900 pt-4 flex justify-between text-xs tracking-widest uppercase">
            <span className="text-gray-500">Logistics Allocation</span>
            <span className="text-white font-medium">
              Free Priority Delivery
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 👑 THIS IS THE LINE THAT WE CURED BELOW!
export default Checkout;