import { httpClient } from "@/core/api/httpClient";
import { ENDPOINTS } from "@/core/api/endpoints";
import type {
  StreakStats,
  StreakCompletionsList,
  StreakToplist,
} from "../types/streak.types";

export const streakApi = {
  getStats: (streakName: string) =>
    httpClient.get<StreakStats>(ENDPOINTS.streak.stats(streakName)),

  getCompletions: (streakName: string, page = 1, limit = 30) =>
    httpClient.get<StreakCompletionsList>(
      ENDPOINTS.streak.completions(streakName),
      { params: { page, limit } },
    ),

  getToplist: (streakName: string, page = 1, limit = 100) =>
    httpClient.get<StreakToplist>(ENDPOINTS.streak.toplist(streakName), {
      params: { page, limit },
    }),

  completeStreak: (streakName: string, timezone: string) =>
    httpClient.post<StreakStats>(ENDPOINTS.streak.complete, {
      streakName,
      timezone,
    }),
};
