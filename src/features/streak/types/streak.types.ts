export type StreakInfo = {
  streakName: string;
  description: string | null;
  frequency: "daily";
};

export type StreakStats = {
  info: StreakInfo;
  currentStreak: number;
  longestStreak: number;
  bestRank: number | null;
  currentRank: number | null;
  lastCompletedAt: string | null;
  lastCompletedLocalDate: string | null;
  hasCompletedToday: boolean;
};

export type StreakCompletionEntry = {
  id: number;
  localDate: string; // YYYY-MM-DD
  localTimezone: string;
  completedAt: string; // UTC ISO timestamp
};

export type StreakCompletionsList = {
  info: StreakInfo;
  entries: StreakCompletionEntry[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type StreakLeaderboardEntry = {
  position: number;
  userId: number;
  firstName: string;
  lastName: string;
  currentStreak: number;
  lastCompletedAt: string;
};

export type StreakToplist = {
  info: StreakInfo;
  entries: StreakLeaderboardEntry[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
