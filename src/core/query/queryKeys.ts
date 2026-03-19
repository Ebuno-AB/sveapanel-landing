/**
 * Centralized query key factory — mirrors the mobile app's queryKeys.
 * Use these in every useQuery/useMutation to ensure consistent cache keys.
 */
export const queryKeys = {
  auth: {
    all: ["auth"] as const,
  },
  system: {
    settings: ["system", "settings"] as const,
  },
  user: {
    profile: ["user", "me"] as const,
    transactions: (userId: number, startIndex?: number) =>
      ["user", "transactions", userId, startIndex ?? 0] as const,
  },
  competition: {
    active: ["competition", "active"] as const,
    history: ["competition", "history"] as const,
    stats: ["competition", "stats"] as const,
  },
  games: {
    all: ["games"] as const,
    list: (userId: number) => [...queryKeys.games.all, "list", userId] as const,
    stats: ["games", "stats"] as const,
  },
  cashback: {
    categories: ["cashback", "categories"] as const,
    stores: ["cashback", "stores"] as const,
    storeDetail: (storeId: number) => ["cashback", "store", storeId] as const,
    featuredStore: ["cashback", "featuredStore"] as const,
    pendingBalance: ["cashback", "pendingBalance"] as const,
    clicks: ["cashback", "clicks"] as const,
    transactions: ["cashback", "transactions"] as const,
    feedSections: ["cashback", "feedSections"] as const,
  },
  cashout: {
    history: ["cashout", "history"] as const,
  },
  referral: {
    code: ["referral", "code"] as const,
    data: (startIndex: number) => ["referral", startIndex] as const,
  },
  streak: {
    all: ["streak"] as const,
    stats: (streakName: string) => ["streak", "stats", streakName] as const,
    toplist: (streakName: string) => ["streak", "toplist", streakName] as const,
    completions: (streakName: string) =>
      ["streak", "completions", streakName] as const,
  },
  duels: {
    stats: ["duels", "stats"] as const,
    history: ["duels", "history"] as const,
    wagerTiers: ["duels", "wagerTiers"] as const,
  },
  profiler: {
    progress: ["profiler", "progress"] as const,
  },
  support: {
    faq: ["support", "faq"] as const,
  },
  survey: {
    available: ["survey", "available"] as const,
  },
} as const;
