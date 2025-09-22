import React, { useState, useEffect } from 'react';
import './CookiesConsent.css';

interface CookiesConsentProps {
  onAccept?: () => void;
  onDecline?: () => void;
}

const CookiesConsent: React.FC<CookiesConsentProps> = ({ onAccept, onDecline }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    if (onAccept) onAccept();
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
    if (onDecline) onDecline();
  };



  if (!isVisible) return null;

  return (
    <div className="cookies-overlay">
      <div className="cookies-banner">
        <div className="cookies-content">
          <div className="cookies-icon">
            🍪
          </div>
          <div className="cookies-text">
            <h3>Vi använder cookies</h3>
            <p>
              Vi använder cookies för att förbättra din upplevelse på vår webbplats, 
              analysera trafik och personalisera innehåll. Genom att klicka "Acceptera alla" 
              samtycker du till vår användning av cookies.
            </p>
            <div className="cookies-link">
              <a href="/privacy" target="_blank" rel="noopener noreferrer">
                Läs mer om vår integritetspolicy
              </a>
            </div>
          </div>
        </div>
        <div className="cookies-actions">
          <button 
            className="cookies-btn cookies-btn-decline" 
            onClick={handleDecline}
          >
            Avböj alla
          </button>
          {/* <button 
            className="cookies-btn cookies-btn-customize" 
            onClick={handleCustomize}
          >
            Anpassa
          </button> */}
          <button 
            className="cookies-btn cookies-btn-accept" 
            onClick={handleAccept}
          >
            Acceptera alla
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiesConsent; 