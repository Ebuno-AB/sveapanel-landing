import { type RouteObject } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";

// Lazy-loaded pages for code splitting
const LandingPage = lazy(() => import("@/features/landing/pages/LandingPage"));
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const RegistrationPage = lazy(
  () => import("@/features/landing/pages/RegistrationPage"),
);
const CashbackLandingPage = lazy(
  () => import("@/features/landing/pages/Cashback/Cashback"),
);
const CustomerServicePage = lazy(
  () => import("@/features/landing/pages/CustomerService/CustomerService"),
);
const PrivacyPolicyPage = lazy(
  () => import("@/features/landing/pages/PrivacyPolicyPage"),
);
const RedirectPage = lazy(
  () => import("@/features/landing/pages/RedirectPage"),
);
const NotFoundPage = lazy(
  () => import("@/features/landing/pages/NotFoundPage"),
);

// Dashboard (authenticated)
const DashboardPage = lazy(
  () => import("@/features/dashboard/pages/DashboardPage"),
);
const CashbackPage = lazy(
  () => import("@/features/cashback/pages/CashbackPage"),
);
const CompetitionPage = lazy(
  () => import("@/features/competition/pages/CompetitionPage"),
);
const MyAccountPage = lazy(
  () => import("@/features/myAccount/pages/MyAccount"),
);
const StreakPage = lazy(() => import("@/features/streak/pages/StreakPage"));

/**
 * Public routes — accessible by everyone.
 */
export const publicRoutes: RouteObject[] = [
  { path: "/", element: <LandingPage /> },
  { path: "/r/:code", element: <LandingPage /> },
  { path: "/IG", element: <LandingPage /> },
  { path: "/register/:code", element: <RegistrationPage /> },
  { path: "/logga-in", element: <LoginPage /> },
  { path: "/cashback", element: <CashbackLandingPage /> },
  { path: "/kundtjanst", element: <CustomerServicePage /> },
  { path: "/privacy", element: <PrivacyPolicyPage /> },
  { path: "/redirect/:platform", element: <RedirectPage /> },
  { path: "/redirect/detect", element: <RedirectPage /> },
  { path: "/404", element: <NotFoundPage /> },
  { path: "/*", element: <NotFoundPage /> },
];

/**
 * Protected routes — requires authentication.
 * All nested under /dashboard/*.
 * ProtectedRoute provides the AuthNav layout.
 */
export const protectedRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "cashback", element: <CashbackPage /> },
      { path: "tavlingar", element: <CompetitionPage /> },
      { path: "streak", element: <StreakPage /> },
      { path: "konto", element: <MyAccountPage /> },
    ],
  },
];
