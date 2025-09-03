import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/loginPage";
import AdminPage from "./pages/adminPage";
import HomePage from "./pages/homePage";

function App() {
  return (
    <BrowserRouter>
      <div className="w-full h-[100vh]">
        <Toaster position="top-right" />

        <Routes path="/">
          {" "}
          {/*install karagatta router-dom ekem ganne meka component ekak */}
          {/*  me vage Route gdk dagann puluvam */}
          <Route path="/*" element={<HomePage/>} />
          <Route path="/register" element={<h1>Register Page </h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/test" element={<h1>Test Page </h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
