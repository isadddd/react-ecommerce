import { useEffect, useState } from "react";
import { useParams } from "react-router";

import Button from "@/components/Elements/Button";
import { useCart } from "@/context/CartContext";
import { getDiscountedPrice, formatPrice } from "@/utils/price";

import iconCart from "@/assets/cart.svg";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!product) {
    return <div className="p-10 text-center">Product not found.</div>;
  }

  const discountedPrice = getDiscountedPrice(
    product.price,
    product.discountPercentage,
  );

  return (
    <section className="mx-auto w-full max-w-295 px-4 py-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <img
            src={product.images[0]}
            alt={product.title}
            width="600"
            height="600"
            className="aspect-square w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm text-gray-500">{product.category}</p>

          <h1 className="mt-2 text-2xl font-semibold md:text-4xl">
            {product.title}
          </h1>

          <p className="mt-3">☆ {product.rating}</p>

          <p className="mt-5 text-sm leading-6 text-gray-600 md:text-base">
            {product.description}
          </p>

          <div className="mt-6">
            <div className="flex items-center gap-3">
              <p className="text-xl font-semibold">
                {formatPrice(discountedPrice)}
              </p>

              <span className="text-sm text-red-500">
                -{product.discountPercentage}%
              </span>
            </div>

            <p className="text-sm text-gray-400 line-through">
              {formatPrice(product.price)}
            </p>
          </div>

          <Button
            variant="secondary"
            onClick={() => addToCart(product)}
            className="mt-6 flex w-fit cursor-pointer items-center gap-2"
          >
            <img src={iconCart} alt="" width="20" height="20" />
            Add to Cart
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
