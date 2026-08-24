// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useCart } from "../components/CartContext";
// import productimg from "../assets/images/productDummy.svg";

// function ProductDetail({ onProductAdded }) {
//   const { id } = useParams(); 
//   const { addToCart } = useCart();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//    const fetchSingleProduct = async () => {
//       try {
//         // 🎯 Yeh line .env se URL uthayegi automatic
//         const response = await fetch(`${import.meta.env.VITE_WP_API_URL}/wp/v2/posts/${id}?_embed`);
//         if (!response.ok) throw new Error("Product data could not be retrieved.");
//         const data = await response.json();
//         setProduct(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSingleProduct();
//   }, [id]);

//   if (loading) return <div className="text-white p-10 bg-[#0B0B0B] min-h-screen tracking-widest text-xs uppercase">Loading item details...</div>;
//   if (error) return <div className="text-red-500 p-10 bg-[#0B0B0B] min-h-screen text-xs uppercase">Error: {error}</div>;
//   if (!product) return null;

//   const imageUrl = product._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

//   return (
//     <div className="bg-[#0B0B0B] text-white min-h-screen p-6 md:p-16 flex flex-col selection:bg-[#C5A880] selection:text-black">
      
//       {/* Back to Catalog Breadcrumb Navigation */}
//       <nav className="mb-12 max-w-6xl mx-auto w-full">
//         <Link className="text-xs uppercase tracking-[0.3em] text-gray-500 hover:text-[#C5A880] transition-colors" to="/shop">
//           ← Back to Exhibition
//         </Link>
//       </nav>

//       {/* Main Two-Column Presentation Layout (Perfectly Centered Axis) */}
//       <main className="max-w-6xl mx-auto w-full flex flex-col md:flex-row gap-12 items-center justify-center flex-1 my-auto">
        
//         {/* 🖼️ LEFT SIDE: HIGH-CONTRAST EDITORIAL IMAGE LAYER */}
//         <div className="w-full md:w-1/2 border border-gray-950 p-4 bg-[#121212] hover:border-gray-800 transition-all duration-500 group max-w-md">
//           <div className="overflow-hidden aspect-[4/5]">
//             <img 
//               src={imageUrl || productimg} 
//               alt={product.title.rendered} 
//               className="w-full h-full object-cover grayscale contrast-115 transition-transform duration-1000 ease-out group-hover:scale-103"
//             />
//           </div>
//         </div>

//         {/* RIGHT SIDE: EDITORIAL SPECIFICATIONS PANEL */}
//         <div className="w-full md:w-1/2 flex flex-col justify-center py-4">
//           <div className="max-w-md">
//             <span className="text-xs uppercase tracking-[0.4em] text-[#C5A880] font-light block mb-3">
//               ZAIRA Studio — Limited Release
//             </span>
//             <h1 className="text-3xl md:text-5xl font-extralight tracking-wide text-white uppercase mb-6 leading-tight">
//               {product.title.rendered}
//             </h1>
//             <div 
//               className="text-gray-400 text-sm font-light tracking-wide leading-relaxed space-y-4 max-w-md markdown-content mb-8"
//               dangerouslySetInnerHTML={{ __html: product.content?.rendered || product.excerpt.rendered }}
//             />
//           </div>

//           {/* Interactive Core Transactions Segment */}
//           <div className="max-w-md">
//             <button 
//               onClick={() => {
//                 addToCart(product);
//                 if (onProductAdded) onProductAdded(); // Smoothly pulls out the sidecart panel
//               }}
//               className="w-full py-4 bg-[#C5A880] text-black font-semibold uppercase tracking-widest text-xs hover:bg-[#b3966e] transition-all duration-300 shadow-lg"
//             >
//               Add To Bag
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default ProductDetail;

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
    <div className="bg-[#f5f5f5] text-[#111] min-h-screen py-10 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Title Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-normal text-gray-900 tracking-tight">
            {product.title.rendered}
          </h1>
          <p className="text-xs uppercase tracking-widest text-gray-500 mt-1">
            {product.categories.join(", ")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Thumbnails */}
          <div className="hidden lg:flex lg:col-span-2 flex-col gap-3">
            {product.images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`border-2 overflow-hidden aspect-[3/4] bg-white transition-all ${
                  activeImage === img ? "border-black" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main Hero Image */}
          <div className="lg:col-span-5 bg-white border border-gray-200 aspect-[3/4] overflow-hidden">
            <img
              src={activeImage || product.images?.[0]}
              alt={product.title.rendered}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details & Purchase Actions */}
          <div className="lg:col-span-5 space-y-6 lg:pl-4">
            <div className="border-b border-gray-300 pb-4">
              <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-semibold block">
                ZAIRA COUTURE — Est. 2026
              </span>
              <p className="text-2xl font-medium text-gray-900 mt-2">
                ${product.price}
              </p>
            </div>

            <div
              className="text-xs leading-relaxed text-gray-600 font-light"
              dangerouslySetInnerHTML={{ __html: product.content.rendered }}
            />

            {/* Size Selector */}
            <div>
              <span className="text-[11px] uppercase tracking-widest font-semibold text-gray-700 block mb-2">
                Size
              </span>
              <div className="flex gap-2">
                {["S", "M", "L", "XL"].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-10 h-10 text-xs font-medium border transition-all ${
                      selectedSize === sz
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-800 border-gray-300 hover:border-black"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-1.5 text-xs text-gray-600 border-t border-gray-200 pt-4">
              <p><strong className="text-gray-900 font-medium">FIT:</strong> {product.fit}</p>
              <p><strong className="text-gray-900 font-medium">MATERIAL:</strong> {product.material}</p>
              <p><strong className="text-gray-900 font-medium">DELIVERY:</strong> {product.delivery}</p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 bg-black text-white text-xs font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
              >
                {added ? "ADDED ✓" : "ADD TO BAG"}
              </button>

              <button
                onClick={handleShopNow}
                className="w-full py-3.5 bg-neutral-200 border border-neutral-300 text-black text-xs font-semibold uppercase tracking-widest hover:bg-neutral-300 transition-colors"
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