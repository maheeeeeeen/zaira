import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { mockProducts } from "../mockData";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeImage, setActiveImage] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const matched =
      mockProducts.find(
        (p) => String(p.id) === String(id) || p.slug === String(id)
      ) || mockProducts[0];

    setProduct(matched);
    setActiveImage(matched.images?.[0] || "");
  }, [id]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({ ...product, selectedSize });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleShopNow = () => {
    addToCart({ ...product, selectedSize });
    navigate("/checkout");
  };

  return (
    <div className="bg-[#0B0B0B] text-white min-h-screen py-10 px-4 md:px-12 selection:bg-[#C5A880] selection:text-black">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation / Return / Close Bar */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-neutral-900">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] font-medium text-neutral-400 hover:text-[#C5A880] transition-colors cursor-pointer"
          >
            <span>←</span>
            <span>Return to Matrix</span>
          </button>

          <Link
            to="/shop"
            className="text-[11px] uppercase tracking-[0.25em] font-medium text-neutral-400 hover:text-white transition-colors px-3 py-1 border border-neutral-800 hover:border-neutral-600"
          >
            ✕ Close
          </Link>
        </div>

        {/* Title Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-extralight uppercase tracking-widest text-white">
            {product.title.rendered}
          </h1>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] mt-2 font-medium">
            {product.categories ? product.categories.join(", ") : "Tailored"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Thumbnails */}
          <div className="hidden lg:flex lg:col-span-2 flex-col gap-3">
            {product.images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`border overflow-hidden aspect-[3/4] bg-[#121212] transition-all cursor-pointer ${
                  activeImage === img
                    ? "border-[#C5A880] opacity-100"
                    : "border-neutral-900 opacity-50 hover:opacity-100 hover:border-neutral-700"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover grayscale contrast-110" />
              </button>
            ))}
          </div>

          {/* Main Hero Image */}
          <div className="lg:col-span-5 bg-[#121212] border border-neutral-900 aspect-[3/4] overflow-hidden p-2">
            <img
              src={activeImage || product.images?.[0]}
              alt={product.title.rendered}
              className="w-full h-full object-cover grayscale contrast-115"
            />
          </div>

          {/* Details & Purchase Actions */}
          <div className="lg:col-span-5 space-y-6 lg:pl-4">
            <div className="border-b border-neutral-900 pb-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-medium block">
                ZAIRA COUTURE — EST. 2026
              </span>
              <p className="text-3xl font-light text-white tracking-wide mt-2">
                ${product.price}
              </p>
            </div>

            <div
              className="text-xs leading-relaxed text-neutral-400 font-light space-y-2"
              dangerouslySetInnerHTML={{ __html: product.content.rendered }}
            />

            {/* Size Selector */}
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-neutral-400 block mb-2">
                Size Specification
              </span>
              <div className="flex gap-2">
                {["S", "M", "L", "XL"].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-10 h-10 text-xs font-light border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? "bg-[#C5A880] text-black border-[#C5A880] font-medium"
                        : "bg-[#121212] text-neutral-300 border-neutral-800 hover:border-neutral-600 hover:text-white"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-2 text-xs text-neutral-400 border-t border-neutral-900 pt-4 font-light">
              <p><span className="text-neutral-200 uppercase tracking-widest text-[10px] block mb-0.5">FIT</span> {product.fit}</p>
              <p><span className="text-neutral-200 uppercase tracking-widest text-[10px] block mb-0.5">MATERIAL</span> {product.material}</p>
              <p><span className="text-neutral-200 uppercase tracking-widest text-[10px] block mb-0.5">DELIVERY</span> {product.delivery}</p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-900">
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 bg-[#C5A880] text-black text-xs font-semibold uppercase tracking-widest hover:bg-[#b3966e] transition-colors cursor-pointer"
              >
                {added ? "ALLOCATED ✓" : "ADD TO BAG"}
              </button>

              <button
                onClick={handleShopNow}
                className="w-full py-3.5 bg-[#121212] border border-neutral-800 text-white text-xs font-semibold uppercase tracking-widest hover:bg-neutral-900 hover:border-neutral-700 transition-colors cursor-pointer"
              >
                SHOP NOW
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetail;