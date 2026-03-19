export interface StreakStats {
  currentStreak: number;
  longestStreak: number;
  rank: number | null;
  lastCompletedAt: string | null;
  lastCompletedLocalDate: string | null;
  lastTimezone: string | null;
  bestRank: number | null;
}

export interface StreakCompletion {
  streak_name: string;
  user_id: number;
  local_date: string; // YYYY-MM-DD
  local_timezone: string;
  completed_at: string; // UTC ISO timestamp
}

export interface StreakCompletionsResponse {
  data: StreakCompletion[];
  total: number;
}

export interface ToplistEntry {
  user_id: number;
  name: string;
  current_streak: number;
  longest_streak: number;
  rank: number;
}

export interface StreakToplistResponse {
  data: ToplistEntry[];
  total: number;
}
