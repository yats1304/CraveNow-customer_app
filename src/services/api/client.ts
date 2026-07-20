import { api } from "./axios";

export const apiClient = {
  get: <T>(url: string, params?: object) => api.get<T>(url, { params }),

  post: <T>(url: string, data?: unknown) => api.post<T>(url, data),

  put: <T>(url: string, data?: unknown) => api.put<T>(url, data),

  patch: <T>(url: string, data?: unknown) => api.patch<T>(url, data),

  delete: <T>(url: string) => api.delete<T>(url),
};
