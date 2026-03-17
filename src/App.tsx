import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Suspense, useEffect } from "react";
import { useGA } from "./hooks/gtag";
import { publicRoutes, protectedRoutes } from "./routes/routes";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppRoutes() {
  const { trackEvent } = useGA();

  useEffect(() => {
    trackEvent("page_view", {
      page_path: window.location.pathname,
    });
  }, [trackEvent, window.gtag]);

  return (
    <Routes>
      {/* Protected routes (requires auth) */}
      {protectedRoutes.map((route, i) => (
        <Route key={`protected-${i}`} path={route.path} element={route.element}>
          {route.children?.map((child, j) => (
            <Route
              key={child.path ?? `index-${j}`}
              index={"index" in child ? (child.index as boolean) : undefined}
              path={"path" in child ? child.path : undefined}
              element={child.element}
            />
          ))}
        </Route>
      ))}

      {/* Public routes */}
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={null}>
        <AppRoutes />
      </Suspense>
    </Router>
  );
}

export default App;
