import { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

      setCart(storedCart);
    };

    loadCart();

    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-295">
        <h2>Cart</h2>

        <div className="grid">
          {cart.map((product) => (
            <div key={product.id} className="flex gap-3 border p-3">
              <img
                src={product.images[0]}
                alt={product.title}
                width="200"
              />

              <div>
                <p>{product.title}</p>
                <p>${product.price}</p>
                <p>Quantity: {product.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;