import { useCart } from "@/context/CartContext";
import { getDiscountedPrice, formatPrice } from "@/utils/price";

const CartItem = ({ product }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const discountedPrice = getDiscountedPrice(
    product.price,
    product.discountPercentage,
  );

  return (
    <div className="flex gap-3 border-b border-gray-200 py-4">
      <img
        src={product.images[0]}
        alt={product.title}
        className="h-20 w-20 shrink-0 object-cover"
      />

      <div className="min-w-0 flex-1">
        <div className="flex justify-between gap-3">
          <p className="line-clamp-2 text-sm font-medium">{product.title}</p>

          <button
            type="button"
            onClick={() => removeFromCart(product.id)}
            className="shrink-0 text-sm text-gray-400 hover:text-black"
          >
            ×
          </button>
        </div>

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

        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => decreaseQuantity(product.id)}
            className="flex h-7 w-7 items-center justify-center border border-gray-200"
          >
            −
          </button>

          <span className="min-w-4 text-center text-sm">
            {product.quantity}
          </span>

          <button
            type="button"
            onClick={() => increaseQuantity(product.id)}
            className="flex h-7 w-7 items-center justify-center border border-gray-200"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
