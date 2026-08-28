import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import HeroLayut from "./pages/HeroLayut";
import KidPage from "./pages/KidPage";
import AllProductPage from "./pages/AllProductPage";
import ProductPage from "./pages/ProductPage";
import Login from "./auth/Login";
import FemaleSection from "./pages/FemaleSection";
import SingleProduct from "./pages/singleProduct";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />}>
          <Route index element={<HeroLayut />} />

          <Route path="product" element={<ProductPage />}>
            <Route index element={<AllProductPage />} />
            <Route path="kids" element={<KidPage />} />
            <Route path="female" element={<FemaleSection />} />
          </Route>

        </Route>

        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;