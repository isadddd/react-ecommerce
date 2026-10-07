import { Link } from "react-router";
import { useCart } from "@/context/CartContext";
import { formatPrice, getDiscountedPrice } from "@/utils/price";
const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();
  const subtotal = cart.reduce((total, item) => {
    const price = getDiscountedPrice(item.price, item.discountPercentage);
    return total + price * item.quantity;
  }, 0);
  if (cart.length === 0) {
    return (
      <main>
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-semibold">Your Cart</h1>
            <p className="mt-3 text-gray-500">Your cart is currently empty.</p>
            <Link
              to="/shop"
              className="mt-8 inline-block rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition hover:bg-gray-700"
            >
              Continue Shopping
            </Link>
          </div>
        </section>
      </main>
    );
  }
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold">Your Cart</h1>
          <p className="mt-2 text-gray-500">
            Review your items before checkout
          </p>
        </div>
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Cart Items */}
          <div className="space-y-5">
            {cart.map((item) => {
              const discountedPrice = getDiscountedPrice(
                item.price,
                item.discountPercentage,
              );
              return (
                <div key={item.id} className="flex gap-5 rounded-xl border p-5">
                  {/* Image */}
                  <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-contain"
                      width="112"
                      height="112"
                    />
                  </div>
                  {/* Product Info */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex justify-between gap-4">
                      <div>
                        <h2 className="font-medium"> {item.title} </h2>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.category}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-gray-500 transition hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="mt-auto flex items-end justify-between gap-4 pt-5">
                      {/* Quantity */}
                      <div className="flex items-center rounded-lg border">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          className="px-3 py-2 text-gray-600 transition hover:bg-gray-100"
                          aria-label={`Decrease quantity of ${item.title}`}
                        >
                          −
                        </button>
                        <span className="min-w-10 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          className="px-3 py-2 text-gray-600 transition hover:bg-gray-100"
                          aria-label={`Increase quantity of ${item.title}`}
                        >
                          +
                        </button>
                      </div>
                      {/* Price */}
                      <div className="text-right">
                        <p className="font-semibold">
                          {formatPrice(discountedPrice * item.quantity)}
                        </p>
                        {item.discountPercentage > 0 && (
                          <p className="text-sm text-gray-400 line-through">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Order Summary */}
          <aside className="h-fit rounded-xl border p-6 lg:sticky lg:top-24">
            <h2 className="text-xl font-semibold"> Order Summary </h2>
            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span> <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span> <span>Free</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span> <span>{formatPrice(subtotal)}</span>
                </div>
              </div>
            </div>
            <Link
              to="/checkout"
              className="mt-6 block w-full rounded-lg bg-gray-900 px-5 py-3 text-center font-medium text-white transition hover:bg-gray-700"
            >
              Proceed to Checkout
            </Link>
            <Link
              to="/shop"
              className="mt-3 block text-center text-sm text-gray-500 transition hover:text-gray-900"
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
};
export default Cart;
