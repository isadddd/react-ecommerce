import Button from "@/components/Elements/Button";
import { useCart } from "@/context/CartContext";

import iconCart from "@/assets/cart.svg";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="flex flex-col gap-1 border bg-white p-3">
      <img
        src={product.images[0]}
        alt={product.title}
        className="aspect-square w-full border"
      />

      <div className="md:p-4">
        <h3 className="truncate text-base md:text-xl">{product.title}</h3>

        <p className="mt-1 line-clamp-2 text-xs md:text-sm">
          ☆ {product.rating}
        </p>

        <p className="mt-1 line-clamp-2 text-xs md:text-base">
          {product.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <p className="font-semibold">${product.price}</p>

          <Button
            variant="secondary"
            onClick={handleAddToCart}
            className="cursor-pointer rounded-full! p-2!"
          >
            <img src={iconCart} alt="cart" width="20" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
