import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/loginPage";
import AdminPage from "./pages/adminPage";
import HomePage from "./pages/homePage";
import TestPage from "./pages/test";
import RegisterPage from "./pages/registerPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ForgetPassword from "./pages/forgot-password";
import UserSettings from "./pages/settings";
import UserOrdersPage from "./pages/userOrderPage";
import ProductPage from "./pages/productPage";

function App() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <div className="w-full h-[100vh]">
          <Toaster position="top-right" />

          <Routes path="/">
            {" "}
            {/*install karagatta router-dom ekem ganne meka component ekak */}
            {/*  me vage Route gdk dagann puluvam */}
            <Route path="/*" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/settings" element={<UserSettings />} />
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/order" element={<UserOrdersPage />} />
            <Route path="/products" element={<ProductPage />} />
          </Routes>
        </div>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
