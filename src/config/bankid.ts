// BankID API Configuration
export const BANKID_CONFIG = {
  // Base URL for your BankID API endpoints  
  API_BASE_URL: '/Web/NewAuth', // Use relative URLs - Vite proxy will route to production backend
  
  // Specific endpoints (these should match your existing PHP endpoints)
  ENDPOINTS: {
    BEGIN: '/begin',
    UPDATE_QR: '/updateQR', 
    VERIFY_ORDER: '/verifyOrder' 
  },
  
  // App store URLs for success page
  APP_STORE_URLS: {
    APPLE: 'https://pollflow.app.link/iosref',
    ANDROID: 'https://pollflow.app.link/iosref' // Note: Same URL in original code
  },
  
  // Polling intervals (in milliseconds)
  INTERVALS: {
    QR_REFRESH: 5000, // 5 seconds
    VERIFY: 2500,     // 2.5 seconds 
    MAX_RETRIES: 6   // Maximum retries before 
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${BANKID_CONFIG.API_BASE_URL}${endpoint}`;
}; 