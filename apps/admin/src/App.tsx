import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout.js";
import DashboardPage from "./routes/DashboardPage.js";
import GoldPricePage from "./routes/GoldPricePage.js";
import ProductsPage from "./routes/ProductsPage.js";
import ProductFormPage from "./routes/ProductFormPage.js";
import EnquiriesPage from "./routes/EnquiriesPage.js";
import { Toaster } from "./components/ui/toaster.js";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="gold-price" element={<GoldPricePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/new" element={<ProductFormPage />} />
          <Route path="products/:id/edit" element={<ProductFormPage />} />
          <Route path="enquiries" element={<EnquiriesPage />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
