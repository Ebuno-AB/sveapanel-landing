import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import RegistrationPage from './pages/RegistrationPage';

function App() {
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
