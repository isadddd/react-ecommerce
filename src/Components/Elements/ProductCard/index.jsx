import Button from "@/components/Elements/Button";
import { useCart } from "@/context/CartContext";
import { getDiscountedPrice, formatPrice } from "@/utils/price";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router";
import { useState } from "react";

import iconCart from "@/assets/cart.svg";
import ButtonLink from "@/components/Elements/ButtonLink";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleAddToCart = () => {
    if (!user) {
      setShowLoginPopup(true);
      return;
    }

    addToCart(product);
  };

  const discountedPrice = getDiscountedPrice(
    product.price,
    product.discountPercentage,
  );

  return (
    <>
      <div className="flex flex-col gap-1 border bg-white p-3">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.thumbnail}
            alt={product.title}
            width="10"
            height="10"
            loading="lazy"
            decoding="async"
            className="aspect-square w-full border"
          />
        </Link>

        <div className="md:p-4">
          <Link to={`/products/${product.id}`}>
            <h3 className="truncate text-base md:text-xl">{product.title}</h3>

            <p className="mt-1 line-clamp-2 text-xs md:text-sm">
              ☆ {product.rating}
            </p>

            <p className="mt-1 line-clamp-2 text-xs md:text-base">
              {product.description}
            </p>
          </Link>

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
      {/* popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-6">
            <h2 className="text-lg font-semibold">Login required</h2>

            <p className="mt-2 text-sm text-gray-500">
              Please login first to add products to your cart.
            </p>

            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowLoginPopup(false)}
                className="px-4 py-2 text-sm cursor-pointer"
              >
                Cancel
              </button>

              <ButtonLink to="/login">Login</ButtonLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
