import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/core/query/queryKeys";
import { useAuthStore } from "@/core/auth/authStore";
import { competitionApi } from "./competition.api";

export const useActiveCompetitions = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: queryKeys.competition.active,
    queryFn: competitionApi.getActiveCompetitions,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCompetitionHistory = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: queryKeys.competition.history,
    queryFn: competitionApi.getCompetitionHistory,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCompetitionStats = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: queryKeys.competition.stats,
    queryFn: competitionApi.getCompetitionStats,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCompetitionLeaderboard = (
  competitionId: number | undefined,
  limit = 50,
) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: queryKeys.competition.leaderboard(competitionId ?? 0, limit),
    queryFn: () =>
      competitionApi.getCompetitionLeaderboard(competitionId!, limit),
    enabled: isAuthenticated && !!competitionId,
    staleTime: 60 * 1000,
  });
};
