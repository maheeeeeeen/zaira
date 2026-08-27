import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { mockProducts } from "../mockData";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  useEffect(() => {
    // API Call with resilient mockData fallback
    const fetchProducts = async () => {
      try {
        const apiUrl = import.meta.env.VITE_WP_API_URL;
        if (apiUrl) {
          const res = await fetch(`${apiUrl}/wp-json/wp/v2/posts?_embed`);
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              setProducts(data);
              setLoading(false);
              return;
            }
          }
        }
      } catch (err) {
        console.warn("API unreachable, falling back to curated mock data", err);
      }
      setProducts(mockProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts = categoryFilter
    ? products.filter((p) => {
        const cats = p.categories || [];
        return cats.some((c) =>
          String(c).toLowerCase().includes(categoryFilter.toLowerCase())
        );
      })
    : products;

  const getProductImage = (item, index) => {
    if (item.images && item.images.length > 0) return item.images[0];
    if (item._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
      return item._embedded["wp:featuredmedia"][0].source_url;
    }
    // Fallback to mock item by index
    return mockProducts[index % mockProducts.length]?.images?.[0];
  };

  return (
    <div className="bg-[#0B0B0B] text-white min-h-screen py-16 px-4 md:px-12 selection:bg-[#C5A880] selection:text-black">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 pb-8 border-b border-neutral-900 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880]">
              Index / Exhibition Catalog
            </span>
            <h1 className="text-4xl md:text-5xl font-extralight tracking-widest uppercase mt-2">
              Collection 01
            </h1>
          </div>
          <div className="flex space-x-6 text-[11px] uppercase tracking-[0.25em] text-neutral-500">
            <Link
              to="/shop"
              className={`hover:text-white transition-colors ${
                !categoryFilter ? "text-[#C5A880] font-semibold" : ""
              }`}
            >
              All
            </Link>
            <Link
              to="/shop?category=tailored"
              className={`hover:text-white transition-colors ${
                categoryFilter === "tailored" ? "text-[#C5A880] font-semibold" : ""
              }`}
            >
              Tailored
            </Link>
            <Link
              to="/shop?category=essentials"
              className={`hover:text-white transition-colors ${
                categoryFilter === "essentials" ? "text-[#C5A880] font-semibold" : ""
              }`}
            >
              Essentials
            </Link>
            <Link
              to="/shop?category=outerwear"
              className={`hover:text-white transition-colors ${
                categoryFilter === "outerwear" ? "text-[#C5A880] font-semibold" : ""
              }`}
            >
              Outerwear
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="py-24 text-center text-xs uppercase tracking-[0.3em] text-neutral-600 animate-pulse">
            Loading Studio Archive...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProducts.map((item, index) => {
              const displayImg = getProductImage(item, index);
              const productId = item.slug || item.id;

              return (
                <Link
                  key={item.id || index}
                  to={`/product/${productId}`}
                  className="group block bg-[#121212] border border-neutral-900 p-4 hover:border-neutral-700 transition-all duration-500"
                >
                  <div className="overflow-hidden aspect-[3/4] mb-6 bg-black/40">
                    <img
                      src={displayImg}
                      alt={item.title?.rendered || "Product"}
                      className="w-full h-full object-cover grayscale contrast-115 transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-sm uppercase tracking-widest font-light text-white group-hover:text-[#C5A880] transition-colors">
                      {item.title?.rendered}
                    </h3>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                      Limited Allocation — ${item.price || 160}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

export default Shop;