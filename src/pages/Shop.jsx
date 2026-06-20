import { useEffect, useState } from "react";
import productimg from "../assets/images/productDummy.svg";
import { useCart } from "../components/CartContext";
import CartSidebar from "../components/CartSidebar";
import { useNavigate } from "react-router-dom";

function Shop() {
  const navigate = useNavigate(); // ✅ Safely placed inside the component body!
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProduct, setActiveProduct] = useState(null);
  const { addToCart, cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://zaira.local/wp-json/wp/v2/posts?_embed"
        );
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return <div className="text-white p-10">Loading collection...</div>;
  if (error) return <div className="text-red-500 p-10">Error: {error}</div>;

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => {
          const categories = product._embedded?.["wp:term"]?.[0] || [];
          return categories.some(
            (cat) => cat.name.toLowerCase() === selectedCategory.toLowerCase()
          );
        });

  return (
    <div className="bg-[#0B0B0B] text-white min-h-screen p-10">
      <header className="mb-16 relative">
        <div className="absolute top-0 right-0">
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-sm uppercase tracking-[0.2em] font-light text-white hover:text-[#C5A880] transition-colors"
          >
            Bag 🛒 ({cartCount})
          </button>
        </div>

        <h1 className="text-5xl md:text-6xl font-extralight text-white tracking-[0.25em] uppercase mb-4 text-center">
          ZAIRA
        </h1>
        <p className="text-[#C5A880] uppercase tracking-[0.4em] text-xs font-light mb-4 text-center">
          Minimalist cuts. Midnight hues.
        </p>
        <div className="flex gap-8 justify-center border-b border-gray-900 pb-4 max-w-xl mx-auto">
          {["All", "Outerwear", "Essentials", "Tailored"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-sm uppercase tracking-widest transition-colors duration-300 pb-2 ${
                selectedCategory === cat
                  ? "text-[#C5A880] border-b-2 border-[#C5A880]"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 p-6 md:p-12 gap-10">
        {filteredProducts.map((product) => {
          const imageUrl =
            product._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

          return (
            <div
              key={product.id}
              onClick={() => {
                const id = product.id || product.ID;
                if (id) {
                  navigate(`/product/${id}`);
                } else {
                  console.error("Product ID missing", product);
                }
              }}
              className="group border border-gray-800 p-4 hover:border-gray-500 transition-colors cursor-pointer"
            >
              <img
                src={imageUrl || productimg}
                alt={product.title.rendered}
                className="mb-4 w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <h2 className="font-medium text-white tracking-wide uppercase text-base mb-2">
                {product.title.rendered}
              </h2>
              <div
                className="mt-1 text-gray-400 text-xs font-light tracking-wide leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.excerpt.rendered }}
              />
            </div>
          );
        })}
      </div>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default Shop;