import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import LoginPages from "./pages/LoginPages";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPages />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/category" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
