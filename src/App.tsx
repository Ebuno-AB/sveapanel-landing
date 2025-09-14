import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Landing from './pages/Landing';
import RegistrationPage from './pages/RegistrationPage';
import Redirect from './pages/Redirect';
import { useGA } from './hooks/gtag';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  const { trackEvent } = useGA();

  useEffect(() => {
    trackEvent('page_view', {
      page_path: window.location.pathname,
    });
  }, [trackEvent]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register/:code" element={<RegistrationPage />} />
        <Route path="/r/:code" element={<Landing />} />
        <Route path="/redirect/:platform" element={<Redirect />} />
        <Route path="/redirect/detect" element={<Redirect />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      
      </Routes>
    </Router>
  );
}

export default App;