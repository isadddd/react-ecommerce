import { useEffect, useState } from "react";
import ProductCard from "@/components/Elements/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=12")
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);
        console.log("Products:", data.products);

        setProducts(data.products);
      });
  }, []);

  return (
    <section className="w-full px-4">
      <div className="mx-auto my-5 grid w-full max-w-295 grid-cols-2 rounded-xl md:grid-cols-4 gap-1">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Products;
