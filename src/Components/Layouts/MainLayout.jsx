import { Outlet } from "react-router";
import Header from "@/components/Fragments/Header";
import CartDrawer from "@/components/Fragments/CartDrawer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <CartDrawer />
    </>
  );
};

export default MainLayout;
