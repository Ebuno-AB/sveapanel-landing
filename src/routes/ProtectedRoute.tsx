import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/core/auth/authStore";
import AuthNav from "@/components/authNav/AuthNav";

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/logga-in" state={{ from: location }} replace />;
  }

  return (
    <>
      <AuthNav />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
