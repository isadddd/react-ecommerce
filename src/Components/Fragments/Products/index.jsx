import { useEffect, useState } from "react";

import ProductCard from "@/components/Elements/ProductCard";
import Button from "@/components/Elements/Button";

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
    <section className="w-full px-4">
      <div
        className={`mx-auto my-5 grid w-full max-w-295 grid-cols-2 rounded-xl gap-1 md:grid-cols-4
    transition-opacity duration-300 ease-in-out
    ${loading ? "opacity-20" : "opacity-100"}`}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-5">
        <Button
          onClick={() => setPage(page - 1)}
          disabled={page === 1 || loading}
        >
          Previous
        </Button>

        <span className="text-center">
          Page {page} of {totalPages}
        </span>

        <Button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages || loading}
        >
          Next
        </Button>
      </div>
    </section>
  );
};

export default Products;
