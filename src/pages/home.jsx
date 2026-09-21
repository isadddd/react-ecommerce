import Hero from "@/components/Fragments/Hero";
import Test from "@/components/Fragments/Test";
const Home = () => {
  return (
    <>
      <Hero
        title="Home"
        description="description"
        buttonText="Run"
        buttonVariant="secondary"
      />
      <Test />
    </>
  );
};

export default Home;
