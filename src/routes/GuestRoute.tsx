import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/core/auth/authStore";

/**
 * Redirects authenticated users away from guest-only pages (e.g. login/register).
 * Pass-through for unauthenticated users.
 */
const GuestRoute = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/minasidor" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
