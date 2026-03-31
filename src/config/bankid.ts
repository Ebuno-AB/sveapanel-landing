import { API_ENDPOINTS } from "./api";

// BankID API Configuration
export const BANKID_CONFIG = {
  // Endpoints are resolved from the central api.ts config
  ENDPOINTS: API_ENDPOINTS.BANK_ID,

  // App store URLs for post-registration redirect
  APP_STORE_URLS: {
    APPLE:
      "https://apps.apple.com/app/apple-store/id1617681550?pt=120111031&ct=direct&mt=8",
    ANDROID:
      "https://play.google.com/store/apps/details?id=com.ebuno.swishpanelenfinal",
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
