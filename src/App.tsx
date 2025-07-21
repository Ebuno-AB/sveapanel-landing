import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Landing from './pages/Landing';
import RegistrationPage from './pages/RegistrationPage';
import { useGA } from './hooks/gtag';

function App() {
  const { trackPageView } = useGA();

  useEffect(() => {
    // Track initial page view
    trackPageView(window.location.pathname);
  }, [trackPageView]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/r/:code" element={<Landing />} />
        <Route path="/register/:code" element={<Landing />} />
        <Route path="/register" element={<RegistrationPage />} />
       
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
