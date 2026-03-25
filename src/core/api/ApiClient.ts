import axios from "axios";
import { env } from "../config/env";
import { tokenStorage } from "../auth/tokenStorage";
import { useAuthStore } from "../auth/authStore";

let client: ReturnType<typeof axios.create> | null = null;

export function ApiClient() {
  if (client) return client;

  client = axios.create({
    baseURL: env.apiUrl,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // ── Auth interceptor ──
  client.interceptors.request.use((config) => {
    const token = tokenStorage.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // ── Logging interceptor (dev only) ──
  if (env.isDevelopment) {
    client.interceptors.response.use(
      (res) => {
        console.log(`[API] ${res.config.method?.toUpperCase()} ${res.config.url}`, res.status);
        return res;
      },
      (err) => {
        console.error(`[API] ${err.config?.method?.toUpperCase()} ${err.config?.url}`, err.response?.status);
        return Promise.reject(err);
      },
    );
  }

  // ── Error / 401 interceptor ──
  client.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err?.response?.status === 401) {
        useAuthStore.getState().logout();
      }

      const message =
        typeof err?.response?.data?.error === "string"
          ? err.response.data.error
          : "Något gick fel. Försök igen.";

      return Promise.reject(
        Object.assign(new Error(message), {
          status: err?.response?.status,
          data: err?.response?.data,
        }),
      );
    },
  );

  return client;
}

/** Reset singleton — useful after logout to clear any stale state */
export function resetApiClient() {
  client = null;
}
