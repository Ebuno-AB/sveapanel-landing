import { httpClient } from "@/core/api/httpClient";
import { ENDPOINTS } from "@/core/api/endpoints";
import type {
  Competition,
  CompetitionHistoryItem,
  UserCompetitionStats,
} from "../types/competition.types";

export const competitionApi = {
  getActiveCompetitions: () =>
    httpClient.get<Competition[]>(ENDPOINTS.competition.active),
  getCompetitionHistory: () =>
    httpClient.get<{ data: CompetitionHistoryItem[] }>(
      ENDPOINTS.competition.history,
    ),
  getCompetitionStats: () =>
    httpClient.get<UserCompetitionStats>(ENDPOINTS.competition.stats),
  getCompetitionLeaderboard: (competitionId: number, limit = 50) =>
    httpClient.get<Competition>(
      ENDPOINTS.competition.leaderboard(competitionId),
      {
        params: { limit },
      },
    ),
};
