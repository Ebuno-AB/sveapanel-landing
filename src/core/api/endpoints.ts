/**
 * Centralized endpoint definitions — mirrors the mobile app's endpoints.
 * All paths are relative to the API base URL configured in env.ts.
 */
const ENDPOINTS = {
  auth: {
    bankid: {
      auth: "auth/bankid/auth",
      verify: "auth/bankid/verify",
      qrRefresh: "auth/bankid/qr/refresh",
    },
    token: {
      refresh: "auth/token/refresh",
    },
  },
  user: {
    profile: {
      root: "user/me",
      name: "user/me/name",
      zip: "user/me/zip",
      email: "user/me/email",
      swish: "user/me/swish",
    },
    setup: {
      complete: "user/me/setup/complete",
    },
    boost: "user/me/boost",
    rating: "user/rating",
    account: {
      delete: "user/account",
    },
    notifications: {
      token: "user/me/notifications/token",
      permission: "user/me/notifications/permission",
      smsPermission: "user/me/notifications/sms-permission",
      emailPermission: "user/me/notifications/email-permission",
    },
    transactions: "user/me/transactions",
  },
  competition: {
    root: "competition",
    active: "competition/active-competitions",
    history: "competition/history",
    stats: "competition/stats",
    leaderboard: (competitionId: string | number) =>
      `competition/leaderboard/${competitionId}`,
  },
  referral: {
    data: (startIndex: string | number) => `referral/${startIndex}`,
    share: "referral/share",
    code: "referral/code",
  },
  support: {
    faq: "support/faq",
  },
  survey: {
    available: "surveys",
  },
  system: {
    news: "system/news",
    shortNotice: "system/short-notice",
    settings: "system/settings",
  },
  games: {
    reward: "games/reward",
    promotions: "games/promotions",
    stats: "games/stats",
  },
  cashout: {
    root: "withdraw",
    history: "withdraw/history",
  },
  balance: {
    pointsHistory: "balance/points/history",
  },
  streak: {
    complete: "streak/complete",
    stats: (streakName: string) => `streak/${streakName}/stats`,
    toplist: (streakName: string) => `streak/${streakName}/toplist`,
    completions: (streakName: string) => `streak/${streakName}/completions`,
  },
  cashback: {
    categories: "cashback/categories",
    stores: "cashback/stores",
    storeDetail: (storeId: number) => `cashback/stores/${storeId}`,
    storeProducts: (storeId: number) => `cashback/stores/${storeId}/products`,
    featuredStore: "cashback/stores/featured",
    createTrackingLink: "cashback/trackinglink",
    pendingBalance: "cashback/pending-balance",
    clicks: "cashback/clicks",
    transactions: "cashback/transactions",
    feedSections: "cashback/feed-sections",
  },
  duels: {
    wagerTiers: "duels/wager-tiers",
    searchMatch: "duels/search",
    cancelSearch: (duelId: number) => `duels/search/${duelId}`,
    matchState: (duelId: number) => `duels/${duelId}`,
    stats: "duels/stats",
    history: "duels/history",
  },
  profiler: {
    progress: "profiler/progress",
    nextQuestion: "profiler",
    submit: "profiler",
    single: (profilerId: string | number) => `profiler/${profilerId}`,
  },
} as const;

export { ENDPOINTS };
