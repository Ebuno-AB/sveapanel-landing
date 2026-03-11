import { API_ENDPOINTS } from "./api";

// BankID API Configuration
export const BANKID_CONFIG = {
  // Endpoints are resolved from the central api.ts config
  ENDPOINTS: API_ENDPOINTS.BANK_ID,

  // App store URLs for success page
  APP_STORE_URLS: {
    APPLE: "https://pollflow.app.link/iosref",
    ANDROID: "https://pollflow.app.link/iosref", // Note: Same URL in original code
  },

  // Polling intervals (in milliseconds)
  INTERVALS: {
    QR_REFRESH: 5000, // 5 seconds
    VERIFY: 2500, // 2.5 seconds
    MAX_RETRIES: 6, // Maximum retries before
  },
};

// Helper function to get full API URL — kept for backward compatibility
export const getApiUrl = (
  endpoint: keyof typeof BANKID_CONFIG.ENDPOINTS,
): string => {
  return BANKID_CONFIG.ENDPOINTS[endpoint];
};
