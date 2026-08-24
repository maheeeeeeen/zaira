// import { useEffect, useState } from "react";
// import productimg from "../assets/images/productDummy.svg";
// import { useCart } from "../components/CartContext";
// import CartSidebar from "../components/CartSidebar";
// import { useNavigate } from "react-router-dom";

// function Shop() {
//   const navigate = useNavigate(); // ✅ Safely placed inside the component body!
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [activeProduct, setActiveProduct] = useState(null);
//   const { addToCart, cartCount } = useCart();
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(
//           "http://zaira.local/wp-json/wp/v2/posts?_embed"
//         );
//         if (!response.ok) throw new Error("Failed to fetch data");

//         const data = await response.json();
//         setProducts(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading)
//     return <div className="text-white p-10">Loading collection...</div>;
//   if (error) return <div className="text-red-500 p-10">Error: {error}</div>;

//   const filteredProducts =
//     selectedCategory === "All"
//       ? products
//       : products.filter((product) => {
//           const categories = product._embedded?.["wp:term"]?.[0] || [];
//           return categories.some(
//             (cat) => cat.name.toLowerCase() === selectedCategory.toLowerCase()
//           );
//         });

//   return (
//     <div className="bg-[#0B0B0B] text-white min-h-screen p-10">
//       <header className="mb-16 relative">
//         <div className="absolute top-0 right-0">
//           <button
//             onClick={() => setIsCartOpen(true)}
//             className="text-sm uppercase tracking-[0.2em] font-light text-white hover:text-[#C5A880] transition-colors"
//           >
//             Bag 🛒 ({cartCount})
//           </button>
//         </div>

//         <h1 className="text-5xl md:text-6xl font-extralight text-white tracking-[0.25em] uppercase mb-4 text-center">
//           ZAIRA
//         </h1>
//         <p className="text-[#C5A880] uppercase tracking-[0.4em] text-xs font-light mb-4 text-center">
//           Minimalist cuts. Midnight hues.
//         </p>
//         <div className="flex gap-8 justify-center border-b border-gray-900 pb-4 max-w-xl mx-auto">
//           {["All", "Outerwear", "Essentials", "Tailored"].map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setSelectedCategory(cat)}
//               className={`text-sm uppercase tracking-widest transition-colors duration-300 pb-2 ${
//                 selectedCategory === cat
//                   ? "text-[#C5A880] border-b-2 border-[#C5A880]"
//                   : "text-gray-500 hover:text-white"
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>
//       </header>

//       <div className="grid grid-cols-1 md:grid-cols-3 p-6 md:p-12 gap-10">
//         {filteredProducts.map((product) => {
//           const imageUrl =
//             product._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

//           return (
//             <div
//               key={product.id}
//               onClick={() => {
//                 const id = product.id || product.ID;
//                 if (id) {
//                   navigate(`/product/${id}`);
//                 } else {
//                   console.error("Product ID missing", product);
//                 }
//               }}
//               className="group border border-gray-800 p-4 hover:border-gray-500 transition-colors cursor-pointer"
//             >
//               <img
//                 src={imageUrl || productimg}
//                 alt={product.title.rendered}
//                 className="mb-4 w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
//               />
//               <h2 className="font-medium text-white tracking-wide uppercase text-base mb-2">
//                 {product.title.rendered}
//               </h2>
//               <div
//                 className="mt-1 text-gray-400 text-xs font-light tracking-wide leading-relaxed"
//                 dangerouslySetInnerHTML={{ __html: product.excerpt.rendered }}
//               />
//             </div>
//           );
//         })}
//       </div>
//       <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
//     </div>
//   );
// }

// export default Shop;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mockProducts } from "../mockData";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_WP_API_URL}/wp/v2/posts?_embed`
        );
        if (!res.ok) throw new Error("API Offline");
        const data = await res.json();
        setProducts(data.length > 0 ? data : mockProducts);
      } catch (err) {
        console.warn("Live API unavailable, utilizing fallback matrix.");
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#0B0B0B] text-white min-h-screen flex items-center justify-center">
        <span className="text-xs uppercase tracking-[0.4em] text-gray-500 animate-pulse">
          Loading Matrix...
        </span>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0B0B] text-white min-h-screen p-6 md:p-16">
      <div className="max-w-6xl mx-auto">
        <div className="border-b border-gray-900 pb-8 mb-12 flex justify-between items-end">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A880]">
              Index / All Allocations
            </span>
            <h1 className="text-3xl font-extralight uppercase tracking-widest mt-2">
              The Collection
            </h1>
          </div>
          <span className="text-xs text-gray-500 tracking-widest">
            {products.length} Units Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((item) => {
            const imageUrl =
              item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
              "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop";

            return (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="group block bg-[#121212] border border-gray-950 p-4 hover:border-gray-800 transition-all duration-500"
              >
                <div className="overflow-hidden aspect-[4/5] mb-4 bg-black/50">
                  <img
                    src={imageUrl}
                    alt={item.title.rendered}
                    className="w-full h-full object-cover grayscale contrast-110 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <h3 className="text-sm font-light uppercase tracking-wider text-white group-hover:text-[#C5A880] transition-colors truncate">
                  {item.title.rendered}
                </h3>
                <span className="text-[10px] uppercase tracking-widest text-gray-500 mt-1 block">
                  Limited Allocation
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Shop;