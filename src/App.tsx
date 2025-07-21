import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Landing from './pages/Landing';
import RegistrationPage from './pages/RegistrationPage';
import Redirect from './pages/Redirect';
import { useGA } from './hooks/gtag';

function App() {
  useGA();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/r/:code" element={<Landing />} />
        <Route path="/register/:code" element={<Landing />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/redirect/:platform" element={<Redirect />} />
       
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
