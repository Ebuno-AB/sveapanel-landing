import { useMutation } from "@tanstack/react-query";
import { httpClient } from "@/core/api/httpClient";
import { ENDPOINTS } from "@/core/api/endpoints";

export const useUpdatePushPermission = () =>
  useMutation({
    mutationFn: (enabled: boolean) =>
      httpClient.patch(ENDPOINTS.user.notifications.permission, { enabled }),
  });

export const useUpdateSmsPermission = () =>
  useMutation({
    mutationFn: (enabled: boolean) =>
      httpClient.patch(ENDPOINTS.user.notifications.smsPermission, { enabled }),
  });

export const useUpdateEmailPermission = () =>
  useMutation({
    mutationFn: (enabled: boolean) =>
      httpClient.patch(ENDPOINTS.user.notifications.emailPermission, {
        enabled,
      }),
  });

export const useDeleteAccount = () =>
  useMutation({
    mutationFn: (payload?: { reasonId?: number; text?: string }) =>
      httpClient.delete<{ success: boolean; message: string }>(
        ENDPOINTS.user.profile.root,
        { data: payload },
      ),
  });
