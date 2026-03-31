import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/core/auth/authStore";
import AuthNav from "@/components/authNav/AuthNav";
import { AuthFooter } from "@/components/AuthFooter/AuthFooter";
import { useUser } from "@/features/user/api/user.queries";

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const location = useLocation();
  const { data: user, isLoading } = useUser();

  if (!isAuthenticated) {
    return <Navigate to="/logga-in" state={{ from: location }} replace />;
  }

  if (isLoading) {
    return null;
  }

  if (user?.hasFinishedSetup == 0) {
    return <Navigate to="/setup" replace />;
  }

  return (
    <>
      <AuthNav />
      <Outlet />
      <AuthFooter />
    </>
  );
};

export default ProtectedRoute;
