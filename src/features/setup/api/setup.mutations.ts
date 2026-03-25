import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { httpClient } from "@/core/api/httpClient";
import { ENDPOINTS } from "@/core/api/endpoints";
import type { ReasonType } from "@/core/api/endpoints";
import type { UserProfile } from "@/features/user/api/user.queries";
import { queryKeys } from "@/core/query/queryKeys";

export interface Reason {
  reasonId: number;
  title: string;
  reasonType: ReasonType;
  reasonGroup: string;
  additionalText: string | null;
  isActive: number;
  orderId: number;
  parentId: number | null;
}

export const useUpdateSwish = () =>
  useMutation({
    mutationFn: (swishNumber: string) =>
      httpClient.patch(ENDPOINTS.user.profile.swish, { phone: swishNumber }),
  });

export const useUpdateEmail = () =>
  useMutation({
    mutationFn: (email: string) =>
      httpClient.patch(ENDPOINTS.user.profile.email, { email }),
  });

export const useUpdateZip = () =>
  useMutation({
    mutationFn: (zip: string) =>
      httpClient.patch(ENDPOINTS.user.profile.zip, { zip }),
  });

export const useSubmitReferral = () =>
  useMutation({
    mutationFn: (code: string) =>
      httpClient.post(ENDPOINTS.referral.code, { code }),
  });

export const useGetReasons = () =>
  useQuery({
    queryKey: ["reasons", "join"],
    queryFn: () => httpClient.get<Reason[]>(ENDPOINTS.reasons.byType("join")),
  });

export const useSubmitJoinReason = () =>
  useMutation({
    mutationFn: (reasonId: number) =>
      httpClient.post(ENDPOINTS.reasons.submit, {
        reasonId,
        submitType: "join",
      }),
  });

export const useCompleteSetup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => httpClient.post(ENDPOINTS.user.setup.complete),
    onSuccess: async (data) => {
      console.log("[useCompleteSetup] response:", data);
      // Optimistically mark setup as complete so ProtectedRoute lets us through
      queryClient.setQueryData<UserProfile>(queryKeys.user.profile, (old) =>
        old ? { ...old, hasFinishedSetup: 1 } : old,
      );
      const fresh = await queryClient.fetchQuery({
        queryKey: queryKeys.user.profile,
        queryFn: () => httpClient.get<UserProfile>(ENDPOINTS.user.profile.root),
      });
      console.log("[useCompleteSetup] fresh profile:", fresh);
      navigate("/dashboard", { replace: true });
    },
  });
};
