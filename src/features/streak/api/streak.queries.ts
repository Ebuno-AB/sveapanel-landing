import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/core/query/queryKeys";
import { useAuthStore } from "@/core/auth/authStore";
import { streakApi } from "./streak.api";

export const STREAK_NAME = "APP_ACTION";

export const useStreakStats = (streakName = STREAK_NAME) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: queryKeys.streak.stats(streakName),
    queryFn: () => streakApi.getStats(streakName),
    enabled: isAuthenticated,
    staleTime: 60 * 1000,
  });
};

export const useStreakCompletions = (streakName = STREAK_NAME) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: queryKeys.streak.completions(streakName),
    queryFn: () => streakApi.getCompletions(streakName),
    enabled: isAuthenticated,
    staleTime: 60 * 1000,
  });
};

export const useStreakToplist = (streakName = STREAK_NAME) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: queryKeys.streak.toplist(streakName),
    queryFn: () => streakApi.getToplist(streakName),
    enabled: isAuthenticated,
    staleTime: 2 * 60 * 1000,
  });
};

export const useCompleteStreak = (streakName = STREAK_NAME) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (timezone: string) =>
      streakApi.completeStreak(streakName, timezone),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.streak.stats(streakName),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.streak.completions(streakName),
      });
    },
  });
};
