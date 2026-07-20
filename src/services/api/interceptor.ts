import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { api } from "./axios";

export function setupInterceptors(): void {
  api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      // Token will be added after MMKV setup
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      // Refresh token logic will be added later
      return Promise.reject(error);
    },
  );
}
