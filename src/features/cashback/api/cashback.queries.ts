import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/core/query/queryKeys";
import { useAuthStore } from "@/core/auth/authStore";
import { cashbackApi } from "./cashback.api";

export const useFeedSections = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: queryKeys.cashback.feedSections,
    queryFn: cashbackApi.getFeedSections,
    enabled: isAuthenticated,
  });
};

export const useCategories = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: queryKeys.cashback.categories,
    queryFn: cashbackApi.getCategories,
    enabled: isAuthenticated,
  });
};
