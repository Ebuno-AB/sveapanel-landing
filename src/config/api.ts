// Central API configuration
// All base URLs and paths are defined here. Vite dev-server proxy rules in
// vite.config.ts must stay in sync with the BASE_URLS below.

export const API_BASE_URLS = {
  BANK_ID: "/Web/NewAuth",
  REFERRAL: "/Web/Referral",
} as const;

export const API_ENDPOINTS = {
  BANK_ID: {
    BEGIN: `${API_BASE_URLS.BANK_ID}/begin`,
    UPDATE_QR: `${API_BASE_URLS.BANK_ID}/updateQR`,
    VERIFY_ORDER: `${API_BASE_URLS.BANK_ID}/verifyOrder`,
  },
  REFERRAL: {
    CHECK_CODE: (code: string) =>
      `${API_BASE_URLS.REFERRAL}/checkReferralCode/${code}`,
  },
} as const;
