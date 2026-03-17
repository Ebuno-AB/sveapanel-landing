import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/core/query/queryKeys";
import { useAuthStore } from "@/core/auth/authStore";
import { surveyApi } from "./survey.api";

export const useSurveys = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: queryKeys.survey.available,
    queryFn: surveyApi.getSurveys,
    enabled: isAuthenticated,
  });
};
