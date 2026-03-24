import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/core/auth/authStore";
import { useUser } from "@/features/user/api/user.queries";

const SetupRoute = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { data: user, isLoading } = useUser();

  if (!isAuthenticated) {
    return <Navigate to="/logga-in" replace />;
  }

  if (isLoading) {
    return null;
  }

  if (user?.hasFinishedSetup == 1) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default SetupRoute;
