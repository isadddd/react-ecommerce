import { useEffect, useState } from "react";

import ProductCard from "@/components/Elements/ProductCard";
import Pagination from "@/components/Elements/Pagination";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const limit = 12;
  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    setLoading(true);

    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
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
  }, [page]);

  return (
    <section className="w-full px-4 pb-5">
      <div
        className={`mx-auto my-5 grid w-full max-w-295 grid-cols-2 gap-1 rounded-xl transition-opacity duration-300 ease-in-out md:grid-cols-4 ${
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
