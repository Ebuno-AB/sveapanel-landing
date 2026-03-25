import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/core/api/httpClient";
import { ENDPOINTS } from "@/core/api/endpoints";
import { queryKeys } from "@/core/query/queryKeys";
import { useAuthStore } from "@/core/auth/authStore";

// ─── Types (mirror from the mobile app or define your own) ───

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string | null;
  balance: number;
  totalEarned: number;
  gender: string | null;
  dateOfBirth: string | null;
  zip: string | null;
  swishNumber: string | null;
  hasFinishedSetup: number;
  referralCode: string;
  createdAt: string;
}

// ─── Queries ───

export const useUser = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: queryKeys.user.profile,
    queryFn: () => httpClient.get<UserProfile>(ENDPOINTS.user.profile.root),
    enabled: isAuthenticated,
  });
};
