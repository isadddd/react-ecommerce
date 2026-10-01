import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import ProductCard from "@/components/Elements/ProductCard";
import Pagination from "@/components/Elements/Pagination";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q")?.trim() || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 12;
  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (!query) {
      setProducts([]);
      setTotal(0);
      setError("");
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      const params = new URLSearchParams({
        q: query,
        limit: limit.toString(),
        skip: skip.toString(),
      });

      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?${params}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data.products);
        setTotal(data.total);
      } catch (error) {
        console.error(error);

        setProducts([]);
        setTotal(0);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query, page]);

  return (
    <section className="w-full px-4 pb-5">
      <div className="mx-auto my-5 flex w-full max-w-295 flex-col items-center justify-between">
        {query && (
          <h1 className="mb-6 text-2xl font-bold">
            Search results for "{query}"
          </h1>
        )}

        {!query && <p>Enter a search term to find products.</p>}

        {loading && <p>Loading...</p>}

        {!loading && error && <p>{error}</p>}

        {!loading && !error && query && products.length === 0 && (
          <p>No products found.</p>
        )}

        {query && (
          <div
            className={`mx-auto grid w-full max-w-295 grid-cols-2 gap-1 rounded-xl transition-opacity duration-300 ease-in-out md:grid-cols-4 ${
              loading ? "opacity-20" : "opacity-100"
            }`}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!loading && totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            loading={loading}
            onPrevious={() => setPage((prev) => prev - 1)}
            onNext={() => setPage((prev) => prev + 1)}
          />
        )}
      </div>
    </section>
  );
};

export default SearchPage;
