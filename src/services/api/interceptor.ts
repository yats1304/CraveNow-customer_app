import { logger } from "@/utils";
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
  logger.info("Interceptor", "Resetting session expiration state");
  sessionExpired = false;
  refreshPromise = null;
}

function getRefreshedToken(): Promise<string> {
  if (!refreshPromise) {
    logger.info("TokenRefresh", "Initiating single-flight access token refresh");
    refreshPromise = refreshAccessToken()
      .then((token) => {
        logger.info("TokenRefresh", "Access token successfully refreshed");
        sessionExpired = false;
        return token;
      })
      .catch((err) => {
        logger.error("TokenRefresh", "Failed to refresh access token", err);
        if (!sessionExpired) {
          sessionExpired = true;
          authStorage.clearSession();
          logger.warn("TokenRefresh", "Session expired, clearing storage & emitting sessionExpired event");
          authEvents.emit("sessionExpired");
        }
        throw err;
      })
      .finally(() => {
        refreshPromise = null;
      });
  } else {
    logger.debug("TokenRefresh", "Subscribing to existing refresh promise in flight");
  }
  return refreshPromise;
}

export function setupInterceptors(): void {
  if (isInterceptorsSetup) {
    return;
  }
  isInterceptorsSetup = true;
  logger.info("Interceptor", "Axios interceptors registered successfully");

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

      logger.debug("AxiosRequest", `${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error: AxiosError) => {
      logger.error("AxiosRequest", "Request configuration error", error);
      return Promise.reject(error);
    },
  );

  // Response Interceptor: Automatically handle 401 token refreshes & session expiration
  api.interceptors.response.use(
    (response: AxiosResponse) => {
      logger.debug("AxiosResponse", `${response.status} ${response.config.url}`);
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (!error.response) {
        logger.error("AxiosResponse", "Network/Connection error", error.message);
        return Promise.reject(error);
      }

      if (error.response.status !== 401) {
        logger.warn("AxiosResponse", `HTTP ${error.response.status} error for ${originalRequest?.url}`, error.response.data);
        return Promise.reject(error);
      }

      if (!originalRequest || originalRequest._retry) {
        logger.warn("AxiosResponse", "401 received on retried request or invalid config", originalRequest?.url);
        return Promise.reject(error);
      }

      if (shouldSkipRefresh(originalRequest.url)) {
        logger.debug("AxiosResponse", "Skipping token refresh for auth/auth-exempt route", originalRequest.url);
        return Promise.reject(error);
      }

      if (sessionExpired) {
        logger.warn("AxiosResponse", "Session already expired, rejecting request", originalRequest.url);
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

        logger.info("AxiosResponse", `Retrying request with new token: ${originalRequest.url}`);
        return api(originalRequest);
      } catch (err) {
        logger.error("AxiosResponse", `Retry failed for ${originalRequest.url}`, err);
        return Promise.reject(err);
      }
    },
  );
}
