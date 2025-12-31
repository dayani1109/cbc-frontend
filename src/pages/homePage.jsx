import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./productPage";
import AboutUsPage from "./aboutUs";
import ProductOverview from "./productOverview";
import CartPage from "./cart";
import CheckoutPage from "./checkout";
import UserHomePage from "./userHomePage";
import ContactUsPage from "./contact";

export default function HomePage() {
  return (
    <div className="w-full h-full bg-primary">
      <Header />
      <Routes path="/">
        <Route path="/" element={<UserHomePage/>} />
        <Route path="/products" element={<ProductPage/>} />
        <Route path="/contact" element={<ContactUsPage/>} />
        <Route path="/about" element={<AboutUsPage/>} />
        <Route path="/overview/:id" element={<ProductOverview/>} />
        <Route path="/cart" element={<CartPage/>} />
         <Route path="/checkout" element={<CheckoutPage/>} />
        <Route path="/*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}
