import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Landing from "./pages/Landing";
import RegistrationPage from "./pages/RegistrationPage";
import Redirect from "./pages/Redirect";
import { useGA } from "./hooks/gtag";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFoundPage from "./pages/404";
import phoneImg from "@/src/public/assets/sveamock.png";

function App() {
  const { trackEvent } = useGA();

  useEffect(() => {
    trackEvent("page_view", {
      page_path: window.location.pathname,
    });
  }, [trackEvent, window.gtag]);

  useEffect(() => {
    // --- META tag ---
    const meta = document.createElement("meta");
    meta.setAttribute("property", "og:image");
    meta.setAttribute("content", "https://sveapanelen.se" + phoneImg);
    document.head.appendChild(meta);

    // --- LINK preload ---
    const link = document.createElement("link");
    link.setAttribute("rel", "preload");
    link.setAttribute("as", "image");
    link.setAttribute("href", "https://sveapanelen.se" + phoneImg);
    document.head.appendChild(link);

    // optional cleanup if component unmounts
    return () => {
      document.head.removeChild(meta);
      document.head.removeChild(link);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
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
