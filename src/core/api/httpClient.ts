import { ApiClient } from "./ApiClient";

export const httpClient = {
  get: async <T>(url: string, config?: object): Promise<T> => {
    const res = await ApiClient().get<T>(url, config);
    return res.data;
  },

  post: async <T>(url: string, data?: unknown, config?: object): Promise<T> => {
    const res = await ApiClient().post<T>(url, data, config);
    return res.data;
  },

  put: async <T>(url: string, data?: unknown, config?: object): Promise<T> => {
    const res = await ApiClient().put<T>(url, data, config);
    return res.data;
  },

  patch: async <T>(url: string, data?: unknown, config?: object): Promise<T> => {
    const res = await ApiClient().patch<T>(url, data, config);
    return res.data;
  },

  delete: async <T>(url: string, config?: object): Promise<T> => {
    const res = await ApiClient().delete<T>(url, config);
    return res.data;
  },
};
