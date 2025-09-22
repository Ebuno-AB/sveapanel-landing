import React, { useEffect, useRef } from 'react';

// Google Analytics tracking ID
const GA_TRACKING_ID = 'AW-764023269';

// Type declarations for Google Analytics
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Initialize Google Analytics
const initGA = () => {
  try {
    // Check if already initialized
    if (typeof window.gtag === 'function') return;

    // Load the Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    
    // Handle script loading errors
    script.onerror = () => {
      console.warn('Google Analytics script failed to load. This may be due to ad blockers or network issues.');
    };
    
    script.onload = () => {
      // Initialize gtag only after script loads successfully
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) { 
        window.dataLayer.push(args); 
      }
      window.gtag = gtag;
      
      gtag('js', new Date());
      gtag('config', GA_TRACKING_ID);
    };
    
    document.head.appendChild(script);
  } catch (error) {
    console.warn('Failed to initialize Google Analytics:', error);
  }
};

// Custom hook to use Google Analytics
export const useGA = () => {


  useEffect(() => {
    if (!window.gtag) {
      console.log('Initializing GA'); 
      initGA();
    }
  }, []);


  // Function to track events
  const trackEvent = (action: string, data: object) => {
    if (window.gtag) {
      console.log('Tracking event:', action, data);
      window.gtag('event', action, data);
    }
  };

  return React.useMemo(() => ({ trackEvent }), []);
};
