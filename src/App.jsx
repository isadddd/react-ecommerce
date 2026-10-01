import { BrowserRouter, Routes, Route } from "react-router";
import ProtectedRoute from "@/routes/ProtectedRoute";

import MainLayout from "@/components/Layouts/MainLayout";

import Home from "./pages/home";
import Shop from "./pages/shop";
import About from "./pages/about";
import Contact from "./pages/contact";
import NotFound from "./pages/notfound";
import Login from "./pages/login";
import Profile from "@/pages/profile";
import ProductDetail from "./pages/single-product";
import SearchPage from "./pages/search-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<SearchPage />} />

          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />

          <Route path="/products/:id" element={<ProductDetail />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
