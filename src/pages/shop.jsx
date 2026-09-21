import Cart from "@/components/Fragments/Cart";
import Hero from "@/components/Fragments/Hero";
import Products from "@/components/Fragments/Products";

const Shop = () => {
  return (
    <>
      <Hero title="Shop" description="description" buttonText="Shop" />
      <Products />
      <Cart />
    </>
  );
};

export default Shop;
