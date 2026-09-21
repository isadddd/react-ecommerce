import Button from "@/components/Elements/Button";

import iconCart from "@/assets/cart.svg";

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="flex flex-col gap-1 border bg-white p-3">
      <img
        src={product.images[0]}
        alt={product.title}
        className="border aspect-square w-full"
      />
      <div className="md:p-4">
        <h3 className="text-base md:text-xl truncate">{product.title}</h3>
        <p className="text-xs md:text-sm mt-1 line-clamp-2">
          ☆ {product.rating}
        </p>
        <p className="text-xs md:text-base mt-1 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-3">
          <p className="font-semibold">${product.price}</p>
          <Button onClick={handleAddToCart} className="p-2! rounded-full! cursor-pointer">
            <img src={iconCart} alt="cart" width="20" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
