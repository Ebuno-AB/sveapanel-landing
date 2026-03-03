import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  className?: string;
  children?: React.ReactNode;
  fallbackPath?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ 
  className = '', 
  children = '← Tillbaka',
  fallbackPath = '/'
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    // If there's history to go back to, go back
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // Otherwise navigate to fallback path
      navigate(fallbackPath);
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`back-button ${className}`}
      aria-label="Go back to previous page"
      type="button"
    >
      {children}
    </button>
  );
};

export default BackButton; 