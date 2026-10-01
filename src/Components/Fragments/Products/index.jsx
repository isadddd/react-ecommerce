import { useEffect, useState } from "react";

import ProductCard from "@/components/Elements/ProductCard";
import Pagination from "@/components/Elements/Pagination";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState("");

  const limit = 12;
  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    setLoading(true);

    const params = new URLSearchParams({
      limit: limit.toString(),
      skip: skip.toString(),
    });

    if (sortBy) {
      const [field, order] = sortBy.split("-");

      params.set("sortBy", field);
      params.set("order", order);
    }

    fetch(`https://dummyjson.com/products?${params}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotal(data.total);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, sortBy]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setPage(1);
  };

  return (
    <section className="w-full px-4 pb-5">
      <div className="mx-auto my-5 flex w-full max-w-295 items-center justify-between">
        <h2 className="text-lg font-semibold">Products</h2>

        <select
          value={sortBy}
          onChange={handleSortChange}
          className="cursor-pointer rounded-lg border bg-white px-3 py-2 text-sm"
        >
          <option value="">Sort by</option>

          <option value="price-asc">Price: Low to High</option>

          <option value="price-desc">Price: High to Low</option>

          <option value="title-asc">Name: A → Z</option>

          <option value="title-desc">Name: Z → A</option>

          <option value="rating-desc">Rating: High to Low</option>

          <option value="rating-asc">Rating: Low to High</option>
        </select>
      </div>

      <div
        className={`mx-auto grid w-full max-w-295 grid-cols-2 gap-1 rounded-xl transition-opacity duration-300 ease-in-out md:grid-cols-4 ${
          loading ? "opacity-20" : "opacity-100"
        }`}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        loading={loading}
        onPrevious={() => setPage((prev) => prev - 1)}
        onNext={() => setPage((prev) => prev + 1)}
      />
    </section>
  );
};

export default Products;
