import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/core/auth/authStore";
import AuthNav from "@/components/authNav/AuthNav";
import { AuthFooter } from "@/components/AuthFooter/AuthFooter";
import { useUser } from "@/features/user/api/user.queries";
import { isPhone, isIOS } from "@/utils/browserDetection";
import { BANKID_CONFIG } from "@/config/bankid";

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
    if (isPhone()) {
      window.location.href = isIOS()
        ? BANKID_CONFIG.APP_STORE_URLS.APPLE
        : BANKID_CONFIG.APP_STORE_URLS.ANDROID;
      return null;
    }
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
