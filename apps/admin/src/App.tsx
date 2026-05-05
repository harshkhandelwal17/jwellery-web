import { useCallback, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout.js";
import RequireAdminAuth from "./components/auth/RequireAdminAuth.js";
import DashboardPage from "./routes/DashboardPage.js";
import GoldPricePage from "./routes/GoldPricePage.js";
import ProductsPage from "./routes/ProductsPage.js";
import ProductFormPage from "./routes/ProductFormPage.js";
import EnquiriesPage from "./routes/EnquiriesPage.js";
import LoginPage from "./routes/LoginPage.js";
import { Toaster } from "./components/ui/toaster.js";
import { clearAdminSession, hasValidAdminSession } from "./lib/admin-auth.js";
import { toast } from "./hooks/use-toast.js";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => hasValidAdminSession());

  const handleLogout = useCallback(() => {
    clearAdminSession();
    setIsAuthenticated(false);
    toast({ title: "Logged out", description: "Admin session ended." });
  }, []);

  const handleSessionExpired = useCallback(() => {
    clearAdminSession();
    setIsAuthenticated(false);
    toast({
      variant: "destructive",
      title: "Session expired",
      description: "Please login again.",
    });
  }, []);

  return (
    <BrowserRouter basename="/admin">
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />
            )
          }
        />
        <Route
          element={
            <RequireAdminAuth
              isAuthenticated={isAuthenticated}
              onSessionExpired={handleSessionExpired}
            />
          }
        >
          <Route path="/" element={<AdminLayout onLogout={handleLogout} />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="gold-price" element={<GoldPricePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/new" element={<ProductFormPage />} />
            <Route path="products/:id/edit" element={<ProductFormPage />} />
            <Route path="enquiries" element={<EnquiriesPage />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
