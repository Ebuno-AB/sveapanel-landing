import { useEffect } from 'react';

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
export const initGA = () => {
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
    // Initialize GA if not already initialized
    if (!window.gtag) {
      initGA();
    }
  }, []);

  // Function to track page views
  const trackPageView = (page: string) => {
    if (window.gtag) {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: page
      });
    }
  };

  // Function to track events
  const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
  };

  return { trackPageView, trackEvent };
};
