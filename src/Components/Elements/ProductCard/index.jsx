import Button from "@/components/Elements/Button";
import { useCart } from "@/context/CartContext";
import { getDiscountedPrice, formatPrice } from "@/utils/price";

import iconCart from "@/assets/cart.svg";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const discountedPrice = getDiscountedPrice(
    product.price,
    product.discountPercentage,
  );

  return (
    <div className="flex flex-col gap-1 border bg-white p-3">
      <img
        src={product.thumbnail}
        alt={product.title}
        width="10"
        height="10"
        loading="lazy"
        decoding="async"
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
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold">{formatPrice(discountedPrice)}</p>

              <span className="text-xs text-red-500">
                -{product.discountPercentage}%
              </span>
            </div>

            <p className="text-sm text-gray-400 line-through">
              {formatPrice(product.price)}
            </p>
          </div>

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
