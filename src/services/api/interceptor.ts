import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { authStorage } from "../storage";
import { authEvents } from "./authEvents";
import { api } from "./axios";
import { AUTH_ENDPOINTS } from "./endpoints";
import { refreshAccessToken } from "./refreshToken";

// Endpoints where a 401 response does NOT indicate an expired access token
const SKIP_REFRESH_ENDPOINTS: string[] = [
  AUTH_ENDPOINTS.AUTH.LOGIN,
  AUTH_ENDPOINTS.AUTH.GOOGLE_LOGIN,
  AUTH_ENDPOINTS.AUTH.SIGNUP,
  AUTH_ENDPOINTS.AUTH.LOGOUT,
  AUTH_ENDPOINTS.AUTH.REFRESH_TOKEN,
  AUTH_ENDPOINTS.AUTH.VERIFY_OTP,
  AUTH_ENDPOINTS.AUTH.RESEND_OTP,
  AUTH_ENDPOINTS.AUTH.RESEND_FORGOT_PASSWORD_OTP,
  AUTH_ENDPOINTS.AUTH.FORGOT_PASSWORD,
  AUTH_ENDPOINTS.AUTH.RESET_PASSWORD_OTP,
];

function shouldSkipRefresh(url?: string): boolean {
  if (!url) return true;
  return SKIP_REFRESH_ENDPOINTS.some((endpoint) => url.includes(endpoint));
}

let refreshPromise: Promise<string> | null = null;
let sessionExpired = false;
let isInterceptorsSetup = false;

export function resetInterceptorSessionState(): void {
  sessionExpired = false;
  refreshPromise = null;
}

function getRefreshedToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken()
      .then((token) => {
        sessionExpired = false;
        return token;
      })
      .catch((err) => {
        if (!sessionExpired) {
          sessionExpired = true;
          authStorage.clearSession();
          authEvents.emit("sessionExpired");
        }
        throw err;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

export function setupInterceptors(): void {
  if (isInterceptorsSetup) {
    return;
  }
  isInterceptorsSetup = true;

  // Request Interceptor: Attach Authorization Bearer header
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = authStorage.getAccessToken();

      if (token && config.headers) {
        if (typeof config.headers.set === "function") {
          config.headers.set("Authorization", `Bearer ${token}`);
        } else {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  // Response Interceptor: Automatically handle 401 token refreshes & session expiration
  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (
        error.response?.status !== 401 ||
        !originalRequest ||
        originalRequest._retry ||
        shouldSkipRefresh(originalRequest.url)
      ) {
        return Promise.reject(error);
      }

      if (sessionExpired) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const accessToken = await getRefreshedToken();

        if (originalRequest.headers) {
          if (typeof originalRequest.headers.set === "function") {
            originalRequest.headers.set("Authorization", `Bearer ${accessToken}`);
          } else {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }
        }

        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  );
}
