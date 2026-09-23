import { useCart } from "@/context/CartContext";
import CartItem from "@/components/Elements/CartItem";

const CartDrawer = () => {
  const { cart, isCartOpen, totalPrice, closeCart, clearCart } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          isCartOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-xl transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-lg font-semibold">Cart</h2>

          <button
            type="button"
            onClick={closeCart}
            className="text-2xl leading-none"
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5">
          {cart.length > 0 ? (
            cart.map((product) => (
              <CartItem key={product.id} product={product} />
            ))
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500">Your cart is empty.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 px-5 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-lg font-semibold">Total</span>

              <span className="text-lg font-semibold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <button
              type="button"
              className="w-full bg-black px-5 py-3 text-white transition-opacity hover:opacity-80"
            >
              Checkout
            </button>

            <button
              type="button"
              onClick={clearCart}
              className="mt-3 w-full px-5 py-2 text-sm text-gray-500 hover:text-black"
            >
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
