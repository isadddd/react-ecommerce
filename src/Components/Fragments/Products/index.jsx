import { useEffect, useState } from "react";

import ProductCard from "@/components/Elements/ProductCard";
import Button from "@/components/Elements/Button";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 12;
  const skip = (page - 1) * limit;

  useEffect(() => {
    setLoading(true);

    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
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

      <div className="flex justify-center gap-2">
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </Button>

        <span>Page {page}</span>

        <Button onClick={() => setPage(page + 1)}>Next</Button>
      </div>
    </section>
  );
};

export default Products;
