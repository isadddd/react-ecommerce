const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-col gap-1 border bg-white p-3">
      <img src={product.images[0]} alt={product.title} className="border aspect-square w-full" />
      <div className="p-4">
        <h3 className="text-base md:text-2xl truncate">{product.title}</h3>
        <p className="text-xs md:text-base line-clamp-2">{product.rating}</p>
        <p className="text-xs md:text-base line-clamp-2">{product.description}</p>
        <p className="mt-2 font-semibold">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
