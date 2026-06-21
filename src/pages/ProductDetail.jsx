import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../components/CartContext";
import productimg from "../assets/images/productDummy.svg";

function ProductDetail({ onProductAdded }) {
  const { id } = useParams(); 
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   const fetchSingleProduct = async () => {
      try {
        // 🎯 Yeh line .env se URL uthayegi automatic
        const response = await fetch(`${import.meta.env.VITE_WP_API_URL}/wp/v2/posts/${id}?_embed`);
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

  if (loading) return <div className="text-white p-10 bg-[#0B0B0B] min-h-screen tracking-widest text-xs uppercase">Loading item details...</div>;
  if (error) return <div className="text-red-500 p-10 bg-[#0B0B0B] min-h-screen text-xs uppercase">Error: {error}</div>;
  if (!product) return null;

  const imageUrl = product._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <div className="bg-[#0B0B0B] text-white min-h-screen p-6 md:p-16 flex flex-col selection:bg-[#C5A880] selection:text-black">
      
      {/* Back to Catalog Breadcrumb Navigation */}
      <nav className="mb-12 max-w-6xl mx-auto w-full">
        <Link className="text-xs uppercase tracking-[0.3em] text-gray-500 hover:text-[#C5A880] transition-colors" to="/shop">
          ← Back to Exhibition
        </Link>
      </nav>

      {/* Main Two-Column Presentation Layout (Perfectly Centered Axis) */}
      <main className="max-w-6xl mx-auto w-full flex flex-col md:flex-row gap-12 items-center justify-center flex-1 my-auto">
        
        {/* 🖼️ LEFT SIDE: HIGH-CONTRAST EDITORIAL IMAGE LAYER */}
        <div className="w-full md:w-1/2 border border-gray-950 p-4 bg-[#121212] hover:border-gray-800 transition-all duration-500 group max-w-md">
          <div className="overflow-hidden aspect-[4/5]">
            <img 
              src={imageUrl || productimg} 
              alt={product.title.rendered} 
              className="w-full h-full object-cover grayscale contrast-115 transition-transform duration-1000 ease-out group-hover:scale-103"
            />
          </div>
        </div>

        {/* RIGHT SIDE: EDITORIAL SPECIFICATIONS PANEL */}
        <div className="w-full md:w-1/2 flex flex-col justify-center py-4">
          <div className="max-w-md">
            <span className="text-xs uppercase tracking-[0.4em] text-[#C5A880] font-light block mb-3">
              ZAIRA Studio — Limited Release
            </span>
            <h1 className="text-3xl md:text-5xl font-extralight tracking-wide text-white uppercase mb-6 leading-tight">
              {product.title.rendered}
            </h1>
            <div 
              className="text-gray-400 text-sm font-light tracking-wide leading-relaxed space-y-4 max-w-md markdown-content mb-8"
              dangerouslySetInnerHTML={{ __html: product.content?.rendered || product.excerpt.rendered }}
            />
          </div>

          {/* Interactive Core Transactions Segment */}
          <div className="max-w-md">
            <button 
              onClick={() => {
                addToCart(product);
                if (onProductAdded) onProductAdded(); // Smoothly pulls out the sidecart panel
              }}
              className="w-full py-4 bg-[#C5A880] text-black font-semibold uppercase tracking-widest text-xs hover:bg-[#b3966e] transition-all duration-300 shadow-lg"
            >
              Add To Bag
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductDetail;