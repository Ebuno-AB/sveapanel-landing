import { ApiClient } from "./ApiClient";

export const httpClient = {
  get: async <T>(url: string, config?: any): Promise<T> => {
    const res = await ApiClient().get(url, config);
    return res.data;
  },

  post: async <T>(url: string, data?: any, config?: any): Promise<T> => {
    const res = await ApiClient().post(url, data, config);
    return res.data;
  },

  put: async <T>(url: string, data?: any, config?: any): Promise<T> => {
    const res = await ApiClient().put(url, data, config);
    return res.data;
  },

  patch: async <T>(url: string, data?: any, config?: any): Promise<T> => {
    const res = await ApiClient().patch(url, data, config);
    return res.data;
  },

  delete: async <T>(url: string, config?: any): Promise<T> => {
    const res = await ApiClient().delete(url, config);
    return res.data;
  },
};
