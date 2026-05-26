import { useEffect, useState } from "react";
import productimg from "./assets/images/productDummy.svg";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProduct, setActiveProduct] = useState(null);

  useEffect(() => {
    // It is best practice to define the fetch function inside useEffect
    // or use an async/await pattern for readability
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://zaira.local/wp-json/wp/v2/posts?_embed",
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
          // This looks inside the embedded WordPress data to find the category name
          const categories = product._embedded?.["wp:term"]?.[0] || [];
          // This line will print the exact category names to your browser console
          console.log(
            "WP Categories for",
            product.title.rendered,
            ":",
            categories.map((c) => c.name),
          );
          return categories.some(
            (cat) => cat.name.toLowerCase() === selectedCategory.toLowerCase(),
          );
        });

  return (
    <div className="bg-[#0B0B0B] text-white min-h-screen p-10">
      <header className="mb-16">
        <h1 className="text-5xl md:text-6xl font-extralight text-white tracking-[0.25em] uppercase mb-4">
          ZAIRA
        </h1>
        <p className="text-[#C5A880] uppercase tracking-[0.4em] text-xs font-light mb-4">
          Minimalist cuts. Midnight hues.
        </p>
        <div
          className="flex gap-8 justify-center border-b border-gray-900 pb-4 max-w-xl mx-auto"
        >
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
          // Extract image URL for cleaner JSX
          const imageUrl =
            product._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

          return (
            <div
              key={product.id}
              onClick={() => setActiveProduct(product)}
              className="group border border-gray-800 p-4 hover:border-gray-500 transition-colors cursor-pointer"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={product.title.rendered}
                  className="mb-4 w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <img
                  src={productimg}
                  alt={product.title.rendered}
                  className="mb-4 w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
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
      {activeProduct && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/90 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-[#121212] border border-[#C5A880]/20 shadow-2xl max-w-2xl w-full p-8 relative flex flex-col md:flex-row gap-8">
            {/* Close Button */}
            <button
              onClick={() => setActiveProduct(null)}
              className="absolute top-4 right-4 text-gray-400 transition-colors hover:text-[#C5A880] text-xl"
            >
              ✕
            </button>

            {/* Modal Image */}
            <div className="w-full md:w-1/2">
              <img
                src={
                  activeProduct._embedded?.["wp:featuredmedia"]?.[0]?.source_url
                    ? activeProduct._embedded["wp:featuredmedia"][0].source_url
                    : productimg
                }
                alt={activeProduct.title.rendered}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Modal Details */}
            <div className="w-full md:w-1/2 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-light tracking-wide text-white uppercase mb-2">
                  {activeProduct.title.rendered}
                </h2>
                <div
                  className="text-gray-400 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: activeProduct.excerpt.rendered,
                  }}
                />
              </div>

              {/* Call to Action Button */}
              <button className="mt-6 w-full py-3 bg-[#C5A880] text-black font-semibold uppercase tracking-widest text-sm hover:bg-[#b3966e] transition-colors">
                Inquire via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
