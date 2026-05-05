import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { hasValidAdminSession } from "@/lib/admin-auth.js";

interface Props {
  isAuthenticated: boolean;
  onSessionExpired: () => void;
}

export default function RequireAdminAuth({ isAuthenticated, onSessionExpired }: Props) {
  const location = useLocation();

  useEffect(() => {
    const verify = () => {
      if (!hasValidAdminSession()) onSessionExpired();
    };
    verify();
    const id = window.setInterval(verify, 60_000);
    window.addEventListener("visibilitychange", verify);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("visibilitychange", verify);
    };
  }, [onSessionExpired]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
