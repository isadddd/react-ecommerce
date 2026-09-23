import { useCart } from "@/context/CartContext";

import iconCart from "@/assets/cart.svg";

const CartButton = () => {
  const { totalItems, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      className="relative transition-colors hover:text-gray-500"
      aria-label="Open cart"
    >
      <img src={iconCart} alt="#" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-xs text-white">
          {totalItems}
        </span>
      )}
    </button>
  );
};

export default CartButton;
