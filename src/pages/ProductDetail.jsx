import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../components/CartContext";
import CartSidebar from "../components/CartSidebar";
import productimg from "../assets/images/productDummy.svg";

function ProductDetail() {
  const { id } = useParams(); // Extracts the unique ID right out of the browser URL path
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        // Query the specific post ID directly from the WordPress engine
        const response = await fetch(`http://zaira.local/wp-json/wp/v2/posts/${id}?_embed`);
        if (!response.ok) throw new Error("Product data could not be retrieved.");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleProduct();
  }, [id]);

  if (loading) return <div className="text-white p-10 bg-[#0B0B0B] min-h-screen">Loading item details...</div>;
  if (error) return <div className="text-red-500 p-10 bg-[#0B0B0B] min-h-screen">Error: {error}</div>;
  if (!product) return null;

  const imageUrl = product._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <div className="bg-[#0B0B0B] text-white min-h-screen p-6 md:p-16 flex flex-col justify-between">
      
      {/* Editorial Navigation Header */}
      <nav className="mb-12 flex justify-between items-center max-w-6xl mx-auto w-full">
        <Link to="/shop" className="text-xs uppercase tracking-[0.3em] text-gray-500 hover:text-[#C5A880] transition-colors">
          ← Back to Exhibition
        </Link>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="text-xs uppercase tracking-[0.2em] font-light text-white hover:text-[#C5A880] transition-colors"
        >
          Open Bag 🛒
        </button>
      </nav>

      {/* Main Two-Column Presentation Layout */}
      <main className="max-w-6xl mx-auto w-full flex flex-col md:flex-row gap-12 items-start flex-1">
        
        {/* Left Side: Dramatic Frame Image */}
        <div className="w-full md:w-1/2 border border-gray-900 p-2 bg-[#121212]">
          <img 
            src={imageUrl || productimg} 
            alt={product.title.rendered} 
            className="w-full h-[650px] object-cover"
          />
        </div>

        {/* Right Side: Editorial Context Specifications */}
        <div className="w-full md:w-1/2 flex flex-col justify-between h-full py-4">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-[#C5A880] font-light block mb-3">
              ZAIRA Studio — Limited Release
            </span>
            <h1 className="text-3xl md:text-5xl font-extralight tracking-wide text-white uppercase mb-6 leading-tight">
              {product.title.rendered}
            </h1>
            <div 
              className="text-gray-400 text-sm font-light tracking-wide leading-relaxed space-y-4 max-w-md markdown-content"
              dangerouslySetInnerHTML={{ __html: product.content?.rendered || product.excerpt.rendered }}
            />
          </div>

          {/* Interactive Transactions Segment */}
          <div className="mt-12 max-w-md">
            <button 
              onClick={() => {
                addToCart(product);
                setIsCartOpen(true);
              }}
              className="w-full py-4 bg-[#C5A880] text-black font-semibold uppercase tracking-widest text-xs hover:bg-[#b3966e] transition-all duration-300 shadow-lg hover:shadow-[#C5A880]/10"
            >
              Add To Bag
            </button>
          </div>
          </div>
        </main>

        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default ProductDetail;                                                                             