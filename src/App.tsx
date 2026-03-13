import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Landing from "./pages/Landing";
import RegistrationPage from "./pages/RegistrationPage";
import Redirect from "./pages/Redirect";
import { useGA } from "./hooks/gtag";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFoundPage from "./pages/404";
import Cashback from "./pages/Cashback/Cashback";
import CustomerService from "./pages/CustomerService/CustomerService";
import MyAccount from "./pages/MyAccount/MyAccount";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const { trackEvent } = useGA();

  useEffect(() => {
    trackEvent("page_view", {
      page_path: window.location.pathname,
    });
  }, [trackEvent, window.gtag]);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/cashback" element={<Cashback />} />
        <Route path="/kundtjanst" element={<CustomerService />} />
        <Route path="/minasidor" element={<MyAccount />} />
        <Route path="/register/:code" element={<RegistrationPage />} />
        <Route path="/r/:code" element={<Landing />} />
        <Route path="/IG" element={<Landing />} />
        <Route path="/redirect/:platform" element={<Redirect />} />
        <Route path="/redirect/detect" element={<Redirect />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
