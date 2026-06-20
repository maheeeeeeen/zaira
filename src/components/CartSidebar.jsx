import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

function CartSidebar({ isOpen, onClose }) {
  const { cart, removeFromCart, cartCount, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121212] border-l border-gray-950 p-6 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between border-b border-gray-900 pb-4 mb-6">
              <h2 className="text-xl font-light tracking-widest uppercase text-white">
                YOUR BAG ({cartCount})
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-[#C5A880] transition-colors text-lg"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[60vh] space-y-4 pr-2">
              {cart.length === 0 ? (
                <p className="text-gray-600 text-xs tracking-widest uppercase text-center py-12 font-light">
                  Your curated collection is currently empty.
                </p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border border-gray-900 p-3 bg-[#0B0B0B]"
                  >
                    <div className="w-16 h-20 bg-gray-950 overflow-hidden flex-shrink-0">
                      <img
                        src={
                          item._embedded?.["wp:featuredmedia"]?.[0]
                            ?.source_url ||
                          item.featured_media_src_url ||
                          ""
                        }
                        alt={item.title?.rendered || "Product"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xs font-medium tracking-wide uppercase truncate">
                        {item.title.rendered}
                      </h3>
                      <p className="text-gray-500 text-[11px] mt-1 tracking-wider uppercase">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-600 hover:text-red-400 text-xs uppercase tracking-widest transition-colors font-light text-right"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {cart.length > 0 && (
            <div className="border-t border-gray-900 pt-6">
              <div className="flex justify-between text-xs tracking-widest uppercase mb-6">
                <span className="text-gray-500">Logistics handling</span>
                <span className="text-[#C5A880]">Inquire direct</span>
              </div>
              <Link to="/checkout" onClick={onClose}>
                <button className="w-full py-4 bg-[#C5A880] text-black font-semibold uppercase tracking-widest text-xs hover:bg-[#b3966e] transition-all duration-300 mb-3">
                  Proceed to Secure Checkout
                </button>
              </Link>

              <button
                onClick={clearCart}
                className="w-full py-2 bg-transparent text-gray-600 text-[10px] font-light uppercase tracking-widest hover:text-white transition-colors"
              >
                Clear Entire Bag
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartSidebar;
