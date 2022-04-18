import Home from "./Home";
import Products from "./Products/Products";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";
import Header from "./Header";
import ResponsiveGrid from "./ResponsiveGrid";
import GlobalStyle from "../GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShopDataProvider } from "./ShopDataContext"; //Add the Context Provider to the entire application

const App = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <ShopDataProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/items/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/grid" element={<ResponsiveGrid />} />
          </Routes>
        </ShopDataProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
